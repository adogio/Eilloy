import { Editor, EditorState, RichUtils } from 'draft-js';
import * as React from 'react';

export interface IProps {
    full?: boolean;
}

export interface IState {
    editorState: EditorState;
}

export default class Component extends React.Component<IProps, IState> {

    public constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.state = {
            editorState: EditorState.createEmpty(),
        };
    }

    public render() {
        return (<div className="veryBottom padding-content">
            <div className="targets">
                <div>
                    <i className="fas fa-tree fa-fw" />
                </div>
                <input placeholder="标题" />
                <div>
                    <i className="fas fa-share-square fa-fw" />
                </div>
                <input placeholder="收件人" />
                <div>
                    <i className="far fa-share-square fa-fw" />
                </div>
                <input placeholder="抄送" />
            </div>
            <div className="editor">
                <button onClick={() => {
                    this.editorBasic('BOLD');
                }}>
                    <i className="fas fa-bold fa-fw" />
                </button>
                <button onClick={() => {
                    this.editorBasic('ITALIC');
                }}>
                    <i className="fas fa-italic fa-fw" />
                </button>
                <button onClick={() => {
                    this.editorBasic('UNDERLINE');
                }}>
                    <i className="fas fa-underline fa-fw" />
                </button>
                <button onClick={() => {
                    this.editorBasic('CODE');
                }}>
                    <i className="fas fa-code fa-fw" />
                </button>
                {!this.props.full && <button
                    className="bigger"
                    onClick={() => {
                        this.editorBasic('CODE');
                    }}>
                    <i className="fas fa-paper-plane fa-fw" />
                </button>}
                <div className="inner-editor">
                    <Editor
                        editorState={this.state.editorState}
                        onChange={this.onChange}
                    />
                </div>
            </div>
        </div>);
    }

    protected editorBasic(inlineStyle: string) {
        this.onChange(
            RichUtils.toggleInlineStyle(
                this.state.editorState,
                inlineStyle,
            ),
        );
    }

    protected onChange(editorState: EditorState) {
        console.log(this.state.editorState.getCurrentContent());
        this.setState({
            editorState,
        });
    }
}
