"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// helpers/BucketHelper.js
const client_s3_1 = require("@aws-sdk/client-s3");
const path_1 = __importDefault(require("path"));
const config_1 = __importDefault(require("../common/config"));
const appConstants_1 = __importDefault(require("../common/appConstants"));
const s3Client = new client_s3_1.S3Client({
    region: appConstants_1.default.AWS_REGION,
    credentials: {
        accessKeyId: appConstants_1.default.AWS_ACCESS_KEY_ID,
        secretAccessKey: appConstants_1.default.AWS_SECRET_ACCESS_KEY,
    },
});
class BucketHelper {
    /**
     * Uploads a file to the bucket
     * @param {Object} req - The request object
     * @param {Object} res - The response object
     * @returns {Promise<Object>} Uploaded file metadata
     */
    static async uploadMedia(req, res) {
        try {
            if (req.files && req.files.file) {
                const file = req.files.file;
                const folder = req.body.folder || 'other';
                const fileName = req.body.status
                    ? file.name
                    : `${folder}_${Date.now()}${path_1.default.extname(file.name)}`;
                const bucketName = appConstants_1.default.AWS_BUCKET_NAME;
                const bucketPath = `${config_1.default.S3BUCKET_FOLDER}/${folder}`;
                const key = `${bucketPath}/${fileName}`;
                const baseUri = `https://${bucketName}.s3.${appConstants_1.default.AWS_REGION}.amazonaws.com`;
                const params = {
                    Bucket: bucketName,
                    Key: key,
                    Body: file.data,
                    ContentType: file.mimetype || 'image/jpeg',
                };
                const command = new client_s3_1.PutObjectCommand(params);
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
            }
            else {
                return { executed: 0, data: {}, message: 'No file uploaded.' };
            }
        }
        catch (err) {
            console.error('Error uploading media:', err);
            const errorMessage = err instanceof Error ? err.message : String(err);
            return { executed: 0, data: {}, error: errorMessage };
        }
    }
}
exports.default = BucketHelper;
