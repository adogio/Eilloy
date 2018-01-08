import * as React from 'react';
import Topper from '../components/topper';
import imap from '../func/imap';
import imapTest from '../func/imapTest.js';
import mailer from '../func/mailer';
import IBox from '../interfaces/box';
import MailList from './emailList';


export interface IProps {
    history: any;
    location: any;
    match: any;
}

export interface IState {
    box: IBox;
}

export default class Menu extends React.Component<IProps, IState> {

    public constructor(props: IProps) {
        super(props);
        this.toWelcome = this.toWelcome.bind(this);
        this.state = {
            box: {
                mails: [],
            },
        };
    }

    public componentDidMount() {
        let s: any = imapTest;
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
        this.setState({
            box: s,
        });
        console.log(this.props);
    }

    public render() {
        return (<div className="row entire">
            <div className="col-3 entire navContent">
                <Topper
                    icon={[
                        {
                            icon: "angle-double-right",
                            onClick: () => console.log('test'),
                            text: "队列",
                            important: true,
                        },
                        {
                            icon: "sync",
                            onClick: () => console.log('test'),
                            text: "刷新",
                        },
                    ]}
                    alignRow={true} />
            </div>
            <div className="col-9 entire mainContent">
                <MailList mails={this.state.box.mails} />
            </div>
        </div>);
    }

    protected toWelcome() {
        console.log(this.props.history);
        this.props.history.replace('/welcome');
    }
}