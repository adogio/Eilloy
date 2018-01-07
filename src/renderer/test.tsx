import * as React from 'react';
import Topper from '../components/topper';
import imap from '../func/imap';
import imapTest from '../func/imapTest.js';
import mailer from '../func/mailer';

export interface IProps {
    history: any;
    location: any;
    match: any;
}

export default class TEST extends React.Component<IProps, {}> {

    public constructor(props: IProps) {
        super(props);
        this.toWelcome = this.toWelcome.bind(this);
    }

    public componentDidMount() {
        let s = imapTest;
        // let b = new mailer({
        //     host: 'smtp.mail.com',
        //     port: 465,
        //     secure: true,
        //     auth: {
        //         user: 'eilloytest@mail.com',
        //         pass: 'R2pOD2E6sYttC0h',
        //     },
        // });
        // b.send({
        //     from: '"👻" <eilloytest@mail.com>',
        //     to: 'eilloytest@mail.com',
        //     subject: 'sendTest',
        //     html: '<h1>BIG</h1>',
        // }).then((data) => {
        //     console.log(data);
        // });
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
        // b.search('Jan 1, 2018').then((data) => {
        //     // console.log(JSON.stringify(data));
        //     // console.log(data);
        // });
        console.log(s);
        console.log(this.props);
    }

    public render() {
        return (<div className="row entire">
            <div className="col-3 entire navContent">
                <Topper
                    icon={[
                        {
                            icon: "angle-double-left",
                            onClick: () => console.log('test'),
                            text: "返回",
                        },
                        {
                            icon: "angle-double-left",
                            onClick: () => console.log('test'),
                            text: "下一封",
                        },
                    ]}
                    alignRow={true} />
            </div>
            <div className="col-9 entire mainContent">
                <h1>
                    111213
                </h1>
            </div>
        </div>);
    }

    protected toWelcome() {
        console.log(this.props.history);
        this.props.history.replace('/welcome');
    }
}
