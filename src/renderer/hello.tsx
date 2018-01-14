import { ipcRenderer, shell } from 'electron';
import * as React from "react";
import { Redirect, Route } from 'react-router-dom';

import Loading from '../components/loading';
import Email from './email';
import FullCreate from './fullCreate';
import Menu from "./menu";
import Relase from './release';
import Warning from './warning';
import Welcome from './welcome';

import IRelease from '../interfaces/release';
import IUser from '../interfaces/user';
import IWarning from '../interfaces/warning';

import './flow.sass';

export interface IProps {
    versionNumber?: any;
}

export interface IState {
    displayWarning: boolean;
    displayRelease: boolean;
    loadRelease: boolean;
    loading: boolean;
    fade: boolean;
    warning: IWarning;
    release: IRelease;
}

const renderMergedProps: any = (component, ...rest) => {
    const finalProps = Object.assign({}, ...rest);
    return (
        React.createElement(component, finalProps)
    );
};

const PropsRoute: any = ({ component, ...rest }) => {
    return (
        <Route {...rest} render={(routeProps) => {
            return renderMergedProps(component, routeProps, rest);
        }} />
    );
};

class Component extends React.Component<IProps, IState> {

    private user: IUser;

    public constructor(props: IProps) {
        super(props);
        this.startWarning = this.startWarning.bind(this);
        this.relaseWarning = this.relaseWarning.bind(this);
        this.load = this.load.bind(this);
        this.user = {
            smtp: 'smtp.mail.com',
            portSmtp: 465,
            imap: 'imap.mail.com',
            portImap: 993,
            user: 'eilloytest@mail.com',
            password: 'R2pOD2E6sYttC0h',
            nickName: '😺😸😹',
            sign: '<p>😺😸😹</p><p>eilloytest@mail.com</p>',
            tls: true,
            tlsOptions: {
                rejectUnauthorized: false,
            },
        };
        this.state = {
            displayWarning: false,
            displayRelease: false,
            loadRelease: false,
            loading: false,
            fade: false,
            warning: {},
            release: {
                info: '123',
                icon: 'clock',
            },
        };
    }

    public componentDidMount() {
        ipcRenderer.send('main-register', 'main');
        ipcRenderer.removeAllListeners('blocked-open');
        ipcRenderer.on('blocked-open', (event: Event, url: string) => {
            this.startWarning({
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
                onClick={() => {
                    if (this.state.warning.process) {
                        this.setState({
                            displayRelease: true,
                            displayWarning: false,
                            loadRelease: true,
                        });
                    } else {
                        this.setState({
                            displayWarning: false,
                            fade: false,
                        });
                    }
                    this.state.warning.onClick();
                }}
                disable={this.state.warning.disable}
                onCancel={() => this.setState({
                    displayWarning: false,
                    fade: false,
                    // display
                })}
            />
            <Relase
                icon={this.state.release.icon}
                info={this.state.release.info}
                display={this.state.displayRelease}
                loading={this.state.loadRelease}
                release={() => {
                    this.setState({
                        displayRelease: false,
                        fade: false,
                    });
                }}
            />
            <Loading
                loading={this.state.loading}
            />
            <div className={"entire" + (this.state.fade ? " disable" : " enable")}>
                <Route>
                    <Redirect to="/list/1" />
                </Route>
                <PropsRoute
                    path="/list/:box"
                    exact={true}
                    warning={this.startWarning}
                    release={this.relaseWarning}
                    load={this.load}
                    user={this.user}
                    component={Menu} />
                <PropsRoute
                    path="/create"
                    exact={true}
                    warning={this.startWarning}
                    release={this.relaseWarning}
                    load={this.load}
                    user={this.user}
                    component={FullCreate} />
                <PropsRoute
                    path="/email/:box/:mail"
                    exact={true}
                    warning={this.startWarning}
                    release={this.relaseWarning}
                    load={this.load}
                    user={this.user}
                    component={Email} />
                <PropsRoute
                    path="/welcome"
                    exact={true}
                    warning={this.startWarning}
                    release={this.relaseWarning}
                    load={this.load}
                    user={this.user}
                    component={Welcome} />
            </div>
        </div>);
    }

    public startWarning(warning: IWarning) {
        this.setState({
            displayWarning: true,
            fade: true,
            warning,
        });
    }

    public relaseWarning(release: IRelease) {
        this.setState({
            loadRelease: false,
            fade: false,
            release,
        });
    }

    public load(fade?: boolean) {
        if (this.state.loading) {
            this.setState({
                fade: false,
                loading: false,
            });
            return;
        }
        if (fade) {
            this.setState({
                fade: true,
                loading: !this.state.loading,
            });
        } else {
            this.setState({
                loading: !this.state.loading,
            });
        }
    }
}

export default Component;
