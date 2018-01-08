import * as React from 'react';
import IEmail from '../interfaces/email';
import IUser from '../interfaces/user';

export interface IProps {
    mails: IEmail[];
    user: IUser;
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
                {this.props.mails.reverse().map(this.renderSingle)}
            </div>
        );
    }

    protected renderSingle(value: IEmail, index: number) {

        let exclaColor: string;

        switch (value.priority) {
            case 'high':
                exclaColor = 'red';
                break;
            case 'normal':
                exclaColor = 'green';
                break;
            case 'low':
                exclaColor = 'olive';
                break;
            default:
                exclaColor = 'yellow';
        }

        return (<div key={index}>
            <div className="subject">
                <i className={"fas fa-exclamation-circle fa-fw pority-tag " + exclaColor} />
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
