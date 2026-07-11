"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const appConstants_1 = __importDefault(require("../common/appConstants"));
class CryptoService {
    algorithm;
    key;
    ivLength;
    constructor(secret) {
        this.algorithm = 'aes-256-cbc';
        this.key = crypto_1.default.createHash('sha256').update(secret).digest(); // 32 bytes key
        this.ivLength = 16;
    }
    encryptPassword(recievedPassword) {
        const iv = crypto_1.default.randomBytes(this.ivLength);
        const cipher = crypto_1.default.createCipheriv(this.algorithm, this.key, iv);
        let encrypted = cipher.update(recievedPassword, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return iv.toString('hex') + ':' + encrypted;
    }
    decryptPassword(encryptedDataWithIv) {
        const [ivHex, encryptedData] = encryptedDataWithIv.split(':');
        const iv = Buffer.from(ivHex, 'hex');
        const decipher = crypto_1.default.createDecipheriv(this.algorithm, this.key, iv);
        let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }
    matchPassword(plainPassword, encryptedPassword) {
        try {
            const decrypted = this.decryptPassword(encryptedPassword);
            return decrypted === plainPassword;
        }
        catch (err) {
            return false;
        }
    }
}
const cryptoService = new CryptoService(appConstants_1.default.jwtSecret);
exports.default = cryptoService;
