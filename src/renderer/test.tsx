import * as React from "react";
import imap from '../func/imap';
import imapTest from '../func/imapTest.js';

export default class TEST extends React.Component {

    public componentDidMount() {
        let s = imapTest;
        // const b = new imap({
        //     user: 'eilloytest@mail.com',
        //     password: 'R2pOD2E6sYttC0h',
        //     host: 'imap.mail.com',
        //     port: 993,
        //     tls: true,
        //     nickName: 'ttt',
        //     tlsOptions: {
        //         rejectUnauthorized: false,
        //     },
        // });
        // b.search('May 20, 2017').then((data) => {
        //     console.log(JSON.stringify(data));
        // });
        console.log(s);
    }

    public render() {
        return <h1>sadasss12</h1>;
    }
}
