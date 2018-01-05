import * as React from "react";
import TTest from "./test";

export interface IHelloProps { compiler: string; framework: string; }

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class Hello extends React.Component<IHelloProps, {}> {
    public render() {
        return <div><h1>
            Hello from {this.props.compiler} and {this.props.framework}!!!! is that magic strinsg! isit??
            </h1>12311
            <TTest></TTest>
        </div>;
    }
}
