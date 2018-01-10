import { Editor, EditorState, RichUtils } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import * as React from 'react';

export interface IProps {
    full?: boolean;
    onChange: (html: string) => void;
    onInputChange: (where: string, what: string) => void;
}

export interface IState {
    editorState: EditorState;
}

export default class Component extends React.Component<IProps, IState> {

    public constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.handleCc = this.handleCc.bind(this);
        this.handleSubject = this.handleSubject.bind(this);
        this.handleTo = this.handleTo.bind(this);
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
                <input
                    placeholder="标题"
                    onChange={this.handleSubject}
                />
                <div>
                    <i className="fas fa-share-square fa-fw" />
                </div>
                <input
                    placeholder="收件人"
                    onChange={this.handleTo}
                />
                <div>
                    <i className="far fa-share-square fa-fw" />
                </div>
                <input
                    placeholder="抄送"
                    onChange={this.handleCc}
                />
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
        this.props.onChange(stateToHTML(editorState.getCurrentContent()));
        this.setState({
            editorState,
        });
    }

    protected handleTo(event: React.ChangeEvent<HTMLInputElement>) {
        this.props.onInputChange('to', event.target.value);
    }

    protected handleCc(event: React.ChangeEvent<HTMLInputElement>) {
        this.props.onInputChange('cc', event.target.value);
    }

    protected handleSubject(event: React.ChangeEvent<HTMLInputElement>) {
        this.props.onInputChange('subject', event.target.value);
    }
}
