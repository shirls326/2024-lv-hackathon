// QRCodePage.jsx
import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../../firebase/config'; // Adjust the path as needed

const QRCodePage = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const usersRef = ref(db, 'users');
        const unsubscribe = onValue(usersRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                // Filter users who are verified
                const verifiedUsers = Object.entries(data)
                    .filter(([uid, userData]) => userData.verified)
                    .map(([uid, userData]) => ({
                        uid,
                        ...userData,
                    }));
                setUsers(verifiedUsers);
            } else {
                setUsers([]);
            }
        }, (error) => {
            console.error('Error fetching real-time updates:', error);
            setError('Failed to fetch real-time updates.');
        });

        return () => unsubscribe();
    }, []);

    const uploadUrl = `${window.location.origin}/upload`;

    return (
        <div>
            <h2>Upload Your ID Card</h2>
            <div style={{ border: '2px solid #000', padding: '10px', marginBottom: '20px', minHeight: '300px' }}>
                {error ? (
                    <p>Error: {error}</p>
                ) : (
                    <>
                        {users.length > 0 ? (
                            users.map(user => (
                                <div key={user.uid} style={{ marginBottom: '20px' }}>
                                    <p>Status: Verified</p>
                                    <p>User LIN: {user.LIN}</p>
                                    {user.imageUrl && (
                                        <img src={user.imageUrl} alt="Uploaded ID Card" style={{ maxWidth: '100%', marginTop: '10px' }} />
                                    )}
                                </div>
                            ))
                        ) : (
                            <p>No verified users yet.</p>
                        )}
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
