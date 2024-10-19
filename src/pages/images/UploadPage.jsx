import { useState } from 'react';
import { s3 } from '../../Config/awsConfig';
import { PutObjectCommand } from '@aws-sdk/client-s3';

const UploadPage = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setUploadSuccess(false);
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
