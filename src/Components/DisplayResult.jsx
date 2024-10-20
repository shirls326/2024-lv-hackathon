// DisplayResultComponent.jsx
import { useEffect, useState } from 'react';
import { ref, get, update } from 'firebase/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from '../firebase/config';

const DisplayResultComponent = () => {
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userLIN, setUserLIN] = useState(null);
    const [userUid, setUserUid] = useState(null);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                setUserUid(uid);

                const fetchUserLIN = async () => {
                    try {
                        const userRef = ref(db, 'users/' + uid); // Use UID in the path
                        const snapshot = await get(userRef);

                        if (snapshot.exists()) {
                            const userData = snapshot.val();
                            setUserLIN(userData.uniID); // Assume full LIN is stored under 'uniID'
                        } else {
                            console.error('User data not found in Firebase.');
                        }
                    } catch (err) {
                        console.error('Error fetching user data from Firebase:', err);
                    }
                };

                fetchUserLIN();
            } else {
                console.error('No user is currently signed in.');
                setError('Please log in to continue.');
            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const fetchResult = async () => {
            try {
                setLoading(true);
                await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for Lambda to process

                const response = await fetch('https://d5p177iouf.execute-api.us-west-2.amazonaws.com/ResultRetrieval', {
                    method: 'GET',
                });

                if (!response.ok) {
                    const errorMessage = await response.json();
                    throw new Error(errorMessage.message || 'Failed to retrieve data');
                }

                const data = await response.json();
                setResult(data);

                // Check if the userLIN is loaded and matches the last 4 digits of the student ID.
                if (userLIN && data.studentID === userLIN.toString().slice(-4)) {
                    const userRef = ref(db, 'users/' + userUid);
                    await update(userRef, {
                        verified: true,
                    });
                    console.log('User verified successfully.');
                } else {
                    console.error('LIN mismatch or user LIN not loaded yet.');
                    setError('Verification failed: LIN mismatch.');
                }
            } catch (error) {
                console.error('Error fetching ID card data:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (userLIN && userUid) {
            fetchResult();
        }
    }, [userLIN, userUid]);

    return (
        <div>
            <h2>Uploaded ID Card Information</h2>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {result ? (
                <div>
                    <p>Student Name: {result.studentName}</p>
                    <p>Student ID (last 4): {result.studentID}</p>
                    <img src={result.imageUrl} alt="Uploaded ID Card" style={{ maxWidth: '300px', marginTop: '10px' }} />
                </div>
            ) : !loading && !error ? (
                <p>No ID card uploaded yet.</p>
            ) : null}
        </div>
    );
};

export default DisplayResultComponent;
