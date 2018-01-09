import * as fs from 'fs';
import * as Imap from 'imap';
import { Config } from 'imap';
import { MailParser } from 'mailparser';
import Ibox from '../interfaces/box';
import Iemail from '../interfaces/email';
import Iuser from '../interfaces/user';

class ImapConfiger {
    private config: Config;
    private nickName: string;

    public constructor(userConfig: Iuser) {
        this.config = userConfig;
        this.nickName = userConfig.nickName;
    }

    public search(since: string) {
        return new Promise((resolve: (result: any) => void, reject: (error: any) => void) => {
            let reList: Iemail[] = [];
            let reBox: Ibox = {
                mails: reList,
            };
            const imap = new Imap(this.config);
            imap.on('error', (err: Error) => {
                console.log(err);
                throw err;
            });
            imap.on('end', () => {
                resolve(reBox);
                // console.log('关闭邮箱');
            });
            imap.once('ready', () => {
                this.openInbox(imap, (inboxError: Error, box: any) => {
                    // console.log("打开邮箱");
                    reBox.name = box.name;
                    reBox.flags = box.flags;
                    reBox.readOnly = box.readOnly;
                    reBox.uidLimit = box.uidvalidity;
                    reBox.uidNext = box.uidnext;
                    reBox.premFlags = box.permFlags;
                    reBox.keywords = box.keywords;
                    reBox.newKeywords = box.newKeywords;
                    reBox.persistentUids = box.persistentUIDs;
                    reBox.nomodseq = box.nomodseq;
                    reBox.newMessages = box.messages ? box.messages.new : null;
                    reBox.totalMessages = box.messages ? box.messages.total : null;
                    if (inboxError) {
                        reject(inboxError);
                        throw inboxError;
                    }
                    imap.search([['SINCE', since]], (searchErr: Error, results: number[]) => {
                        if (searchErr) {
                            reject(searchErr);
                            throw searchErr;
                        }
                        const f = imap.fetch(results, {
                            bodies: '',
                            // markSeen: true // 取消注释变为已读
                        }); // 抓取邮件（默认情况下邮件服务器的邮件是未读状态）
                        f.on('message', (msg: Imap.ImapMessage, seq: number) => {
                            const mailparser: MailParser = new MailParser();
                            const singleEmail: Iemail = {
                                queue: seq,
                                attachment: [],
                            };
                            msg.once('body', (stream: NodeJS.ReadableStream, info: Imap.ImapMessageBodyInfo) => {
                                stream.pipe(mailparser);
                                singleEmail.size = info.size;
                                singleEmail.which = info.which;
                                mailparser.once("headers", (header: any) => {
                                    singleEmail.received = header.get('received');
                                    singleEmail.returnPath = header.get('return-path');
                                    singleEmail.messageId = header.get('message-id');
                                    singleEmail.cc = header.get('cc');
                                    singleEmail.bcc = header.get('bcc');
                                    singleEmail.mime = header.get('mime-version');
                                    singleEmail.priority = header.get('priority');
                                    singleEmail.antiSpam = header.get('x-gmx-antispam');
                                    singleEmail.transferEncoding = header.get('content-transfer-encoding');
                                    singleEmail.sensitivity = header.get('sensitivity');
                                    singleEmail.date = header.get('date');
                                    singleEmail.subject = header.get('subject');
                                    singleEmail.from = header.get('from').text;
                                    singleEmail.to = header.get('to').text;
                                });
                                mailparser.once("data", (data: any) => {
                                    if (data.type === 'text') {
                                        let html = "";
                                        if (Boolean(data.html)) {
                                            html = data.html.toString();
                                        }
                                        singleEmail.content = html;
                                    }
                                    if (data.type === 'attachment') { // 附件
                                        singleEmail.attachment.push({
                                            fileName: data.filename,
                                            checksum: data.checksum,
                                            contentType: data.contentType,
                                            size: data.size,
                                        });
                                        // data.content.pipe(fs.createWriteStream(data.filename)); // 保存附件到当前目录下
                                        data.release();
                                    }
                                });
                            });
                            msg.once('attributes', (attrs: Imap.ImapMessageAttributes) => {
                                singleEmail.uid = attrs.uid;
                                singleEmail.attrDate = attrs.date;
                                singleEmail.flags = attrs.flags;
                            });
                            msg.once('end', () => {
                                reList.push(singleEmail);
                            });
                        });
                        f.once('error', (mailparserErr: Error) => {
                            console.log('Fetch Error: ' + mailparserErr);
                            reject(mailparserErr);
                            throw mailparserErr;
                        });
                        f.once('end', () => {
                            // console.log('所有邮件抓取完成!');
                            imap.end();
                        });
                    });
                });
            });
            imap.connect();
        });
    }

    public openInbox(imap: Imap, callBack: (inboxError: Error, box: any) => void): void {
        imap.openBox('INBOX', true, callBack);
    }
}


export default ImapConfiger;
