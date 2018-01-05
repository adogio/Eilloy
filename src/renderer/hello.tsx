import * as React from "react";
import TTest from "./test";

export interface IHelloProps { compiler: string; framework: string; }

export class Hello extends React.Component<IHelloProps, {}> {
    public render() {
        return <div><h1>
            Hello from {this.props.compiler} and {this.props.framework}!!!! is that magic strinsg! isit??
            </h1>12311afsafsafa
            <TTest></TTest>
        </div>;
    }
}
