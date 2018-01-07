import * as React from 'react';
import './style.sass';

export interface IBtn {
    icon: string;
    onClick: () => void;
    important?: boolean;
    text: string;
}

export interface IProps {
    icon: IBtn[] | IBtn;
    alignRow?: boolean;
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
        return (<div className={this.props.alignRow ? "rows" : "columns"} key={index}>
            <button className="navButton" onClick={value.onClick}>
                <i className={"fas fa-" + value.icon}></i>
                <div className="description">{value.text}</div>
            </button>
        </div>);
    }
}
