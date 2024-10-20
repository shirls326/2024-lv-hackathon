// UploadPage.jsx
import { useState, useEffect } from 'react';
import { s3 } from '../../Config/awsConfig';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { ref, onValue } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase/config';
import DisplayResult from '../../Components/DisplayResult';

const UploadPage = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [checkResults, setCheckResults] = useState(false);
    const [userUid, setUserUid] = useState(null);
    const [userVerified, setUserVerified] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const auth = getAuth();
        const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserUid(user.uid);

                const userRef = ref(db, 'users/' + user.uid);
                const unsubscribeUser = onValue(userRef, (snapshot) => {
                    const data = snapshot.val();
                    if (data) {
                        setUserVerified(data.verified);
                        if (data.verified) {
                            // Redirect to /products if already verified
                            navigate('/products');
                        }
                    } else {
                        console.error('User data not found in Firebase.');
                    }
                });

                return () => unsubscribeUser();
            } else {
                console.error('No user is currently signed in.');
                // Redirect to login page or show a message
            }
        });

        return () => unsubscribeAuth();
    }, [navigate]);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setUploadSuccess(false);
        setCheckResults(false); // Reset result checking state
    };

    const handleUpload = async () => {
        if (!selectedFile || !userUid) return;

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

    return (
        <div>
            <h2>Upload Your ID Card</h2>
            <input type="file" accept="image/*" capture="environment" onChange={handleFileChange} />
            <button onClick={handleUpload} disabled={!selectedFile || uploading}>
                {uploading ? 'Uploading...' : 'Upload'}
            </button>
            {uploadSuccess && <p>Upload successful! Checking the results...</p>}
            {checkResults && <DisplayResult />}
        </div>
    );
};

export default UploadPage;
