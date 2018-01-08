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
                {this.props.mails.map(this.renderSingle)}
            </div>
        );
    }

    protected renderSingle(value: IEmail, index: number) {
        return (<div key={index}>
            <div className="subject">
                {value.subject}
            </div>
            <div className="fromOrTo">
                {this.isMeFrom(value.from)}
                &nbsp;<i className="fas fa-arrow-circle-right fa-fw" />&nbsp;
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
