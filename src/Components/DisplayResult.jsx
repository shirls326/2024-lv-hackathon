// DisplayResultComponent.jsx (for PC view)
import { useEffect, useState } from 'react';
import { ref, get, update } from 'firebase/database';
import { db } from '../firebase/config'; // Adjust the path as needed

const DisplayResultComponent = () => {
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userLIN, setUserLIN] = useState(null);

    useEffect(() => {
        const fetchUserLIN = async () => {
          try {
            const userRef = ref(db, 'uploads/user@example.com'); // Adjust the path as needed
            const snapshot = await get(userRef);
    
            if (snapshot.exists()) {
              const userData = snapshot.val();
              setUserLIN(userData.LIN); // Assume full LIN is stored under 'LIN'
            } else {
              console.error('User data not found in Firebase.');
            }
          } catch (err) {
            console.error('Error fetching user data from Firebase:', err);
          }
        };
    
        fetchUserLIN();
    }, []);

    useEffect(() => {
        const fetchResult = async () => {
            try {
                setLoading(true);
                await new Promise(resolve => setTimeout(resolve, 2000));
    
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
                if (userLIN && data.studentID === userLIN.slice(-4)) {
                    const userRef = ref(db, 'uploads/user@example.com');
                    await update(userRef, {
                    verified: true,
                    });
                } else {
                    console.error('LIN mismatch or user LIN not loaded yet.');
                }
            } catch (error) {
                console.error('Error fetching ID card data:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (userLIN) {
            fetchResult();
        }
    }, [userLIN]);

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
