import * as React from 'react';

import IRelease from '../interfaces/release';
import IUser from '../interfaces/user';
import IWarning from '../interfaces/warning';

export interface IProps {
    warning: (warning: IWarning) => void;
    release: (release: IRelease) => void;
    load: () => void;
}

export default class Component extends React.Component<{}, {}> {
    public render() {
        return <h1>Welcome</h1>;
    }
}
