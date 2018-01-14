import * as React from 'react';
import './style.sass';

export interface IBtn {
    icon?: string;
    onClick?: () => void;
    important?: number;
    text: string;
    description?: string;
}

export interface IProps {
    icon: IBtn[] | IBtn;
    alignRow?: boolean;
}

export default class Component extends React.Component<IProps, {}> {

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

        if (value.text === 'hr') {
            return (<div key={index} className={this.props.alignRow ? "rows" : "columns"}>
                <hr />
            </div>);
        }

        if (value.text === 'description') {
            return (<div key={index} className={this.props.alignRow ? "rows" : "columns"} style={{ paddingLeft: '10px', cursor: 'help' }}>
                <a title={value.description}>
                    (MORE)<i className="fas fa-question-circle fa-fw" />
                </a>
            </div>);
        }

        let important: string;
        if (value.important !== void 0) {
            switch (value.important) {
                case 0:
                    return;
                case 1:
                    important = 'important1';
                    break;
                case 2:
                    important = 'important2';
                    break;
                default:
            }
        } else {
            important = '';
        }

        return (<div className={this.props.alignRow ? "rows" : "columns"} key={index}>
            <button className={`navButton ${important}`} onClick={value.onClick}>
                <i className={`fas fa-${value.icon} fa-fw`}></i>
                <div className="description">{value.text}</div>
            </button>
        </div>);
    }
}
