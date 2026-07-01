import SendGrid from '@sendgrid/mail';
import cryptoHelper from './crypto.helper.js';
import jwt from 'jsonwebtoken';
import appConstants from '../common/appConstants.js';
import jwtHelper from './jwt.helper.js';
import config from '../common/config.js';
// let SendGrid : Object
interface EmailAttachment {
  data: Buffer;
  name: string;
  mimetype?: string;
}

class EmailHelper {
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.SENDGRID_API_KEY || "";
    if (!this.apiKey) {
      throw new Error('SENDGRID_API_KEY is missing in environment variables');
    }
    SendGrid.setApiKey(this.apiKey);
  }

  async sendEmailWithAttachment({
    to,
    from,
    subject,
    text,
    html,
    attachments = [],
  }: {
    to: string;
    from: string;
    subject: string;
    text: string;
    html?: string;
    attachments?: EmailAttachment[];
  }): Promise<any> {
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
      const response = await SendGrid.send(msg);
      console.log('✅ Email sent successfully with attachments!...');
      return response;
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'response' in error) {
        // @ts-ignore
        console.error('❌ Email failed:', error.response?.body || (error as any).message);
      } else {
        console.error('❌ Email failed:', (error as any)?.message || error);
      }
      throw error;
    }
  }

  async sendEmail(
    to: string,
    subject: string,
    text: string,
    html?: string
  ): Promise<any> {
    const msg = {
      from: "no_reply@example.app",
      to: to || "no_reply@example.app",
      subject: subject,
      text,
      html: html,
    };

    try {
      const response = await SendGrid.send(msg);
      console.log('✅ Email sent successfully...');
      return response;
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'response' in error) {
        // @ts-ignore
        console.error('❌ Email failed:', error.response?.body || (error as any).message);
      } else {
        console.error('❌ Email failed:', (error as any)?.message || error);
      }
      return error;
    }
  }
}

export default new EmailHelper();
