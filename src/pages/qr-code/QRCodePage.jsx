// QRCodePage.jsx
import { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from '../../firebase/config'; // Adjust the path as needed
import QRCode from 'react-qr-code';
import { useNavigate } from 'react-router-dom';

const QRCodePage = () => {
  const [userData, setUserData] = useState(null);
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
          },
          (error) => {
            console.error('Error fetching real-time updates:', error);
            setError('Failed to fetch user data.');
          }
        );

        // Cleanup the listener when component unmounts
        return () => unsubscribeUser();
      } else {
        console.error('No user is currently signed in.');
        setError('Please log in to continue.');
      }
    });

    // Cleanup the auth listener when component unmounts
    return () => unsubscribeAuth();
  }, []);

  const uploadUrl = `${window.location.origin}/upload`;

  return (
    <div>
      <h2>Your ID Card Verification Status</h2>
      <div
        style={{
          border: '2px solid #000',
          padding: '10px',
          marginBottom: '20px',
          minHeight: '300px',
        }}
      >
        {error ? (
          <p>Error: {error}</p>
        ) : userData ? (
          <div>
            <p>Status: {userData.verified ? 'Verified' : 'Not Verified'}</p>
            <p>User LIN: {userData.uniID}</p>
            {userData.imageUrl && (
              <img
                src={userData.imageUrl}
                alt="Uploaded ID Card"
                style={{ maxWidth: '100%', marginTop: '10px' }}
              />
            )}
            {userData.verified && (
              <button onClick={() => navigate('/products')}>
                Continue to Products
              </button>
            )}
          </div>
        ) : (
          <p>Loading your data...</p>
        )}
      </div>
      {!userData?.verified && (
        <>
          <h2>Scan this QR code to upload your ID card</h2>
          <QRCode value={uploadUrl} size={256} />
          <p>
            Use your phone to scan this code and upload a photo of your ID card.
          </p>
        </>
      )}
    </div>
  );
};

export default QRCodePage;
