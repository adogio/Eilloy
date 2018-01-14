import { Config } from 'imap';

export default interface IUser extends Config {
    user: string;
    password: string;
    smtp: string;
    imap: string;
    portImap: number;
    portSmtp: number;
    sign?: string;
    tls?: boolean;
    nickName: string;
    tlsOptions?: {
        rejectUnauthorized: boolean;
    };
}
