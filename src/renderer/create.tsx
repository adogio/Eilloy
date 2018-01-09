import { Editor, EditorState } from 'draft-js';
import * as React from 'react';

export interface IState {
    editorState: EditorState;
}

export default class Component extends React.Component<{}, IState> {

    public constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
        };
    }

    public render() {
        return (<div className="veryBottom padding-content">
            <input />
            <input />
        </div>);
    }

    protected onChange(editorState: EditorState) {
        this.setState({
            editorState,
        });
    }
}
