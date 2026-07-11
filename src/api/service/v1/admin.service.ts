import appConstants from "../../common/appConstants";
import CryptoService from "../../helper/crypto.helper";
import jwtHelper from "../../helper/jwt.helper";
import { Request, Response } from 'express';
// import model from "../../model/Blogs" 

class AdminService {
    static async RegisterAdmin(request : Request, response : Response) {
        try {
            const { email, password, fullName, profileLink } = request.body;

            const hashedPassword = CryptoService.encryptPassword(password);
            const params = [email, hashedPassword, fullName, profileLink ?? ""];
            const result = [[{res : 1}]];
            if (result[0][0].res === 1) {
                return ({ executed: 1, data: {} });
            } else if (result[0][0].res === 2) {
                return ({ executed: 2, data: {} });
            } else {
                return ({ executed: 0, data: {} });
            }
        } catch (error) {
            console.log("error ====>>>", error);
            throw new Error('Failed to login admin');
        }
    }

    // Other methods remain unchanged
}

export default AdminService;
