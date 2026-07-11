"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_helper_1 = __importDefault(require("../../helper/crypto.helper"));
// import model from "../../model/Blogs" 
class AdminService {
    static async RegisterAdmin(request, response) {
        try {
            const { email, password, fullName, profileLink } = request.body;
            const hashedPassword = crypto_helper_1.default.encryptPassword(password);
            const params = [email, hashedPassword, fullName, profileLink ?? ""];
            const result = [[{ res: 1 }]];
            if (result[0][0].res === 1) {
                return ({ executed: 1, data: {} });
            }
            else if (result[0][0].res === 2) {
                return ({ executed: 2, data: {} });
            }
            else {
                return ({ executed: 0, data: {} });
            }
        }
        catch (error) {
            console.log("error ====>>>", error);
            throw new Error('Failed to login admin');
        }
    }
}
exports.default = AdminService;
