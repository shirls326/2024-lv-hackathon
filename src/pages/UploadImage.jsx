// src/pages/UploadPage.jsx
import { useState } from 'react';
import { s3 } from '../awsConfig'; // Make sure awsConfig is properly configured to include S3 details

const UploadPage = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setUploadSuccess(false); // Reset upload success when a new file is selected
    };

    const handleUpload = async () => {
        if (!selectedFile) return;

        const params = {
            Bucket: 'your-s3-bucket-name', // Replace with your actual S3 bucket name
            Key: `uploads/${selectedFile.name}`,
            Body: selectedFile,
            ContentType: selectedFile.type,
        };

        setUploading(true);

        try {
            await s3.upload(params).promise();
            setUploading(false);
            setUploadSuccess(true);
            console.log('File uploaded successfully.');
        } catch (error) {
            setUploading(false);
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div>
            <h2>Upload Your ID Card</h2>
            <input type="file" accept="image/*" capture="environment" onChange={handleFileChange} />
            <button onClick={handleUpload} disabled={!selectedFile || uploading}>
                {uploading ? 'Uploading...' : 'Upload'}
            </button>
            {uploadSuccess && <p>Upload successful! You can close this page now.</p>}
        </div>
    );
};

export default UploadPage;
