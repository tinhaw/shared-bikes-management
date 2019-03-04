import React , { Component } from 'react'
import { Card ,Button,Modal } from 'antd'
import {Editor} from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import draftjs from 'draftjs-to-html'

export default class RichText extends Component {

    state = {
        showRichText:false,
        editorContent: '',
        editorState: '',
    };


    handleClearContent = ()=>{
        // console.log(this.state.editorState);
        this.setState({
            editorState:''
        })
    }

    handleGetText = ()=>{
        this.setState({
            showRichText:true
        })
    }

    onEditorChange = (editorContent) => {
        this.setState({
            editorContent,
        });
    };

    onEditorStateChange = (editorState) => {
        // console.log(this.state.editorState);
        this.setState({
            editorState
        });
    };

    render(){
        return(
            <div>
                <Card
                    className="card-wrap"
                >
                    <Button type="primary" onClick={this.handleClearContent}>清空内容</Button>
                    <Button type="primary" onClick={this.handleGetText}>获取HTML文本</Button>
                </Card>
                <Card
                    className="card-wrap"
                >
                    <Editor
                        editorState={this.state.editorState}
                        onContentStateChange={this.onEditorChange}
                        onEditorStateChange={this.onEditorStateChange}
                    />
                </Card>
                <Modal
                    title="富文本"
                    visible={this.state.showRichText}
                    onCancel={()=>{
                        this.setState({
                            showRichText:false
                        })
                    }}
                    footer={null}
                >
                    {draftjs(this.state.editorContent)}
                </Modal>
            </div>
        )
    }
}