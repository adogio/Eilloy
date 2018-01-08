import * as React from 'react';
import IEmail from '../interfaces/email';

export interface IProps {
    mails: IEmail[];
}

export default class Component extends React.Component<IProps, {}> {

    public constructor(props: IProps) {
        super(props);
        this.renderSingle = this.renderSingle.bind(this);
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
                {value.from}
                &nbsp;<i className="fas fa-arrow-circle-right fa-fw" />&nbsp;
                {value.to}
            </div>
            <i className="fas fa-circle fa-fw dot" />
            <hr />
        </div>);
    }
}
