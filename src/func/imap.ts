import * as fs from 'fs';
import * as Imap from 'imap';
import { Config } from 'imap';
import { MailParser } from 'mailparser';

import Ibox from '../interfaces/box';
import Iemail from '../interfaces/email';
import IUser from '../interfaces/user';

import logger from '../func/logger';

class ImapConfiger {
    private user: IUser;
    private config: Config;

    public constructor(userConfig: IUser) {
        this.user = userConfig;
        this.config = {
            user: userConfig.user,
            password: userConfig.password,
            host: userConfig.imap,
            port: userConfig.portImap,
            tls: userConfig.tls,
            tlsOptions: userConfig.tlsOptions,
            keepalive: false,
        };
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
                            bodies: ['HEADER'],
                            struct: true,
                        });
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
                            msg.once('attributes', (attrs: any) => {
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

    public fetchMail(boxName: string, uid: number) {
        return new Promise((resolve: (result: any) => void, reject: (error: any) => void) => {
            let result: Iemail;
            const imap: Imap = new Imap(this.config);
            this.setupImap(imap, () => {
                resolve(result);
            }, () => {
                imap.openBox(boxName, (openErr: Error, box: any) => {
                    const fetch = imap.fetch(uid, {
                        bodies: [``],
                    });
                    fetch.on('message', (msg: Imap.ImapMessage, seq: number) => {
                        const mailparser: MailParser = new MailParser();
                        result = {
                            queue: seq,
                            attachment: [],
                        };
                        msg.once('body', (stream: NodeJS.ReadableStream, info: Imap.ImapMessageBodyInfo) => {
                            stream.pipe(mailparser);
                            result.size = info.size;
                            result.which = info.which;
                            mailparser.once("headers", (header: any) => {
                                result.received = header.get('received');
                                result.returnPath = header.get('return-path');
                                result.messageId = header.get('message-id');
                                result.cc = header.get('cc');
                                result.bcc = header.get('bcc');
                                result.mime = header.get('mime-version');
                                result.priority = header.get('priority');
                                result.antiSpam = header.get('x-gmx-antispam');
                                result.transferEncoding = header.get('content-transfer-encoding');
                                result.sensitivity = header.get('sensitivity');
                                result.date = header.get('date');
                                result.subject = header.get('subject');
                                if (header.get('from')) {
                                    result.from = header.get('from').text;
                                }
                                if (header.get('to')) {
                                    result.to = header.get('to').text;
                                }
                            });
                            mailparser.on('data', (data: any) => {
                                if (data.type === 'text') {
                                    if (Boolean(data.html)) {
                                        result.content = data.html.toString();
                                    }
                                } else if (data.type === 'attachment') {
                                    result.attachment.push({
                                        fileName: data.filename,
                                        checksum: data.checksum,
                                        contentType: data.contentType,
                                        size: data.size,
                                    });
                                    // data.content.pipe(fs.createWriteStream(data.filename)); // 保存附件到当前目录下
                                    data.release();
                                } else {
                                    logger('receive data other than text or attachment', data);
                                }
                            });
                        });
                        msg.once('attributes', (attrs: any) => {
                            result.uid = attrs.uid;
                            result.attrDate = attrs.date;
                            result.flags = attrs.flags;
                        });
                    });
                    fetch.once('error', (mailparserErr: Error) => {
                        logger('imap fetch body error', 'Fetch Error: ' + mailparserErr);
                        reject(mailparserErr);
                        throw mailparserErr;
                    });
                    fetch.once('end', () => {
                        imap.end();
                    });
                });
            });
        });
    }

    public searchAll(since: string) {
        return new Promise((resolve: (result: any) => void, reject: (error: any) => void) => {
            let reBox: Ibox[] = [];
            let current: number = 0;
            const imap: Imap = new Imap(this.config);
            this.setupImap(imap, () => {
                for (let i of reBox) {
                    const thread = new Imap(this.config);
                    this.setupImap(thread, () => {
                        if (current >= reBox.length - 1) {
                            resolve(reBox);
                        }
                    }, () => {
                        current++;
                        thread.openBox(i.gName, (inboxError: Error, mailbox: any) => {
                            i.name = mailbox.name;
                            i.flags = mailbox.flags;
                            i.readOnly = mailbox.readOnly;
                            i.uidLimit = mailbox.uidvalidity;
                            i.uidNext = mailbox.uidnext;
                            i.premFlags = mailbox.permFlags;
                            i.keywords = mailbox.keywords;
                            i.newKeywords = mailbox.newKeywords;
                            i.persistentUids = mailbox.persistentUIDs;
                            i.nomodseq = mailbox.nomodseq;
                            i.newMessages = mailbox.messages ? mailbox.messages.new : null;
                            i.totalMessages = mailbox.messages ? mailbox.messages.total : null;
                            if (inboxError) {
                                reject(inboxError);
                                throw inboxError;
                            }
                            thread.search([['SINCE', since]], (searchErr: Error, results: number[]) => {
                                if (searchErr) {
                                    reject(searchErr);
                                    throw searchErr;
                                }
                                if (results.length === 0) {
                                    return;
                                }
                                const f = thread.fetch(results, {
                                    bodies: ['HEADER'],
                                    struct: true,
                                });
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
                                            console.log(header);
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
                                            if (header.get('from')) {
                                                singleEmail.from = header.get('from').text;
                                            }
                                            if (header.get('to')) {
                                                singleEmail.to = header.get('to').text;
                                            }
                                        });
                                        mailparser.on("data", (data: any) => {
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
                                    msg.once('attributes', (attrs: any) => {
                                        singleEmail.uid = attrs.uid;
                                        singleEmail.attrDate = attrs.date;
                                        singleEmail.flags = attrs.flags;
                                    });
                                    msg.once('end', () => {
                                        i.mails.push(singleEmail);
                                    });
                                });
                                f.once('error', (mailparserErr: Error) => {
                                    console.log('Fetch Error: ' + mailparserErr);
                                    reject(mailparserErr);
                                    throw mailparserErr;
                                });
                                f.once('end', () => {
                                    // console.log('所有邮件抓取完成!');
                                    thread.end();
                                });
                            });
                        });
                    });
                }
            }, () => {
                imap.getBoxes((err: Error, boxes: any) => {
                    let length: number = 0;
                    for (let key in boxes) {
                        if (key) {
                            length++;
                            let currentBox: Ibox = {
                                mails: [],
                                attribs: boxes[key].attribs,
                                children: boxes[key].children,
                                special: boxes[key].special_use_attrib,
                                gName: key,
                            };
                            reBox.push(currentBox);
                        }
                    }
                    imap.end();
                });
            });
        });
    }

    public searchAll_old(since: string) {
        return new Promise((resolve: (result: any) => void, reject: (error: any) => void) => {
            let reBox: Ibox[] = [];
            // {
            //     mails: reList,
            // };
            const imap: Imap = new Imap(this.config);
            imap.on('error', (err: Error) => {
                console.log(err);
                throw err;
            });
            imap.on('end', () => {
                resolve(reBox);
                console.log('关闭邮箱');
            });
            imap.once('ready', () => {
                imap.getBoxes((err: Error, boxes: any) => {
                    let length: number = 0;
                    for (let key in boxes) {
                        if (key) {
                            length++;
                            let currentBox: Ibox = {
                                mails: [],
                                attribs: boxes[key].attribs,
                                children: boxes[key].children,
                                special: boxes[key].special_use_attrib,
                                gName: key,
                            };
                            reBox.push(currentBox);
                        }
                    }
                    this.iterBox(reBox, [['SINCE', since]], reBox.length, imap).then((result: any) => {
                        console.log(result);
                    }).catch((reason: any) => {
                        reject(reason);
                    });
                });
            });
            imap.connect();
        });
    }

    protected setupImap(imap: Imap, end: () => void, ready: () => void) {
        imap.on('error', (err: Error) => {
            console.log(err);
            throw err;
        });
        imap.on('end', () => {
            end();
        });
        imap.once('ready', () => {
            ready();
        });
        imap.connect();
    }

    protected fetchBox(currentBox: Ibox, search: any[], imap: Imap) {
        return new Promise((resolve: (result: any) => void, reject: (error: any) => void) => {
            let reList: Iemail[] = [];
            imap.openBox(currentBox.gName, true, (openErr: Error, mailbox: any) => {
                if (openErr) {
                    reject(openErr);
                }
                currentBox.name = mailbox.name;
                currentBox.flags = mailbox.flags;
                currentBox.readOnly = mailbox.readOnly;
                currentBox.uidLimit = mailbox.uidvalidity;
                currentBox.uidNext = mailbox.uidnext;
                currentBox.premFlags = mailbox.permFlags;
                currentBox.keywords = mailbox.keywords;
                currentBox.newKeywords = mailbox.newKeywords;
                currentBox.persistentUids = mailbox.persistentUIDs;
                currentBox.nomodseq = mailbox.nomodseq;
                currentBox.newMessages = mailbox.messages ? mailbox.messages.new : null;
                currentBox.totalMessages = mailbox.messages ? mailbox.messages.total : null;
                imap.search(search, (searchErr: Error, results: number[]) => {
                    if (searchErr) {
                        reject(searchErr);
                    }
                    if (results.length === 0) {
                        resolve(currentBox.name);
                        console.log(currentBox.name, 'None!');
                        return;
                    }
                    const f = imap.fetch(results, {
                        bodies: '',
                    });
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
                        msg.once('attributes', (attrs: any) => {
                            singleEmail.uid = attrs.uid;
                            singleEmail.attrDate = attrs.date;
                            singleEmail.flags = attrs.flags;
                        });
                        msg.once('end', () => {
                            currentBox.mails.push(singleEmail);
                        });
                    });
                    f.once('error', (mailparserErr: Error) => {
                        console.log('Fetch Error: ' + mailparserErr);
                        reject(mailparserErr);
                    });
                    f.once('end', () => {
                        resolve(currentBox.name);
                        console.log(currentBox.name, 'Done!');
                        imap.end();
                    });
                });
            });
        });


    }

    protected iterBox(boxes: Ibox[], since: any[], maxLength: number, imap: Imap) {
        return new Promise((resolve: (result: any) => void, reject: (error: any) => void) => {
            const iter = (length: number) => {
                console.log(length, maxLength, imap.state);
                if (length >= maxLength) {
                    resolve(length);
                    console.log(length);
                    return;
                } else {
                    if (imap.state === 'disconnected') {
                        imap.connect();
                    }
                }
                this.fetchBox(boxes[length], since, imap).then((result) => {
                    iter(length + 1);
                }).catch((reason: any) => {
                    reject(reason);
                });
            };
            if (maxLength === 0) {
                resolve(0);
            } else {
                iter(0);
            }
        });



    }

    protected openInbox(imap: Imap, callBack: (inboxError: Error, box: any) => void): void {
        // imap.getBoxes((err, box) => {
        //     console.log(box);
        // });
        // imap.openBox('Sent', true, callBack);
        imap.openBox('INBOX', true, callBack);
    }
}


export default ImapConfiger;
