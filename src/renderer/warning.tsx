import * as React from 'react';

export interface IProps {
    display: boolean;
    info: string;
    button: string;
    disable?: boolean;
    more: Array<{
        icon: string,
        info: string,
        value: string,
    }>;
    onClick: () => void;
    onCancel: () => void;
}

export default class Component extends React.Component<IProps, {}> {

    public constructor(props: IProps) {
        super(props);
        this.mapMore = this.mapMore.bind(this);
    }

    public render() {
        return (
            <div className={"veryFront row" + (this.props.display ? " enabled" : " disabled")}>
                <div className="col-8 description">
                    {this.props.info}
                    {this.props.more ? this.props.more.map(this.mapMore) : void 0}
                </div>
                <div className="col-2">
                    <button
                        disabled={this.props.disable}
                        className={'btn'}
                        onClick={this.props.onClick}>
                        {this.props.button}
                    </button>
                </div>
                <div className="col-2">
                    <button
                        className="btn"
                        onClick={this.props.onCancel}>
                        取消
                    </button>
                </div>
            </div>);
    }

    public mapMore(value: { icon: string, info: string, value: string }, index: number) {
        return (<a title={value.value} key={index}>
            <span className="warning-moreinfo">
                <i className={`fas fa-${value.icon} fa-fw`} />
                {value.info}
            </span>
        </a>);
    }
}
