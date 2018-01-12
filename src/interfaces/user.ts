import { Config } from 'imap';

export default interface IUser extends Config {
    user: string;
    password: string;
    smtp: string;
    imap: string;
    portImap: number;
    portSmtp: number;
    tls?: boolean;
    nickName: string;
    tlsOptions?: {
        rejectUnauthorized: boolean;
    };
}
