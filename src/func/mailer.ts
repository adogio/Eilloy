import * as Imap from 'imap';
import * as mailer from 'nodemailer';
declare const require: any;
const MailComposer = require('nodemailer/lib/mail-composer');

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
        if (!Boolean(config.priority)) {
            config.priority = 'low';
        }
        if (!Boolean(config.headers)) {
            config.headers = [{
                key: 'eilloy',
                value: 'test',
            }];
        } else {
            config.headers.push({
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
                this.sent(config).then(() => {
                    resolve(info);
                });
            });
        });
    }

    public sent(config: IMail) {
        return new Promise((resolve: () => void, reject: (err: Error) => void) => {
            let composer = new MailComposer(config);
            composer.compile().build((err: any, message: any) => {
                if (err) {
                    console.log(err);
                    reject(err);
                    throw err;
                }
                const imap = new Imap({
                    user: 'eilloytest@mail.com',
                    password: 'R2pOD2E6sYttC0h',
                    host: 'imap.mail.com',
                    port: 993,
                    tls: true,
                    tlsOptions: {
                        rejectUnauthorized: false,
                    },
                });
                imap.on('error', (imapErr: Error) => {
                    console.log(imapErr);
                    reject(imapErr);
                    throw imapErr;
                });
                imap.on('ready', () => {
                    imap.append(message, {
                        mailbox: 'test',
                    }, (appendError: Error) => {
                        if (appendError) {
                            console.log(appendError);
                            reject(appendError);
                            throw appendError;
                        }
                        imap.end();
                    });
                });
                imap.once('end', () => {
                    resolve();
                });
                imap.connect();
            });
        });
    }
}

export default Mailer;
