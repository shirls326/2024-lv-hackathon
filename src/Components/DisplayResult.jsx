// DisplayResultComponent.jsx (for PC view)
import { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';

const DisplayResultComponent = () => {
    const [result, setResult] = useState(null);

    useEffect(() => {
        const db = getDatabase();
        const resultRef = ref(db, 'id-card-info');
        onValue(resultRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setResult(data);
            }
        });
    }, []);

    return (
        <div>
            <h2>Uploaded ID Card Information</h2>
            {result ? (
                <div>
                    <p>Student Name: {result.studentName}</p>
                    <p>Student ID: {result.studentID}</p>
                    <p>Detected Texts: {result.detectedTexts}</p>
                </div>
            ) : (
                <p>No ID card uploaded yet.</p>
            )}
        </div>
    );
};

export default DisplayResultComponent;
