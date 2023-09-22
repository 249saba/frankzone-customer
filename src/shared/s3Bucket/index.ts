
import { S3Client, AbortMultipartUploadCommand, PutObjectCommand, UploadPartCommandInput } from "@aws-sdk/client-s3";
import { getUniqueId } from "../utils/getUniqueName";
const awsConfig = {
    region: 'eu-central-1',
    credentials: {
        bucketName: 'frankzone-assets',
        dirName: 'media', /* optional */
        accessKeyId: 'AKIAQKLGOCBCOMVVD3HJ',
        secretAccessKey: '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',
    },
  };

const client = new S3Client(awsConfig);

export const UploadFileS3Bucket = async(file: any, path: any) => {
    console.log("file ==", file.name.split('.').pop())
    const params = {
        Bucket: awsConfig.credentials.bucketName,
        Key: path+'/'+getUniqueId()+'.'+file?.name.split('.').pop(), // The key (object name) under which the file will be stored in S3
        Body: file, // The binary data of the image file
    };
    

    const command = new PutObjectCommand(params);
    try {
        const data = await client.send(command);
        // process data.

        return `https://frankzone-assets.s3.eu-central-1.amazonaws.com/${params.Key}`;
      } catch (error) {
        console.log("error s3 ==", error)
        // error handling.
      } finally {
        // finally.
      }
          
}

