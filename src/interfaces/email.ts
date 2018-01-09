export default interface IEmail {
    queue: number;
    size?: number;
    which?: string;
    uid?: number;
    subject?: string;
    from?: string;
    to?: string;
    cc?: string;
    bcc?: string;
    date?: Date;
    attrDate?: Date;
    messageId?: string;
    returnPath?: {
        html: string;
        text: string;
    };
    inReplyTo?: string;
    replyTo?: string | {
        html: string;
        text: string;
    };
    flags?: string[];
    received?: string[];
    priority?: string;
    antiSpam?: string;
    sensitivity?: string;
    content?: string;
    contentType?: string;
    transferEncoding?: string;
    mime?: string;
    attachment?: Array<{
        fileName?: string;
        checksum?: string;
        contentType?: string;
        size?: number;
    }>;
}
