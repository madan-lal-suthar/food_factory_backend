import crypto from 'crypto';
import appConstants from '../common/appConstants';

class CryptoService {
  private algorithm: string;
  private key: Buffer;
  private ivLength: number;
  constructor(secret : string) {
    this.algorithm = 'aes-256-cbc';
    this.key = crypto.createHash('sha256').update(secret).digest(); // 32 bytes key
    this.ivLength = 16;
  }

  encryptPassword(recievedPassword : string) : string {
    const iv = crypto.randomBytes(this.ivLength);
    const cipher = crypto.createCipheriv(this.algorithm, this.key, iv);
    let encrypted = cipher.update(recievedPassword, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + ':' + encrypted;
  }

  decryptPassword(encryptedDataWithIv   : string) : string {
    const [ivHex, encryptedData] = encryptedDataWithIv.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const decipher = crypto.createDecipheriv(this.algorithm, this.key, iv);
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }

  matchPassword(plainPassword : string, encryptedPassword : string )  : boolean {
    try {
      const decrypted = this.decryptPassword(encryptedPassword);
      return decrypted === plainPassword;
    } catch (err) {
      return false;
    }
  }
}

const cryptoService = new CryptoService(appConstants.jwtSecret);
export default cryptoService;
