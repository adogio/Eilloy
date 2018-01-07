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
    text?: string;
    html?: string;
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
}

export default Mailer;
