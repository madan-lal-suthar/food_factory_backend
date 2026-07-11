"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = __importDefault(require("../common/log"));
// import CommonService from "../service/v1/common.service";
class RequestLogger {
    req;
    res;
    chunks;
    responseBody;
    constructor(req, res) {
        this.req = req;
        this.res = res;
        this.chunks = [];
        this.responseBody = null;
        this.setupResponseInterceptors();
    }
    setupResponseInterceptors() {
        const originalWrite = this.res.write;
        const originalEnd = this.res.end;
        this.res.write = (chunk, encoding, callback) => {
            if (chunk)
                this.chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
            return originalWrite.call(this.res, chunk, encoding, callback);
        };
        this.res.end = (chunk, encoding, callback) => {
            if (chunk)
                this.chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
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
        if (this.responseBody)
            return this.responseBody;
        if (this.chunks.length > 0) {
            try {
                return Buffer.concat(this.chunks).toString("utf8");
            }
            catch (err) {
                log_1.default.error("Error parsing response body:", err);
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
exports.default = RequestLogger;
