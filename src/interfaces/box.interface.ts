import Iemail from './email.interface';

export default interface Ibox {
    name?: string;
    flags?: string[];
    readOnly?: boolean;
    uidLimit?: number;
    uidNext?: number;
    premFlags?: string[];
    keywords?: string[];
    newKeywords?: boolean;
    persistentUids?: boolean;
    nomodseq?: boolean;
    totalMessages?: number;
    newMessages?: number;
    mails: Iemail[];
}
