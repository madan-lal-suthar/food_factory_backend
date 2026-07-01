import appConstants from "../common/appConstants";
import jwt, { SignOptions, JwtPayload } from "jsonwebtoken";

class JWTService {
  private secret: string;
  private expiresIn: SignOptions["expiresIn"];

  constructor() {
    this.secret = appConstants.jwtSecret;
    this.expiresIn = appConstants.jwtExpiredTime as SignOptions["expiresIn"];
  }

  generatejwtTokenWithData(data: object) {
    const token = jwt.sign(data, this.secret, {
      expiresIn: this.expiresIn,
    });
    return token;
  }

  async verifyToken(token: string): Promise<string | JwtPayload | null> {
    try {
      const decodedToken = jwt.verify(token, this.secret);
      return decodedToken as string | JwtPayload;
    } catch (error) {
      return null;
    }
  }
}

export default new JWTService();
