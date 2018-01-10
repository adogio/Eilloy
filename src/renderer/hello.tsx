import { ipcRenderer, shell } from 'electron';
import * as React from "react";
import { Route } from 'react-router-dom';
import Email from './email';
import FullCreate from './fullCreate';
import Menu from "./menu";
import Warning from './warning';
import Welcome from './welcome';

import IWarning from '../interfaces/warning';

import './flow.sass';

export interface IProps {
    versionNumber?: any;
}

export interface IState {
    displayWarning: boolean;
    warning: IWarning;
}

const renderMergedProps = (component, ...rest) => {
    const finalProps = Object.assign({}, ...rest);
    return (
        React.createElement(component, finalProps)
    );
};

const PropsRoute = ({ component, ...rest }) => {
    return (
        <Route {...rest} render={(routeProps) => {
            return renderMergedProps(component, routeProps, rest);
        }} />
    );
};

class Component extends React.Component<IProps, IState> {

    public constructor(props: IProps) {
        super(props);
        this.startWarning = this.startWarning.bind(this);
        this.state = {
            displayWarning: false,
            warning: {},
        };
    }

    public componentDidMount() {
        ipcRenderer.send('main-register', 'main');
        ipcRenderer.removeAllListeners('blocked-open');
        ipcRenderer.on('blocked-open', (event: Event, url: string) => {
            this.setState({
                displayWarning: true,
                warning: {
                    info: `您正在尝试打开外部链接。如果您不信任发件人，打开外部链接往往意味着危险！`,
                    button: '继续',
                    onClick: () => {
                        shell.openExternal(url);
                    },
                    more: [{
                        icon: 'info-circle',
                        info: '这个链接指向哪里？',
                        value: url,
                    }],
                },
            });
        });
    }

    public render() {
        return (<div className="entire">
            <Warning
                display={this.state.displayWarning}
                info={this.state.warning.info}
                button={this.state.warning.button}
                more={this.state.warning.more}
                onClick={this.state.warning.onClick}
                onCancel={() => this.setState({
                    displayWarning: false,
                    // display
                })}
            />
            <div className={"entire" + (this.state.displayWarning ? " disable" : " enable")}>
                <PropsRoute
                    path="/"
                    exact={true}
                    warning={this.startWarning}
                    component={Menu} />
                <PropsRoute
                    path="/create"
                    exact={true}
                    warning={this.startWarning}
                    component={FullCreate} />
                <PropsRoute
                    path="/email/:mail"
                    exact={true}
                    warning={this.startWarning}
                    component={Email} />
                <PropsRoute
                    path="/welcome"
                    exact={true}
                    warning={this.startWarning}
                    component={Welcome} />
            </div>
        </div>);
    }

    public startWarning(warning: IWarning) {
        this.setState({
            displayWarning: true,
            warning,
        });
    }
}

export default Component;
