import React, { Component } from 'react';
import { EditorState, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import htmlToDraft from 'html-to-draftjs';

class RichTextEditor extends Component {
  constructor(props) {
    super(props);
    const contentBlock = htmlToDraft(props.detail);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      this.state = {
        editorState,
      };
    }
  }

  onEditorStateChange = (editorState) => {
    this.setState({ editorState });
  };

  render() {
    const { editorState } = this.state;
    const { detail } = this.props;

    return (
      <Editor
        editorState={editorState}
        defaultEditorState={detail}
        localization={{ locale: 'zh', }}
        editorStyle={{ border: "2px solid #ccc", rowGap: '5px', height: "200px" }}
        onEditorStateChange={this.onEditorStateChange}
      />
    );
  }
}

export default RichTextEditor;