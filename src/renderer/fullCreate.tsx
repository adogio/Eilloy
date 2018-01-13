import * as React from 'react';
import Topper from '../components/topper';
import Create from './create';

import mailer from '../func/mailer';

import IRelease from '../interfaces/release';
import IUser from '../interfaces/user';
import IWarning from '../interfaces/warning';

import logger from '../func/logger';

export interface IProps {
    history: any;
    location: any;
    match: any;
    user: IUser;
    release: (release: IRelease) => void;
    warning: (warning: IWarning) => void;
    load: () => void;
}

export interface IState {
    to: string;
    cc?: string;
    subject: string;
    content: string;
}

export default class Component extends React.Component<IProps, IState> {

    public constructor(props: IProps) {
        super(props);
        this.onEditorChange = this.onEditorChange.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.send = this.send.bind(this);
        this.state = {
            to: '',
            cc: '',
            subject: '',
            content: '',
        };
    }

    public render() {
        return (<div className="row entire">
            <div className="col-2 entire navContent">
                <Topper
                    icon={[
                        {
                            icon: "paper-plane",
                            onClick: this.send,
                            text: "发送",
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
                            icon: "paperclip",
                            onClick: () => logger('temp', 'test'),
                            text: "附件",
                            important: 1,
                        },

                    ]}
                    alignRow={true}
                />
            </div>
            <div className="col-10 entire mainContent overflow">
                <Create
                    full={true}
                    onChange={this.onEditorChange}
                    onInputChange={this.onInputChange}
                />
            </div>
        </div>);
    }

    protected send() {
        this.props.warning({
            info: '确认发送邮件? 您可以确认: ',
            disable: (this.state.to.length === 0),
            button: '发送',
            onClick: () => {
                let b = new mailer(this.props.user);
                b.send({
                    from: `"${this.props.user.nickName}" <${this.props.user.user}>`,
                    to: this.state.to,
                    subject: this.state.subject,
                    html: this.state.content,
                    priority: 'normal',
                }).then((data) => {
                    logger('full create send', data);
                    setTimeout(() => {
                        this.props.release({
                            info: `发送 "${this.state.subject}" 到 "${this.state.to}" 成功`,
                            icon: 'paper-plane',
                        });
                    }, 1500);
                });
            },
            process: true,
            more: [{
                icon: 'paper-plane',
                info: '我发送给谁?',
                value: (this.state.to.length > 0) ? this.state.to : '没有收件人',
            }],
        });
    }

    protected onEditorChange(html: string) {
        this.setState({
            content: html,
        });
    }

    protected onInputChange(where: string, what: string) {
        switch (where) {
            case 'subject':
                this.setState({
                    subject: what,
                });
                break;
            case 'cc':
                this.setState({
                    cc: what,
                });
                break;
            case 'to':
                this.setState({
                    to: what,
                });
                break;
            default:
                logger('content default', where, what);
        }
    }
}
