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
            <div className={`very-middle ${this.props.display ? "enable" : "disable"}`} >
                <div className="row" >
                    <div className="c1 col-3" >
                        <i className={`fas fa-${this.props.icon} fa-fw`} />
                    </div>
                    <div className="c2 col-9" >
                        {this.props.info}
                    </div>
                </div>
                <div className="c3" >
                    <button onClick={this.props.release} >好的</button>
                </div>
            </div>);
    }
}
