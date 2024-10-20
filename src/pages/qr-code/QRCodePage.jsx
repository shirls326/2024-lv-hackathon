// QRCodePage.jsx
import React, { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';
import { ref, onValue, update } from 'firebase/database';
import { db } from '../../firebase/config'; // Adjust the import path based on your project structure

const QRCodePage = () => {
    const [uploadStatus, setUploadStatus] = useState('Waiting for upload...');
    const [imageUrl, setImageUrl] = useState(null);
    const [error, setError] = useState(null);
    const [userLIN, setUserLIN] = useState(null);
    const email = "user@example.com"; // Replace with the user's email or identifier
    const userUid = "user-uid-from-signup"; // Replace with the actual user UID from signup

    useEffect(() => {
        // Listen for changes to the user's data in Firebase
        const userRef = ref(db, 'users/' + userUid);
        const unsubscribe = onValue(userRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setUserLIN(data.uniID); // Assuming `uniID` contains the full LIN
                setUploadStatus(data.verified ? 'Verified' : 'Verification Pending');
                setImageUrl(data.imageUrl || null);
            }
        }, (error) => {
            console.error('Error fetching real-time updates:', error);
            setError('Failed to fetch real-time updates.');
        });

        return () => unsubscribe();
    }, [userUid]);

    // Function to fetch results from your API and update Firebase
    const fetchResultAndVerify = async () => {
        try {
            const response = await fetch('https://d5p177iouf.execute-api.us-west-2.amazonaws.com/ResultRetrieval', {
                method: 'GET',
            });

            if (!response.ok) {
                const errorMessage = await response.json();
                throw new Error(errorMessage.message || 'Failed to retrieve data');
            }

            const data = await response.json();
            const { studentID, imageUrl } = data;

            // Compare last 4 digits of the LIN and studentID
            if (userLIN && studentID === userLIN.slice(-4)) {
                // Update verified status and imageUrl in Firebase
                const userRef = ref(db, 'users/' + userUid);
                await update(userRef, {
                    verified: true,
                    imageUrl,
                });
                setUploadStatus('Verified');
                setImageUrl(imageUrl);
            } else {
                setUploadStatus('Verification Failed: LIN does not match');
            }
        } catch (error) {
            console.error('Error fetching results from API:', error);
            setError('Failed to fetch or verify results.');
        }
    };

    // Automatically call fetchResultAndVerify when userLIN is available
    useEffect(() => {
        if (userLIN) {
            fetchResultAndVerify();
        }
    }, [userLIN]);

    const uploadUrl = `${window.location.origin}/upload`;

    return (
        <div>
            <h2>Upload Your ID Card</h2>
            <div style={{ border: '2px solid #000', padding: '10px', marginBottom: '20px', minHeight: '300px' }}>
                {error ? (
                    <p>Error: {error}</p>
                ) : (
                    <>
                        <p>Status: {uploadStatus}</p>
                        {imageUrl && (
                            <img src={imageUrl} alt="Uploaded ID Card" style={{ maxWidth: '100%', marginTop: '10px' }} />
                        )}
                        {!imageUrl && <p>No image uploaded yet.</p>}
                    </>
                )}
            </div>
            <h2>Scan this QR code to upload your ID card</h2>
            <QRCode value={uploadUrl} size={256} />
            <p>Use your phone to scan this code and upload a photo of your ID card.</p>
        </div>
    );
};

export default QRCodePage;
