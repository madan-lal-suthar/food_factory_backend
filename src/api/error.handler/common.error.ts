import localizeString from "../localization/localize.string";


interface CommonErrorOptions {
    key: string;
    status?: number;
    code?: number;
    details?: any;
    language?: string;
    data?: any;
    dynamicParams?: Record<string, any>;
}

class CommonError extends Error {
    public messageKey: string;
    public status: number;
    public code: number;
    public details: any;
    public data: any;

    constructor({ key, status = 400, code = 1000, details = null, language = "en", data = {}, dynamicParams = {} }: CommonErrorOptions) {
        super();

        this.name = this.constructor.name;
        this.messageKey = key;
        this.message = localizeString.localize(key, language, dynamicParams);
        this.status = status;
        this.code = code;
        this.details = details;
        this.data = data;
    }
}

export default CommonError;