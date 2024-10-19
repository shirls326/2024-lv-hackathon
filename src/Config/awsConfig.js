import { S3Client } from "@aws-sdk/client-s3";

const s3 = new S3Client({
    region: "us-west-2",
    credentials: {
        accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY,
        secretAccessKey: import.meta.env.VITE_AWS_SECRET_KEY,
    },
});

export { s3 };
