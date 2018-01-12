import * as React from 'react';

export interface IProps {
    icon: string;
    info: string;
    loading: boolean;
    display: boolean;
    release: () => void;
}

export default class Component extends React.Component<IProps, {}> {

    public constructor(props: IProps) {
        super(props);
    }

    public render() {
        return (
            <div className={`very-middle ${this.props.display ? "enable" : "disable"} ${this.props.loading ? "yes" : "no"}`} >
                <div className="inner">
                    <div className={`a1 ${this.props.loading ? "enable" : "disable"}`} >
                        <div className={`a2 ${this.props.loading ? "enable" : "disable"} ${this.props.loading ? "yes" : "no"}`} />
                        <div className={`a3 ${this.props.loading ? "enable" : "disable"} ${this.props.loading ? "yes" : "no"}`} />
                    </div>
                    <div className={`c1 ${this.props.loading ? "disable" : "enable"}`} >
                        <i className={`fas fa-${this.props.icon} fa-fw`} />
                    </div>
                    <div className={`c2 ${this.props.loading ? "disable" : "enable"}`} >
                        {this.props.info}
                    </div>
                    <div className={`c3 ${this.props.loading ? "disable" : "enable"}`} >
                        <button onClick={this.props.release} >好的</button>
                    </div>
                </div>
            </div>);
    }
}
