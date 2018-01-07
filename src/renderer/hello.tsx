import * as React from "react";
import { Route } from 'react-router-dom';
import TTest from "./test";
import Welcome from './welcome';

export interface IProps {
    versionNumber: any;
}

class Component extends React.Component<IProps, {}> {

    public componentDidMount() {
        console.log(this.props);
    }

    public render() {
        return (<div className="entire">
            <div className="entire">
                <Route path="/" exact={true} component={TTest} />
                <Route path="/welcome" component={Welcome} />
            </div>
        </div>);
    }
}

export default Component;
