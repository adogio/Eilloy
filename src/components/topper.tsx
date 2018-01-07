import * as React from 'react';
import './style.css';

export interface IProps {
    cross: boolean;
}

export default class TEST extends React.Component<IProps, {}> {

    public render() {
        return <div className="topper">111213</div>;
    }
}
