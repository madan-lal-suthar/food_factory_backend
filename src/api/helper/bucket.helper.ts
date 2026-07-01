// helpers/BucketHelper.js
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import path from 'path';
import config from '../common/config';
import appConstants from '../common/appConstants';

const s3Client = new S3Client({
    region: appConstants.AWS_REGION,
    credentials: {
        accessKeyId: appConstants.AWS_ACCESS_KEY_ID,
        secretAccessKey: appConstants.AWS_SECRET_ACCESS_KEY,
    },
});

class BucketHelper {
    /**
     * Uploads a file to the bucket
     * @param {Object} req - The request object
     * @param {Object} res - The response object
     * @returns {Promise<Object>} Uploaded file metadata
     */
    static async uploadMedia(req: any, res: any): Promise<{ executed: number; data: any; message?: string; error?: string }> {
        try {
            if (req.files && req.files.file) {
                const file = req.files.file;
                const folder = req.body.folder || 'other';
                const fileName = req.body.status
                    ? file.name
                    : `${folder}_${Date.now()}${path.extname(file.name)}`;

                const bucketName = appConstants.AWS_BUCKET_NAME;
                const bucketPath = `${config.S3BUCKET_FOLDER}/${folder}`;
                const key = `${bucketPath}/${fileName}`;
                const baseUri = `https://${bucketName}.s3.${appConstants.AWS_REGION}.amazonaws.com`;

                const params = {
                    Bucket: bucketName,
                    Key: key,
                    Body: file.data,
                    ContentType: file.mimetype || 'image/jpeg',
                };

                const command = new PutObjectCommand(params);
                const uploadData = await s3Client.send(command);

                console.log('File upload successful:', uploadData);

                return {
                    executed: 1,
                    data: {
                        baseUri,
                        key,
                        mediaUrl: key,
                        Location: `${baseUri}/${key}`,
                        uploadData,
                    },
                };
            } else {
                return { executed: 0, data: {}, message: 'No file uploaded.' };
            }
        } catch (err: unknown) {
            console.error('Error uploading media:', err);
            const errorMessage = err instanceof Error ? err.message : String(err);
            return { executed: 0, data: {}, error: errorMessage };
        }
    }


    /**
     * Uploads a buffer file to the bucket
     * @param {Buffer} bufferFile - The file buffer
     * @param {string} filePath - The folder path inside the bucket
     * @param {string} fileName - The file name
     * @param {string} mimetype - The MIME type of the file
     * @returns {Promise<Object>} Uploaded file metadata
    static async uploadBufferMedia(
        bufferFile: Buffer,
        filePath: string,
        fileName: string,
        mimetype: string
    ): Promise<{ executed: number; data: any; error?: string }> {
        try {
            const normalizedPath = filePath.replace(/^\/+|\/+$/g, '');
            const bucketName = appConstants.AWS_BUCKET_NAME;
            const bucketPath = `${config.S3BUCKET_FOLDER}/${normalizedPath}`;
            const key = `${bucketPath}/${fileName}`;
            const baseUri = `https://${bucketName}.s3.${appConstants.AWS_REGION}.amazonaws.com`;
            const baseUri = `https://${bucketName}.s3.${appConstants.AWS_REGION}.amazonaws.com`;

            const params = {
                Bucket: bucketName,
                Key: key,
                Body: bufferFile,
                ContentType: mimetype || 'image/jpeg',
            };

            const command = new PutObjectCommand(params);
            const uploadData = await s3Client.send(command);

            console.log('Buffer file upload successful:', uploadData);

            return {
                executed: 1,
                data: {
                    baseUri,
        } catch (err: unknown) {
            console.error('Error uploading buffer media:', err);
            const errorMessage = err instanceof Error ? err.message : String(err);
            return { executed: 0, data: {}, error: errorMessage };
        }
    }
            };
        } catch (err) {
            console.error('Error uploading buffer media:', err);
            return { executed: 0, data: {}, error: err.message };
    static async createPresignUrl(payload: { count?: string | number; fileExt: string; folderName: string; mimeType: string }): Promise<{ executed: number; data: any; error?: string }> {
        try {
            let count = payload?.count ?? "";
            let fileName =  "media_"+ new Date().getTime().toString() + count.toString();
            // let fileExt = path.extname(req.files.file.name);
            let fileExt =payload.fileExt;
            let folderName =payload.folderName;
            let mimeType=payload.mimeType;
            let key = `${fileName.toString()}${fileExt}`;
            let count = payload?.count ?? "";
            let fileName =  "media_"+ new Date().getTime().toString() + count.toString();
            // let fileExt = path.extname(req.files.file.name);
            let fileExt =payload.fileExt;
            let folderName =payload.folderName;
            let mimeType=payload.mimeType;
            let key = `${fileName.toString()}${fileExt}`;

            const fullKey = `${config.S3BUCKET_FOLDER}/${folderName}/${key}`;

            const command = new PutObjectCommand({
                Bucket: appConstants.AWS_BUCKET_NAME,
                Key: fullKey,
                ContentType: mimeType,
            });

            try {
                const presignUrl = await getSignedUrl(s3Client, command, { expiresIn: 3000 }); // Expires in seconds

                const linkUrl = `${appConstants.S3_BASE_URL}${fullKey}`;

                return {
            }catch(err: unknown){
                console.error('Error presign url:::::', err);
                const errorMessage = err instanceof Error ? err.message : String(err);
                return { executed: 0, data: {}, error: errorMessage };
            }
        } catch (err: unknown) {
            console.error('Error presign url:', err);
            const errorMessage = err instanceof Error ? err.message : String(err);
            return { executed: 0, data: {}, error: errorMessage };
        }
    }
                return { executed: 0, data: {}, error: err.message };
            }
        } catch (err) {
            console.error('Error presign url:', err);
            return { executed: 0, data: {}, error: err.message };
        }
    }
    */
}

export default BucketHelper;
