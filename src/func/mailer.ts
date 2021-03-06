import * as Imap from 'imap';
import * as mailer from 'nodemailer';

import IUser from '../interfaces/user';

import logger from './logger';

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
    private config: IUser;

    public constructor(config: IUser) {
        this.config = config;
        this.transporter = mailer.createTransport({
            host: config.smtp,
            port: config.portSmtp,
            secure: true,
            auth: {
                user: config.user,
                pass: config.password,
            },
        });
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
                    logger('sent-mail', error);
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
                    logger('put mail in sent box', err);
                    reject(err);
                    throw err;
                }
                const imap = new Imap({
                    user: this.config.user,
                    password: this.config.password,
                    host: this.config.imap,
                    port: this.config.portImap,
                    tls: this.config.tls,
                    tlsOptions: this.config.tlsOptions,
                });
                imap.on('error', (imapErr: Error) => {
                    logger('imap error', imapErr);
                    reject(imapErr);
                    throw imapErr;
                });
                imap.on('ready', () => {
                    imap.append(message, {
                        mailbox: 'Sent',
                    }, (appendError: Error) => {
                        if (appendError) {
                            logger('append error', appendError);
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
