import * as Imap from 'imap';
import * as mailer from 'nodemailer';

interface IConfig {
    host: string;
    port: number;
    secure: true;
    auth: {
        user: string;
        pass: string;
    };
}

interface IMail {
    from: string;
    to: string;
    subject: string;
    priority?: 'high' | 'normal' | 'low';
    text?: string;
    html?: string;
    headers?: Array<{
        key: string;
        value: string;
    }>;
    attachments?: Array<{
        filename: string;
        path: string;
        cid?: number;
    }>;
}

class Mailer {

    private transporter: any;

    public constructor(config: IConfig) {
        this.transporter = mailer.createTransport(config);
    }

    public send(config: IMail) {
        let ano: IMail = config;
        if (!Boolean(ano.priority)) {
            ano.priority = 'low';
        }
        if (!Boolean(ano.headers)) {
            ano.headers = [{
                key: 'eilloy',
                value: 'test',
            }];
        } else {
            ano.headers.push({
                key: 'eilloy',
                value: 'test',
            });
        }
        return new Promise((resolve: (data: any) => void, reject: (err: Error) => void) => {
            this.transporter.sendMail(config, (error: Error, info: any) => {
                if (error) {
                    console.log(error);
                    reject(error);
                    throw error;
                }
                resolve(info);
            });
        });
    }

    public sent() {
        const b = new Imap({
            user: 'eilloytest@mail.com',
            password: 'R2pOD2E6sYttC0h',
            host: 'imap.mail.com',
            port: 993,
            tls: true,
            tlsOptions: {
                rejectUnauthorized: false,
            },
        });
    }
}

export default Mailer;
