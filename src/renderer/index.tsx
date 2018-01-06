import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { AnyAction, createStore } from 'redux';

import Hello from "./hello";

declare const module: any;

const store = createStore((state: {}, action: AnyAction) => {
    if (action.type === 'loading') {
        return { ...state, ... { loading: true } };
    } else {
        return { ...state, ... { loading: false } };
    }
});

const render = (App?: any) => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <HashRouter>
                    {App ? <App /> : <Hello />}
                </HashRouter>
            </Provider>
        </AppContainer>,
        document.getElementById("example"));
};

render(Hello);
store.subscribe(render);
if (module.hot) {
    module.hot.accept("./hello", () => {
        render(require('./hello'));
    });
}
