import { useState, useEffect } from 'react';
import { s3 } from '../../Config/awsConfig';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import DisplayResult from '../../Components/DisplayResult'; // Adjust the import path as needed


const UploadPage = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [checkResults, setCheckResults] = useState(false);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setUploadSuccess(false);
        setCheckResults(false); // Reset result checking state
    };

    const handleUpload = async () => {
        if (!selectedFile) return;

        const params = {
            Bucket: 'myimagestoragekd',
            Key: `uploads/${selectedFile.name}`,
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
