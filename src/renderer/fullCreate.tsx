import * as React from 'react';
import Topper from '../components/topper';
import Create from './create';

import IWarning from '../interfaces/warning';

export interface IProps {
    history: any;
    location: any;
    match: any;
    warning: (warning: IWarning) => void;
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
        this.state = {
            to: '',
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
                            onClick: () => {
                                this.props.warning({
                                    info: '确认发送邮件? 您可以确认: ',
                                    disable: true,
                                    button: '发送',
                                    onClick: () => console.log('test'),
                                    more: [{
                                        icon: 'paper-plane',
                                        info: '我发送给谁?',
                                        value: this.state.to || '没有收件人',
                                    }],
                                });
                            },
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
                            onClick: () => console.log('test'),
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
                />
            </div>
        </div>);
    }

    protected onEditorChange(html: string) {
        this.setState({
            content: html,
        });
    }
}
