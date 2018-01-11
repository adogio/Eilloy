import * as Imap from 'imap';
import c from 'nodemailer/lib/mail-composer';

// const b = new Imap({
//     user: 'eilloytest@mail.com',
//     password: 'R2pOD2E6sYttC0h',
//     host: 'imap.mail.com',
//     port: 993,
//     tls: true,
//     tlsOptions: {
//         rejectUnauthorized: false,
//     },
// });
// b.on('ready', () => {
//     // b.copy()
//     b.append('test', {
//         mailbox: 'test',
//     }, (err) => {
//         console.log(err, 'test');
//         b.end();
//     });

// });
// b.connect();
declare const require: any;
const MailComposer = require('nodemailer/lib/mail-composer');

let a = new MailComposer({
    from: 't@t.com',
    to: 't',
});

a.compile().build((err: any, message: any) => {
    console.log(message);
    process.stdout.write(message);
});
