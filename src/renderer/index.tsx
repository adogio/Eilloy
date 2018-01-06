import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import { HashRouter } from 'react-router-dom';
import Hello from "./hello";

declare const module: any;

const render = (App: any) => {
    ReactDOM.render(
        <AppContainer>
            <HashRouter>
                <App />
            </HashRouter>
        </AppContainer>,
        document.getElementById("example"));
};

render(Hello);
if (module.hot) {
    module.hot.accept("./hello", () => {
        render(require("./hello").default);
        console.log('test');
    });
}
