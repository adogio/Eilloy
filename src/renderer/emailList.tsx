import * as React from 'react';
import IEmail from '../interfaces/email';
import IUser from '../interfaces/user';

import Flier from '../components/flier';

import { imapStrToDisplay } from '../func/common';

export interface IProps {
    mails: IEmail[];
    user: IUser;
    box: string;
    readEmail: (emailId: number) => void;
}

export default class Component extends React.Component<IProps, {}> {

    public constructor(props: IProps) {
        super(props);
        this.renderSingle = this.renderSingle.bind(this);
        this.isMeTo = this.isMeTo.bind(this);
        this.isMeFrom = this.isMeFrom.bind(this);
        this.trimFrom = this.trimFrom.bind(this);
    }

    public render() {



        return (
            <div className="mailList">
                {this.props.mails.slice(0).reverse().map(this.renderSingle)}
            </div>
        );
    }

    protected renderSingle(value: IEmail, index: number) {

        let exclaColor: any;

        switch (value.priority) {
            case 'high':
                exclaColor = (<a title="非常重要">
                    <i className={"fas fa-exclamation-circle fa-fw pority-tag red"} />
                </a>);
                break;
            case 'normal':
                exclaColor = (<a title="一般">
                    <i className={"fas fa-exclamation-circle fa-fw pority-tag green"} />
                </a>);
                break;
            case 'low':
                exclaColor = (<a title="不重要">
                    <i className={"fas fa-exclamation-circle fa-fw pority-tag olive"} />
                </a>);
                break;
            default:
                exclaColor = (<a title="没有优先级标注">
                    <i className={"fas fa-exclamation-circle fa-fw pority-tag yellow"} />
                </a>);
        }

        let flags: string = '';

        for (let i of value.flags) {
            if (i === '\\Seen') {
                flags += ' seen';
            }
        }

        const read: () => void = () => {
            this.props.readEmail(value.uid);
        };

        return (<div key={index + value.from}>
            <div className="email-list-outer" >
                <div className="email-list-left" >
                    <div className="email-icon" >
                        <Flier text={this.trimFrom(value.from)} />
                    </div>
                </div>
                <div className="email-list-right" >
                    <div
                        className={"subject" + flags}
                        onClick={read}>
                        {exclaColor}
                        &nbsp;
                {value.subject}
                    </div>
                    <div className="fromOrTo">
                        {this.isMeFrom(value.from)}
                        &nbsp;
                <a title={value.from}>
                            <span className="smaller">(INFO)</span>
                        </a>
                        &nbsp;
                <i className="fas fa-arrow-circle-right fa-fw" />
                        &nbsp;
                {this.isMeTo(value.to)}
                    </div>
                    <div className="date">
                        {imapStrToDisplay(value.date)}
                    </div>
                </div>
            </div>
            <hr />
        </div>);
    }

    protected trimFrom(from: string): string {
        if (!Boolean(from)) {
            return '未知';
        }
        const fromArr: string[] = from.split(/<|>/);
        return fromArr[0].trim();
    }

    protected isMeFrom(from: string): string {
        if (!Boolean(from)) {
            return '没有发件人';
        }
        const fromArr: string[] = from.split(/<|>/);
        for (let i of fromArr) {
            if (i === this.props.user.user) {
                return 'Me';
            }
        }
        return fromArr[0];
    }

    protected isMeTo(address: string): string {
        if (!Boolean(address)) {
            return '没有收件人';
        }
        if (address === this.props.user.user) {
            return "Me";
        } else {
            return address;
        }
    }
}
