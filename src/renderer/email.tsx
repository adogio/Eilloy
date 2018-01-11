import * as Storage from 'electron-json-storage';
import * as React from 'react';
import Topper from '../components/topper';
import IBox from '../interfaces/box';
import IEmail from '../interfaces/email';
import Create from './create';

import { imapStrToDisplay } from '../func/common';
import mailer from '../func/mailer';

import IUser from '../interfaces/user';
import IWarning from '../interfaces/warning';

export interface IProps {
    history: any;
    location: any;
    user: IUser;
    warning: (warning: IWarning) => void;
    match: {
        params: {
            box: string;
            mail: string;
        };
    };
}

export interface IState {
    mail: IEmail;
    more: boolean;
    create: boolean;
    content: string;
}

export default class Menu extends React.Component<IProps, IState> {

    public constructor(props: IProps) {
        super(props);
        this.toWelcome = this.toWelcome.bind(this);
        this.renderMail = this.renderMail.bind(this);
        this.sendEmail = this.sendEmail.bind(this);
        this.onEditorChange = this.onEditorChange.bind(this);
        this.state = {
            mail: void 0,
            more: false,
            create: false,
            content: '',
        };
    }

    public componentDidMount() {
        Storage.get('list', {}, (err: Error, data: IBox[]) => {
            let mails: IEmail[] = data[parseInt(this.props.match.params.box, 10)].mails;
            for (let j of mails) {
                if (j.uid === parseInt(this.props.match.params.mail, 10)) {
                    console.log(j);
                    this.setState({
                        mail: j,
                    });
                    break;
                }
            }
        });
    }

    public render() {
        return (<div className="row entire">
            <div className="col-2 entire navContent">
                <Topper
                    icon={[
                        {
                            icon: "arrow-circle-right",
                            onClick: () => console.log('test'),
                            text: "继续",
                            important: 2,
                        },
                        {
                            icon: "list",
                            onClick: () => {
                                this.props.history.replace('/');
                            },
                            text: "总览",
                            important: 1,
                        },
                        {
                            icon: this.state.create ? "ban" : "reply",
                            onClick: () => {
                                this.setState({
                                    create: this.state.create ? false : true,
                                });
                            },
                            text: this.state.create ? "取消" : "回复",
                            important: 1,
                        },
                        {
                            icon: "flag",
                            onClick: () => {
                                this.props.history.replace('/');
                            },
                            text: "标记为",
                        },
                    ]}
                    alignRow={true} />
            </div>
            <div className="col-10 entire mainContent">
                <div className={`above-create padding-content ${this.state.create ? "create" : "uncreate"}`}>
                    {this.renderMail()}
                    <i className="fas fa-check-square fa-fw" />
                </div>
                <div className={`under-create ${this.state.create ? "create" : "uncreate"}`}>
                    <Create
                        onChange={this.onEditorChange}
                        more={[{
                            icon: 'paper-plane',
                            onClick: this.sendEmail,
                            size: 1,
                        }]}
                    />
                </div>
            </div>
        </div>);
    }

    protected sendEmail() {
        this.props.warning({
            info: '确认回复邮件? 您可以确认: ',
            button: '发送',
            onClick: () => {
                let b = new mailer({
                    host: this.props.user.host,
                    port: 465,
                    secure: true,
                    auth: {
                        user: this.props.user.user,
                        pass: this.props.user.password,
                    },
                });
                b.send({
                    from: `"👻" <${this.props.user.user}>`,
                    to: this.state.mail.from,
                    subject: `RE: ${this.state.mail.subject}`,
                    html: this.state.content,
                    priority: this.state.mail.priority,
                }).then((data) => {
                    console.log(data);
                });
            },
            more: [{
                icon: 'paper-plane',
                info: '我发送给谁?',
                value: this.state.mail.from,
            }],
        });
    }

    protected onEditorChange(html: string) {
        this.setState({
            content: html,
        });
    }

    protected renderMail() {
        let mail: IEmail = this.state.mail;

        if (Boolean(mail)) {
            return (<div className="mailCon">
                <h1>{mail.subject}</h1>
                <div className="fromOrTo">
                    {mail.from}
                    &nbsp;
                <i className="fas fa-arrow-circle-right fa-fw" />
                    &nbsp;
                {mail.to}
                </div>
                <div>
                    {imapStrToDisplay(mail.date)}
                </div>
                <button
                    className="moreinfo-button"
                    onClick={() => this.setState({ more: this.state.more ? false : true })}
                >
                    {this.state.more ? "隐藏" : "更多信息"}
                </button>
                <div className={"info " + (this.state.more ? "more" : "less")}>
                    <i className="fa fa-info-circle fa-fw" />&nbsp;
                        重要性: {mail.priority}
                    <br />
                    <i className="fa fa-bolt fa-fw" />&nbsp;
                        敏感度: {mail.sensitivity}
                    <br />
                    <i className="fa fa-reply fa-fw" />&nbsp;
                        回复给: {mail.returnPath ? mail.returnPath.text : '没有这项信息'}
                    <br />
                    {mail.received ? mail.received.map((value: string, index: number) => {
                        return <span key={index}>
                            <i className="fa fa-server fa-fw" />&nbsp;
                            来源&nbsp;
                        {index + 1}
                            :&nbsp;
                        <a
                                className="received"
                                title={value}
                            >
                                {value.substring(0, 40) +
                                    (value.length > 40 ? "..." : "")}
                                <br />
                            </a></span>;
                    }) : void 0}
                </div>
                <div className="info">
                    <i className="fa fa-flag fa-fw" />&nbsp;
                        邮件旗帜: {mail.flags.map(this.mapFlags)}
                    <br />
                    {this.displayAttachment()}
                </div>
                <hr />
                <div
                    className="auto-margin"
                    dangerouslySetInnerHTML={
                        { __html: mail.content }
                    }>
                </div>
            </div>);
        } else {
            return <div>Loading</div>;
        }
    }

    protected displayAttachment() {
        if (this.state.mail.attachment && this.state.mail.attachment.length > 0) {
            return (<span><i className="fa fa-paperclip fa-fw" />&nbsp;
            附件: {this.state.mail.attachment.map(this.mapAttachment)}
                <br /></span>);
        }
    }

    protected mapAttachment(value: any, index: number) {

        let icon: string;

        switch (value.contentType) {
            case 'image/jpeg':
                icon = "image";
                break;
            default:
                icon = "file";
        }

        return (<a title={value.contentType} key={index}>&nbsp;<span className="flag-element"><i className={`fas fa-${icon} fa-fw`} />{value.fileName}</span>&nbsp;</a>);
    }

    protected mapFlags(value: string, index: number) {
        switch (value) {
            case '\\Seen':
                return (<a title="这封邮件已经被阅读过了" key={index}>&nbsp;<span className="flag-element"><i className="fas fa-eye fa-fw" />已读</span>&nbsp;</a>);
            case '\\Recent':
                return (<a title="这封邮件是最近收到的" key={index}>&nbsp;<span className="flag-element"><i className="fas fa-clock fa-fw" />近期</span>&nbsp;</a>);
            default:
                return void 0;
        }
    }

    protected toWelcome() {
        console.log(this.props.history);
        this.props.history.replace('/welcome');
    }
}
