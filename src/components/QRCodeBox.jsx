// QRCodeBox.jsx
import QRCode from 'react-qr-code';

const QRCodeComponent = () => {
    // const uploadUrl = `${window.location.origin}/upload`; // Generates the URL for the upload page
    const uploadUrl = 'https://youtube.com'; // Generates the URL for the upload page


    return (
        <div>
            <h2>Scan this QR code to upload your ID card</h2>
            <QRCode value={uploadUrl} size={256} />
            <p>Use your phone to scan this code and upload a photo of your ID card.</p>
        </div>
    );
};

export default QRCodeComponent;