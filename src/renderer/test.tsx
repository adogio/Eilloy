import * as React from 'react';
import imap from '../func/imap';
import imapTest from '../func/imapTest.js';

export interface IProps {
    history: any;
    location: any;
    match: any;
}

export default class TEST extends React.Component<IProps, {}> {

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
        console.log(this.props);
    }

    public render() {
        return <h1>11123</h1>;
    }
}
