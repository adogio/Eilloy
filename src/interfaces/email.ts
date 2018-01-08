export default interface IEmail {
    queue: number;
    subject?: string;
    from?: string;
    to?: string;
    cc?: string;
    bcc?: string;
    date?: string;
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
    received?: string[];
    priority?: string;
    sensitivity?: string;
    content?: string;
    contentType?: string;
    attachment?: {
        fileName: string;
        checksum: string;
        contentType: string;
        size: number;
    };
}
