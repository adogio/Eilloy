import * as fs from 'fs';
import * as Imap from 'imap';
import { MailParser } from 'mailparser';
import Iemail from '../interfaces/email.interface';

export default class {
    private config: Imap.Config;
    private nickName: string;
    private imap: Imap;

    public constructor(config: Iemail) {
        this.config = config;
        this.nickName = config.nickName;
    }

    public init() {
        this.imap = new Imap(this.config);
        this.imap.on('error', (err: Error) => {
            console.log(err);
            throw err;
        });
        this.imap.on('end', () => {
            console.log('关闭邮箱');
        });
    }

    public search(since: string) {
        this.imap.once('ready', () => {
            this.openInbox((inboxError: Error, box: any) => {
                console.log("打开邮箱");
                if (inboxError) {
                    throw inboxError;
                }
                this.imap.search(['UNSEEN', ['SINCE', since]], (searchErr: Error, results: number[]) => {
                    if (searchErr) {
                        throw searchErr;
                    }
                    const f = this.imap.fetch(results, {
                        bodies: '',
                    }); // 抓取邮件（默认情况下邮件服务器的邮件是未读状态）
                    f.on('message', (msg: Imap.ImapMessage, seq: number) => {
                        const mailparser: MailParser = new MailParser();
                        msg.on('body', (stream: NodeJS.ReadableStream, info: Imap.ImapMessageBodyInfo) => {
                            stream.pipe(mailparser);
                            mailparser.on("headers", (headers) => {
                                console.log("邮件头信息>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
                                console.log("邮件主题: " + headers.get('subject'));
                                console.log("发件人: " + headers.get('from').text);
                                console.log("收件人: " + headers.get('to').text);
                            });
                            mailparser.on("data", (data) => {
                                if (data.type === 'text') { // 邮件正文
                                    console.log("邮件内容信息>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
                                    console.log("邮件内容: " + data.html);
                                }
                                if (data.type === 'attachment') { // 附件
                                    console.log("邮件附件信息>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
                                    console.log("附件名称:" + data.filename); // 打印附件的名称
                                    data.content.pipe(fs.createWriteStream(data.filename)); // 保存附件到当前目录下
                                    data.release();
                                }
                            });
                        });
                        msg.once('end', () => {
                            console.log(seq + '完成');
                        });
                        f.once('error', (mailparserErr: Error) => {
                            console.log('抓取出现错误: ' + mailparserErr);
                            throw mailparserErr;
                        });
                        f.once('end', () => {
                            console.log('所有邮件抓取完成!');
                            this.imap.end();
                        });
                    });
                });
            });
        });
    }

    public connect() {
        this.imap.connect();
    }

    public openInbox(callBack: (inboxError: Error, box: any) => void) {
        this.imap.openBox('INBOX', true, callBack);
    }
}
