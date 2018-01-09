import * as React from 'react';
import IEmail from '../interfaces/email';
import IUser from '../interfaces/user';

export interface IProps {
    mails: IEmail[];
    user: IUser;
    readEmail: (emailId: number) => void;
}

export default class Component extends React.Component<IProps, {}> {

    public constructor(props: IProps) {
        super(props);
        this.renderSingle = this.renderSingle.bind(this);
        this.isMeTo = this.isMeTo.bind(this);
        this.isMeFrom = this.isMeFrom.bind(this);
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
            this.props.readEmail(value.queue);
        };

        return (<div key={index}>
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
                {value.date}
            </div>
            <hr />
        </div>);
    }

    protected isMeFrom(from: string): string {
        const fromArr: string[] = from.split(/<|>/);
        for (let i of fromArr) {
            if (i === this.props.user.user) {
                return 'Me';
            }
        }
        return fromArr[0];
    }

    protected isMeTo(address: string): string {
        if (address === this.props.user.user) {
            return "Me";
        } else {
            return address;
        }
    }
}
