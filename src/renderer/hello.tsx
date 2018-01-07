import * as React from "react";
import { Route } from 'react-router-dom';
import Topper from '../components/topper';
import TTest from "./test";

export interface IProps {
    versionNumber: any;
}

class Component extends React.Component<IProps, {}> {

    public componentDidMount() {
        console.log(this.props);
    }

    public render() {
        return <div>
            <Topper cross={false} />
            <Route path="/" component={TTest} />
        </div>;
    }
}

export default Component;
