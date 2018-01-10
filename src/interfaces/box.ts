import Iemail from './email';

export default interface Ibox {
    name?: string;
    gName?: string;
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
    attribs?: string[];
    special?: string;
    children?: any[];
    mails: Iemail[];
}
