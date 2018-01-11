import * as Imap from 'imap';
const b = new Imap({
    user: 'eilloytest@mail.com',
    password: 'R2pOD2E6sYttC0h',
    host: 'imap.mail.com',
    port: 993,
    tls: true,
    tlsOptions: {
        rejectUnauthorized: false,
    },
});
b.on('ready', () => {
    // b.copy()
    b.append('test', {
        mailbox: 'test',
    }, (err) => {
        console.log(err, 'test');
        b.end();
    });

});
b.connect();

