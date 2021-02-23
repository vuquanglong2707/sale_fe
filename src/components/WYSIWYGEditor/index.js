import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Input } from 'antd';

import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import './styles.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const { TextArea } = Input;

class WYSIWYGEditor extends Component {
  constructor(props) {
    super(props);

    const htmlContent = props.value || '';
    const contentBlock = htmlToDraft(htmlContent);

    let editorState;
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      editorState = EditorState.createWithContent(contentState);
    } else {
      editorState = EditorState.createEmpty();
    }

    this.state = {
      previousValue: props.value,
      editorState,
    };

    this.onEditorStateChange = this.onEditorStateChange.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { previousValue } = prevState;
    if (nextProps.value !== previousValue) {
      const contentBlock = htmlToDraft(nextProps.value);
      let editorState;
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        editorState = EditorState.createWithContent(contentState);

        return {
          previousValue: nextProps.value,
          editorState,
        };
      }
    }

    return null;
  }

  onEditorStateChange(editorState) {
    this.setState({
      editorState,
    });
    const { onChange } = this.props;
    const html = draftToHtml(convertToRaw(editorState.getCurrentContent()));

    onChange(html);
  }

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <TextArea hidden />
        <Editor
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName" 
          onEditorStateChange={this.onEditorStateChange}
          stripPastedStyles
          toolbar={{
            options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'image', 'remove', 'history'],
          }}
        />
      </div>
    );
  }
}

WYSIWYGEditor.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

WYSIWYGEditor.defaultProps = {
  value: '',
  onChange: () => {},
};

export default WYSIWYGEditor;
