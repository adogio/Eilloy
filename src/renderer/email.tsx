import * as Storage from 'electron-json-storage';
import * as React from 'react';
import Topper from '../components/topper';
import IBox from '../interfaces/box';
import IEmail from '../interfaces/email';

export interface IProps {
    history: any;
    location: any;
    match: any;
}

export interface IState {
    mail: IEmail;
    more: boolean;
}

export default class Menu extends React.Component<IProps, IState> {

    public constructor(props: IProps) {
        super(props);
        this.toWelcome = this.toWelcome.bind(this);
        this.renderMail = this.renderMail.bind(this);
        this.state = {
            mail: void 0,
            more: false,
        };
    }

    public componentDidMount() {
        Storage.get('list', (err: Error, data: IBox) => {
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
                            icon: "list",
                            onClick: () => {
                                this.props.history.replace('/');
                            },
                            text: "总览",
                            important: 2,
                        },
                        {
                            icon: "angle-double-left",
                            onClick: () => console.log('test'),
                            text: "下一封",
                            important: 1,
                        },
                    ]}
                    alignRow={true} />
            </div>
            <div className="col-10 entire mainContent">
                {this.renderMail()}
                <i className="fas fa-check-square fa-fw" />
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
                    重要性: {mail.priority}<br />
                    <i className="fa fa-bolt fa-fw" />&nbsp;
                    敏感度: {mail.sensitivity}<br />
                    <i className="fa fa-reply fa-fw" />&nbsp;
                    回复给: {mail.returnPath.text}<br />
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
                <hr />
                <div
                    dangerouslySetInnerHTML={
                        { __html: mail.content }
                    }>
                </div>
            </div>);
        } else {
            return <div>Loading</div>;
        }
    }

    protected toWelcome() {
        console.log(this.props.history);
        this.props.history.replace('/welcome');
    }
}
