import logger from "../common/log";
import { Request, Response } from "express";
// import CommonService from "../service/v1/common.service";

class RequestLogger {
    req: any;
    res: any;
    chunks: Buffer[];
    responseBody: any;
    constructor(req : Request, res : Response) {
        this.req = req;
        this.res = res;
        this.chunks = [];
        this.responseBody = null;
        this.setupResponseInterceptors();
    }

    setupResponseInterceptors() {
        const originalWrite = this.res.write;
        const originalEnd = this.res.end;

        this.res.write = (chunk: any, encoding?: BufferEncoding, callback?: (error?: Error | null) => void): boolean => {
            if (chunk) this.chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
            return originalWrite.call(this.res, chunk, encoding, callback);
        };

        this.res.end = (chunk?: any, encoding?: BufferEncoding, callback?: () => void): Response => {
            if (chunk) this.chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
            setImmediate(() => this.logRequestResponse());
            return originalEnd.call(this.res, chunk, encoding, callback);
        };
    }

    getRequestLog() {
        return {
            url: `${this.req.protocol}://${this.req.get("host")}${this.req.originalUrl}`,
            method: this.req.method,
            body: this.req.body,
            header: this.req.headers,
            timestamp: new Date().toISOString(),
        };
    }

    getResponseBody() {
        if (this.responseBody) return this.responseBody;
        if (this.chunks.length > 0) {
            try {
                return Buffer.concat(this.chunks).toString("utf8");
            } catch (err) {
                logger.error("Error parsing response body:", err);
            }
        }
        return null;
    }

    logRequestResponse() {
        // Implement your logging logic here, or leave as a stub for now.
        // Example:
        // const reqLog = this.getRequestLog();
        // const responseBody = this.getResponseBody();
        // logger.info({ request: reqLog, response: responseBody });
    }
}

export default RequestLogger;