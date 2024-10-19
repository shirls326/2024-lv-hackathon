import AWS from 'aws-sdk';

AWS.config.update({
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
    region: 'us-west-2',
});

const s3 = new AWS.S3();
const rekognition = new AWS.Rekognition();

export { s3, rekognition };
