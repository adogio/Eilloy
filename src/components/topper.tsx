import * as React from 'react';
import './style.sass';

export interface IBtn {
    icon: string;
    onClick: () => void;
    important?: boolean;
}

export interface IProps {
    icon: IBtn[] | IBtn;
}

export default class TEST extends React.Component<IProps, {}> {

    public constructor(props: IProps) {
        super(props);
        this.renderList = this.renderList.bind(this);
        this.renderSingle = this.renderSingle.bind(this);
    }

    public render() {
        return (
            <div className="wrapper">
                {(this.props.icon instanceof Array) ? this.renderList() : this.renderSingle(this.props.icon, 0)}
            </div>
        );
    }

    protected renderList() {
        let mapper: any = this.props.icon;
        return mapper.map(this.renderSingle);
    }

    protected renderSingle(value: IBtn, index: number) {
        return (<div className="column" key={index}>
            <button className="navButton" onClick={value.onClick}>
                <i className={"fas fa-" + value.icon}></i>
            </button>
        </div>);
    }
}
