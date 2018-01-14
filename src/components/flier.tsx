import * as React from 'react';

import sparidae from 'sparidae';

import './flier.sass';

export interface IPoint {
    x: number;
    y: number;
}

export interface IFlierComponent {
    fill: string;
    points: IPoint[];
    type: string;
}

export interface IFlier {
    aspect: boolean;
    border: boolean;
    components: IFlierComponent[];
    display: string;
    fontSize: number;
    height: number;
    heightUnit: string;
    type: string;
    width: number;
    widthUnit: number;
}

export interface IProps {
    text: string;
}

export interface IState {
    flier: IFlier;
}

export default class Component extends React.Component<IProps, IState> {

    public constructor(props: IProps) {
        super(props);
        this.getSparidae = this.getSparidae.bind(this);
        this.renderComponents = this.renderComponents.bind(this);
        this.mapComponent = this.mapComponent.bind(this);
        this.parsePoints = this.parsePoints.bind(this);
        this.renderText = this.renderText.bind(this);
        this.state = {
            flier: this.getSparidae(),
        };
    }

    public render() {
        return (
            <div
                className="flier-outer"
                style={{
                    width: `${this.state.flier.width}${this.state.flier.widthUnit}`,
                    height: `${this.state.flier.height}${this.state.flier.heightUnit}`,
                }} >
                {this.renderSVG()}
                {this.renderText()}
            </div>);
    }

    protected renderSVG() {
        return (<svg
            viewBox="0 0 480 480"
            width={`${this.state.flier.width}${this.state.flier.widthUnit}`}
            height={`${this.state.flier.height}${this.state.flier.heightUnit}`}
        >
            {this.renderComponents(this.state.flier.components)}
        </svg>);
    }

    protected getSparidae(): IFlier {
        let sep: IFlier = JSON.parse(sparidae(this.props.text, {
            popper: 'json',
        }));
        return sep;
    }

    protected renderComponents(componentList: IFlierComponent[]) {
        return componentList.map(this.mapComponent);
    }

    protected renderText() {
        return (<div
            className="flier-inner"
            style={{ fontSize: this.state.flier.fontSize }}
        >
            {this.state.flier.display}
        </div>);
    }

    protected mapComponent(value: IFlierComponent, index: number) {
        switch (value.type) {
            case 'polygon':
            default:
                return (<polygon
                    key={index}
                    points={this.parsePoints(value.points)}
                    fill={value.fill}
                />);
        }
    }

    protected parsePoints(points: IPoint[]) {
        let re: string = '';
        for (let i of points) {
            re += `${i.x},${i.y} `;
        }
        return re;
    }
}
