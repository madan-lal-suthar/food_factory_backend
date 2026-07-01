import CommonError from './common.error';
import LocalizationKeys from '../localization/localization.keys';
import LocalizeString from '../localization/localize.string';
class ErrorHandler {
    static handleError(res: import('express').Response, error: unknown) {
        if (error instanceof CommonError) {
            return res.status(error.status).json(
                {
                    status: error.status,
                    message: error.message,
                    details: error.details || {},
                    data: error.data || {}

                }
            );
        }

        return res.status(500).json(
            {
                status: 500,
                message: LocalizeString.localize(LocalizationKeys.GENERAL_ERROR, "en"),
                details: (typeof error === 'object' && error !== null && 'message' in error) ? (error as any).message : 'Unknown error',
                data: {}
            }
        );
    }
}

export default ErrorHandler;