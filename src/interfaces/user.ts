import { Config } from 'imap';

export default interface IUser extends Config {
    user: string;
    password: string;
    host: string;
    port?: number;
    tls?: boolean;
    nickName: string;
    tlsOptions?: {
        rejectUnauthorized: boolean;
    };
}
