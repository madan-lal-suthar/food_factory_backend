import noLoginNeeded from "../common/apiConfig";
import logger from "../common/log";
import jwtHelper from "../helper/jwt.helper";
import appConstants from "../common/appConstants";
import { Request, Response } from "express";

// Extend Express Request interface to include 'decoded'
declare module "express-serve-static-core" {
    interface Request {
        decoded?: any;
    }
}


class TokenVerifier {
    static isLoginRequired(path : string) {
        return !noLoginNeeded.some((route) => path.includes(route));
    }

    static async verifyAndValidateToken(token : string, req : Request, res : Response) {
        try {
            const authDecodedData = await jwtHelper.verifyToken(token);
            if (!authDecodedData) throw new Error("Invalid token");

            
            req.decoded = authDecodedData;
            const userData = await TokenVerifier.validateToken(req, res);
            if (
                !userData ||
                !userData.executed ||
                !userData.data?.isValidate ||
                !TokenVerifier.validateRequestUrlPath(req)
            ) {
                throw new Error("User validation failed");
            }

            return true;
        } catch (err) {
            logger.error("Token verification failed:", err);
            return false;
        }
    }
    static async validateToken(req : Request, res : Response) {
		if (req.decoded.userType == appConstants.USER_TYPE.USER) {
			try {
				const params = [req.decoded.userId];
				const result = ""
				if (result.length > 0) {
					return {
						executed: 1,
						data: {
							isValidate: true,
						},
					};
				}
				return {
					executed: 0,
					data: {
						isValidate: false,
					},
				};
			} catch (error) {
				throw error;
			}
		}
		return {
			executed: 0,
			data: {
				isValidate: false,
			},
		};
	}
    static validateRequestUrlPath(req : Request) {
        const { userType } = req.decoded;
        const path = req.path;

        if (userType === "ADMIN") {
            return path.includes("/admin/") || path.includes("/common/");
        } else if (userType === 1) {
            return (
                path.includes("/user/") ||
                path.includes("/common/") ||
                path.includes("/admin/")
            );
        }
        return false;
    }
}

export default TokenVerifier;