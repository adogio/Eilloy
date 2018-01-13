import * as React from 'react';

import './loading.sass';

export interface IProps {
    loading: boolean;
}

export default class Component extends React.Component<IProps, {}> {

    public constructor(props: IProps) {
        super(props);
    }

    public render() {
        return (
            <div className="loading" >
                <div className={`outer ${this.props.loading ? "enable" : "disable"}`} >
                    <div className={`front ${this.props.loading ? "enable" : "disable"}`} />
                    <div className={`back ${this.props.loading ? "enable" : "disable"}`} />
                </div>
            </div>);
    }
}
