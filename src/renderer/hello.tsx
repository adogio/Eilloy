import * as React from "react";
import { connect, DispatchProp } from 'react-redux';
import { Route } from 'react-router-dom';
import TTest from "./test";

export interface IProps { loading: any; dispatch: any; }

class Component extends React.Component<any, any> {

    public componentDidMount() {
        console.log(this);
    }

    public render() {
        return <div><h1>
            Component from !!! is that magic strinsg! isit??
            </h1>12311afsafsafa
            <Route path="/" component={TTest}>
            </Route>
        </div>;
    }
}

function mergeProps(stateProps: {}, dispatchProps: {}, ownProps: {}) {
    return Object.assign({}, ownProps, stateProps, dispatchProps);
}

function mapStateToProps(state) {
    return { loading: state.loading };
}

export default connect(mapStateToProps, mergeProps)(Component);
