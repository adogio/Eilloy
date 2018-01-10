import * as Storage from 'electron-json-storage';
import * as React from 'react';
import Topper from '../components/topper';
import IBox from '../interfaces/box';
import IEmail from '../interfaces/email';
import Create from './create';

export interface IProps {
    history: any;
    location: any;
    match: any;
}

export interface IState {
    mail: IEmail;
    more: boolean;
    create: boolean;
}

export default class Menu extends React.Component<IProps, IState> {

    public constructor(props: IProps) {
        super(props);
        this.toWelcome = this.toWelcome.bind(this);
        this.renderMail = this.renderMail.bind(this);
        this.state = {
            mail: void 0,
            more: false,
            create: false,
        };
    }

    public componentDidMount() {
        Storage.get('list', {}, (err: Error, data: IBox) => {
            let mails: IEmail[] = data.mails;
            for (let i of mails) {
                if (i.queue === parseInt(this.props.match.params.mail, 10)) {
                    console.log(i);
                    this.setState({
                        mail: i,
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
                    <Create />
                </div>
            </div>
        </div>);
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
                    {mail.date}
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
                        回复给: {mail.returnPath.text}
                    <br />
                    {mail.received.map((value: string, index: number) => {
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
                    })}
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
