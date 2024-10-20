// QRCodePage.jsx
import { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from '../../firebase/config'; // Adjust the path as needed
import QRCode from 'react-qr-code';
import { useNavigate } from 'react-router-dom';

const QRCodePage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        const userRef = ref(db, 'users/' + uid);

        const unsubscribeUser = onValue(
          userRef,
          (snapshot) => {
            const data = snapshot.val();
            if (data) {
              setUserData({ uid, ...data });
            } else {
              console.error('User data not found in Firebase.');
              setUserData(null);
            }
            setLoading(false);
          },
          (error) => {
            console.error('Error fetching real-time updates:', error);
            setError('Failed to fetch user data.');
            setLoading(false);
          }
        );

        // Cleanup the listener when component unmounts
        return () => unsubscribeUser();
      } else {
        console.error('No user is currently signed in.');
        setError('Please log in to continue.');
        setLoading(false);
      }
    });

    // Cleanup the auth listener when component unmounts
    return () => unsubscribeAuth();
  }, []);

  const uploadUrl = `${window.location.origin}/upload`;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-bold text-center mb-6">Your ID Card Verification Status</h2>
      <div className="border-2 border-gray-300 rounded-lg shadow-lg w-full max-w-md p-4 mb-6">
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : loading ? (
          <div className="flex flex-col items-center">
            <span className="loading loading-spinner text-primary"></span>
            <p className="mt-4">Analyzing ID card...</p>
          </div>
        ) : userData ? (
          <div className="text-center">
            <p className="mb-2">Status: {userData.verified ? 'Verified' : 'Not Verified'}</p>
            <p className="mb-4">User LIN: {userData.uniID}</p>
            {userData.imageUrl && (
              <div className="border border-gray-300 p-2 mb-4 rounded-md">
                <img
                  src={userData.imageUrl}
                  alt="Uploaded ID Card"
                  className="max-w-full rounded-md"
                />
              </div>
            )}
            {userData.verified && (
              <button
                className="btn btn-primary w-full"
                onClick={() => navigate('/products')}
              >
                Continue to Products
              </button>
            )}
          </div>
        ) : (
          <p className="text-center">Loading your data...</p>
        )}
      </div>
      {!userData?.verified && (
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">Scan this QR code to upload your ID card</h2>
          <div className="flex justify-center">
            <QRCode value={uploadUrl} size={256} />
          </div>
          <p className="mt-4">Use your phone to scan this code and upload a photo of your ID card.</p>
        </div>
      )}
    </div>
  );
};

export default QRCodePage;
