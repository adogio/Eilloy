import * as Storage from 'electron-json-storage';
import * as React from 'react';

import Topper from '../components/topper';

import MailList from './emailList';

import imap from '../func/imap';

import IBox from '../interfaces/box';
import IRelease from '../interfaces/release';
import IUser from '../interfaces/user';
import IWarning from '../interfaces/warning';

import logger from '../func/logger';

export interface IProps {
    history: any;
    location: any;
    match: any;
    user: IUser;
    warning: (warning: IWarning) => void;
    release: (release: IRelease) => void;
    load: (fade?: boolean) => void;
}

export interface IState {
    box: IBox[];
    currentBox: number;
}

export default class Menu extends React.Component<IProps, IState> {

    public constructor(props: IProps) {
        super(props);
        this.toWelcome = this.toWelcome.bind(this);
        this.readEmail = this.readEmail.bind(this);
        this.mappingBox = this.mappingBox.bind(this);
        this.concatBox = this.concatBox.bind(this);
        this.loadMailFromImap = this.loadMailFromImap.bind(this);
        this.loadMailFromStorage = this.loadMailFromStorage.bind(this);
        this.saveMailToStorage = this.saveMailToStorage.bind(this);
        this.state = {
            box: [],
            currentBox: 1,
        };
    }

    public componentWillMount() {
        this.loadMailFromStorage();
    }

    public render() {
        return (<div className="row entire">
            <div className="col-2 entire navContent">
                <Topper
                    icon={[
                        {
                            icon: "angle-double-right",
                            onClick: () => logger('temp', 'test'),
                            text: "队列",
                            important: 2,
                        },
                        {
                            icon: "plus",
                            onClick: () => {
                                this.props.history.replace('/create');
                            },
                            text: "新建",
                            important: 1,
                        },
                        {
                            icon: "sync",
                            onClick: this.loadMailFromImap,
                            text: "刷新",
                        },
                        {
                            icon: "cog",
                            onClick: () => logger('temp', 'test'),
                            text: "设置",
                        },
                        {
                            text: "hr",
                        },
                    ].concat(this.concatBox())}
                    alignRow={true} />
            </div>
            <div className="col-10 entire mainContent overflow">
                <div className="menu-topper padding-content" >
                    {this.state.box[0] ?
                        <span>文件夹:
                            &nbsp;
                            <i className={`fa fa-${this.getIcon(this.state.box[this.state.currentBox].name)} fa-fw`} />
                            &nbsp;
                            {this.state.box[this.state.currentBox].name}
                        </span> :
                        '读取中'}
                </div>
                <div className="padding-content" >
                    <MailList
                        mails={this.state.box[0] ? this.state.box[this.state.currentBox].mails : []}
                        user={this.props.user}
                        readEmail={this.readEmail}
                    />
                    <i className="fas fa-check-square fa-fw" />
                </div>
            </div>
        </div>);
    }

    protected loadMailFromImap() {
        this.props.load(true);
        const b = new imap(this.props.user);
        b.searchAll('Dec 1, 2017').then((data: IBox[]) => {
            this.saveMailToStorage(data);
            logger('loadMailFromImap', data);
            this.setState({
                box: data,
            });
            this.props.load();
        });
    }

    protected saveMailToStorage(data: IBox[]) {
        Storage.set('list', data, {}, (err: Error) => {
            logger('saveMailToStorage');
            if (err) { throw err; }
        });
    }

    protected loadMailFromStorage() {
        this.props.load();
        Storage.get('list', {}, (err, data: IBox[]) => {
            logger('loadMailFromStorage', data);
            this.props.load();
            this.setState({
                box: data,
            });
        });
    }

    protected concatBox(): Array<{
        icon: string;
        onClick: () => void;
        text: string;
        important?: number;
    }> {
        if (this.state.box.length >= 0) {
            return this.state.box.map(this.mappingBox);
        } else {
            return [];
        }
    }

    protected readEmail(mailId: number): void {
        this.props.history.replace(`/email/${this.state.box[this.state.currentBox].name}/${mailId}`);
    }

    protected mappingBox(value: IBox, index: number): {
        icon: string;
        onClick: () => void;
        text: string;
        important?: number;
    } {
        return {
            icon: this.getIcon(value.name),
            onClick: () => {
                this.setState({
                    currentBox: index,
                });
            },
            text: value.name,
        };
    }

    protected getIcon(content: string): string {
        let icon: string;
        switch (content) {
            case 'inbox':
            case 'Inbox':
            case 'INBOX':
                icon = 'inbox';
                break;
            case 'Drafts':
            case 'drafts':
            case 'DRAFTS':
                icon = 'edit';
                break;
            case 'Trash':
            case 'trash':
            case 'SPAM':
            case 'Spam':
                icon = 'trash-alt';
                break;
            case 'Sent':
            case 'SENT':
            case 'sent':
                icon = 'indent';
                break;
            default:
                icon = 'archive';
        }
        return icon;
    }

    protected toWelcome(): void {
        logger('menu to welcome', this.props.history);
        this.props.history.replace('/welcome');
    }
}
