import AdminService from '../../service/v1/admin.service';
import validate from '../../validator/validation.utils';
import localizeString from '../../localization/localize.string';
import { Request, Response, NextFunction } from 'express';

class AdminController {
  static async RegisterAdmin(req: Request, res: Response, next: NextFunction) {
    const languageHeader = req.headers["language"];
    const language = Array.isArray(languageHeader) ? languageHeader[0] : languageHeader;
    try {
  // Normalize language header to always be a string

  if (validate.fieldValidation(req.body.fullName)) {
    return res.json({
      status: 400,
      data: {},
      message: localizeString.localize("FULLNAME_REQUIRED", language)
    });
  } else if (validate.fieldValidation(req.body.email)) {
    return res.json({ status: 400, data: {}, message: localizeString.localize("EMAIL_REQUIRED", language) });
  } else if (validate.fieldValidation(req.body.password)) {
    return res.json({ status: 400, data: {}, message: localizeString.localize("PASSWORD_REQUIRED", language) });
  }

  const adminDetail = await AdminService.RegisterAdmin(req, res);
  if (adminDetail.executed == 1) {
    return res.json({ status: 200, data: {}, message: localizeString.localize("REGISTRATION_SUCCESSFULLY_MSG", language) });
  } else if (adminDetail.executed == 2) {
    return res.json({ status: 400, data: {}, message: localizeString.localize("EMAIL_ALREADY_EXISTS", language) });
  } else {
    return res.json({ status: 400, data: {}, message: localizeString.localize("FAILED", language) });
  }
} catch (error) {
  console.log(error);
  return res.json({ status: 400, data: {}, message: localizeString.localize("FAILED", language) });
}
  }

  // Other methods remain unchanged...
}

export default AdminController;
