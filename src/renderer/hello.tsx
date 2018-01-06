import * as React from "react";
import { Route } from 'react-router-dom';
import TTest from "./test";

export interface IProps {
    versionNumber: any;
}

class Component extends React.Component<IProps, {}> {

    public componentDidMount() {
        console.log(this.props);
    }

    public render() {
        return <div><h1>
            Hello from !!!! is that magic strinsg! isit??
            </h1>12311afsafsafa
            <Route path="/" component={TTest} />
        </div>;
    }
}

export default Component;
