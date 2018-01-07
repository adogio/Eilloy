export default interface IEmail {
    queue: number;
    subject?: string;
    from?: string;
    to?: string;
    cc?: string;
    bcc?: string;
    date?: string;
    messageId?: string;
    returnPath?: string;
    inReplyTo?: string;
    replyTo?: string;
    received?: string[];
    priority?: string;
    sensitivity?: string;
    content?: string | boolean;
    contentType?: string;
    attachment?: {
        fileName: string;
        checksum: string;
        contentType: string;
        size: number;
    };
}
