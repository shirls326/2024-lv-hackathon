// DisplayResultComponent.jsx (for PC view)
import { useEffect, useState } from 'react';

const DisplayResultComponent = () => {
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchResult = async () => {
            try {
                setLoading(true);
                // Adding a delay before fetching results (2 seconds)
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
            } catch (error) {
                console.error('Error fetching ID card data:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
    
        fetchResult();
    }, []);
    

    return (
        <div>
            <h2>Uploaded ID Card Information</h2>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {result ? (
                <div>
                    <p>Student Name: {result.studentName}</p>
                    <p>Student ID: {result.studentID}</p>
                    <img src={result.imageUrl} alt="Uploaded ID Card" style={{ maxWidth: '300px', marginTop: '10px' }} />
                    <p>Detected Texts: {result.detectedTexts}</p>
                </div>
            ) : !loading && !error ? (
                <p>No ID card uploaded yet.</p>
            ) : null}
        </div>
    );
};

export default DisplayResultComponent;
