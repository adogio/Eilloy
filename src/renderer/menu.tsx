import * as Storage from 'electron-json-storage';
import * as React from 'react';
import Topper from '../components/topper';
import imap from '../func/imap';
import imapTest from '../func/imapTest.js';
import IBox from '../interfaces/box';
import IUser from '../interfaces/user';
import MailList from './emailList';

export interface IProps {
    history: any;
    location: any;
    match: any;
    user: IUser;
}

export interface IState {
    box: IBox;
}

export default class Menu extends React.Component<IProps, IState> {

    public constructor(props: IProps) {
        super(props);
        this.toWelcome = this.toWelcome.bind(this);
        this.readEmail = this.readEmail.bind(this);
        this.state = {
            box: {
                mails: [],
            },
        };
    }

    public componentDidMount() {
        let s: any = imapTest;
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
        //     console.log(JSON.stringify(data));
        //     // console.log(data);
        // });
        Storage.set('list', s, {}, (err: Error) => {
            if (err) { throw err; }
        });
        console.log(s);
        this.setState({
            box: s,
        });
    }

    public render() {
        return (<div className="row entire">
            <div className="col-2 entire navContent">
                <Topper
                    icon={[
                        {
                            icon: "angle-double-right",
                            onClick: () => console.log('test'),
                            text: "队列",
                            important: 2,
                        },
                        {
                            icon: "plus",
                            onClick: () => {
                                this.props.history.replace('/create');
                            },
                            text: "新建",
                            important: 1,
                        },
                        {
                            icon: "sync",
                            onClick: () => console.log('test'),
                            text: "刷新",
                        },
                        {
                            icon: "cog",
                            onClick: () => console.log('test'),
                            text: "设置",
                        },
                    ]}
                    alignRow={true} />
            </div>
            <div className="col-10 entire mainContent padding-content overflow">
                <MailList
                    mails={this.state.box.mails}
                    user={this.props.user}
                    readEmail={this.readEmail}
                />
                <i className="fas fa-check-square fa-fw" />
            </div>
        </div>);
    }

    protected readEmail(mailId: number): void {
        this.props.history.replace('/email/' + mailId);
    }

    protected toWelcome() {
        console.log(this.props.history);
        this.props.history.replace('/welcome');
    }
}
