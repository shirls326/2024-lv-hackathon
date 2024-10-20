// UploadPage.jsx
import { useState, useEffect } from 'react';
import { s3 } from '../../Config/awsConfig';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { ref, onValue } from 'firebase/database';
import { useNavigate, useLocation } from 'react-router-dom';
import { db } from '../../firebase/config';
import DisplayResults from '../../components/DisplayResults';

const UploadPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [checkResults, setCheckResults] = useState(false);
  const [userUid, setUserUid] = useState(null);
  const [userVerified, setUserVerified] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserUid(user.uid);

        const userRef = ref(db, 'users/' + user.uid);
        const unsubscribeUser = onValue(
          userRef,
          (snapshot) => {
            const data = snapshot.val();
            if (data) {
              setUserVerified(data.verified);
            } else {
              console.error('User data not found in Firebase.');
            }
          },
          (error) => {
            console.error('Error fetching user data:', error);
          }
        );

        return () => unsubscribeUser();
      } else {
        console.error('No user is currently signed in.');
        setError('Please log in to continue.');
        // Pass the current location to the login page
        navigate('/login', { state: { from: location } });
      }
    });

    return () => unsubscribeAuth();
  }, [navigate, location]);

  const handleFileChange = (event) => {
    console.log('File change event:', event);
    console.log('Selected file:', event.target.files[0]);
    setSelectedFile(event.target.files[0]);
    setUploadSuccess(false);
    setCheckResults(false); // Reset result checking state
  };

  const handleUpload = async () => {
    if (!selectedFile || !userUid) {
      console.error('No file selected or user not authenticated.');
      return;
    }

    const params = {
      Bucket: 'myimagestoragekd',
      Key: `uploads/${userUid}/${selectedFile.name}`, // Use userUid in the file path
      Body: selectedFile,
      ContentType: selectedFile.type,
    };

    setUploading(true);

    try {
      const command = new PutObjectCommand(params);
      await s3.send(command);
      console.log('File uploaded successfully.');
      setUploadSuccess(true);

      // Set a flag to start checking results after upload
      setCheckResults(true);
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setUploading(false);
    }
  };

  // If user is verified, show a confirmation message
  if (userVerified) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h2 className="text-2xl font-bold text-center mb-4">You are already verified!</h2>
        <p className="text-center mb-6">No need to upload your ID card again.</p>
        <p className="text-center text-green-500 font-semibold">Photo upload successful. You can close this window now!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h2 className="text-2xl font-bold text-center mb-4">Upload Your ID Card</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="file-input file-input-bordered w-full max-w-xs mb-4"
      />
      <button
        className={`btn w-full max-w-xs ${uploading ? 'btn-disabled' : 'btn-primary'}`}
        onClick={handleUpload}
        disabled={!selectedFile || uploading}
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
      {uploadSuccess && <p className="text-green-500 mt-4">Upload successful! Checking the results...</p>}
      {checkResults && <DisplayResults />}
    </div>
  );
};

export default UploadPage;
