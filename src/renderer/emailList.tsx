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
            <div>
                {this.props.mails.map(this.renderSingle)}
            </div>
        );
    }

    protected renderSingle(value: IEmail, index: number) {
        return (<div key={index}>
            <h1>{value.subject}</h1>
            {value.from}
        </div>);
    }
}
