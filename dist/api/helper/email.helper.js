"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mail_1 = __importDefault(require("@sendgrid/mail"));
class EmailHelper {
    apiKey;
    constructor() {
        this.apiKey = process.env.SENDGRID_API_KEY || "";
        if (!this.apiKey) {
            throw new Error('SENDGRID_API_KEY is missing in environment variables');
        }
        mail_1.default.setApiKey(this.apiKey);
    }
    async sendEmailWithAttachment({ to, from, subject, text, html, attachments = [], }) {
        const formattedAttachments = attachments.map(att => ({
            content: att.data.toString('base64'),
            filename: att.name,
            type: att.mimetype || 'application/octet-stream',
            disposition: 'attachment',
        }));
        const msg = {
            to,
            from,
            subject,
            text,
            html: html || `<p>${text}</p>`,
            attachments: formattedAttachments,
        };
        try {
            const response = await mail_1.default.send(msg);
            console.log('✅ Email sent successfully with attachments!...');
            return response;
        }
        catch (error) {
            if (error && typeof error === 'object' && 'response' in error) {
                // @ts-ignore
                console.error('❌ Email failed:', error.response?.body || error.message);
            }
            else {
                console.error('❌ Email failed:', error?.message || error);
            }
            throw error;
        }
    }
    async sendEmail(to, subject, text, html) {
        const msg = {
            from: "no_reply@example.app",
            to: to || "no_reply@example.app",
            subject: subject,
            text,
            html: html,
        };
        try {
            const response = await mail_1.default.send(msg);
            console.log('✅ Email sent successfully...');
            return response;
        }
        catch (error) {
            if (error && typeof error === 'object' && 'response' in error) {
                // @ts-ignore
                console.error('❌ Email failed:', error.response?.body || error.message);
            }
            else {
                console.error('❌ Email failed:', error?.message || error);
            }
            return error;
        }
    }
}
exports.default = new EmailHelper();
