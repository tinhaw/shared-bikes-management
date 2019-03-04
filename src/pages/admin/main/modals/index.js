import React,{ Component } from 'react'
import { Card,Button,Modal } from 'antd'

export default class Modals extends Component {
    constructor(){
        super();
        this.state={
            showModal1:false,
            showModal2:false,
            showModal3:false
        }
    }

    handleModalOK(type){
        console.log("modal1 ok");
        this.setState({
            [type]:false 
         });
    }

    handleModalCancel=(type)=>{
        this.setState({
           [type]:false 
        })
    }

    handleModalOpen=(type)=>{
        this.setState({
            [type]:true
         })
    }

    handleConfirm(){
        Modal.confirm({
            title:"信息确认框",
            content:"你是否已经明白周知本弹框的内容？"

        })
    }

    handleInfo(){
        Modal.info({
            title:"信息提示标题",
            content:"这里是信息提示内容",
            okText:"知道了"
        })
    }

    handleSuccess(){
        Modal.success({
            title:"成功信息",
            content:"业务操作成功",
            okText:"知道了"
        })
    }

    handleError(){
        Modal.error({
            title:"错误信息",
            content:"业务操作失败",
            okText:"知道了"
        })
    }

    handleWarning(){
        Modal.warning({
            title:"警示信息",
            content:"警示信息内容",
            okText:"知道了"
        })
    }

    render(){
        return (
                <div>
                    <Card
                        className="card-wrap"
                        title="基础模态框"
                    >
                        <p>
                            <Button type="primary" onClick={ ()=>{ this.handleModalOpen("showModal1") } }>标准模态框</Button>
                            <Button type="primary" onClick={ ()=>{ this.handleModalOpen("showModal2") } }>自定义页脚</Button>
                            <Button type="primary" onClick={ ()=>{ this.handleModalOpen("showModal3") } }>自定义位置</Button>
                        </p>
                    </Card>
                    <Card
                        className="card-wrap"
                        title="信息确认框"
                    >
                        <p>
                            <Button type="primary" onClick={ this.handleConfirm } >confirm</Button>
                        </p>
                    </Card>
                    <Card
                        className="card-wrap"
                        title="信息提示框"
                    >
                        <p>
                            <Button type="primary" onClick={ this.handleInfo }  >信息</Button>
                            <Button type="primary" onClick={ this.handleSuccess }  >成功</Button>
                            <Button type="primary" onClick={ this.handleError } >错误</Button>
                            <Button type="primary" onClick={ this.handleWarning } >警示</Button>
                        </p>
                    </Card>
                    <Modal
                        title="基础模态框"
                        visible={this.state.showModal1}
                        onOk={ () =>{ this.handleModalOK("showModal1") } }
                        onCancel={ () =>{ this.handleModalCancel("showModal1") } }
                    >
                        <p>是否确定关闭本模态框？</p>
                    </Modal>
                    <Modal
                        title="自定义页脚"
                        visible={this.state.showModal2}
                        onOk={ () =>{ this.handleModalOK("showModal2") } }
                        okText="好的"
                        cancelText="算了"
                        onCancel={ () =>{ this.handleModalCancel("showModal2") } }
                    >
                        <p>是否确定关闭本模态框？</p>
                    </Modal>
                    <Modal
                        title="自定义位置"
                        visible={this.state.showModal3}
                        style={{top:20}}
                        onOk={ () =>{ this.handleModalOK("showModal3") } }
                        onCancel={ () =>{ this.handleModalCancel("showModal3") } }
                    >
                        <p>是否确定关闭本模态框？</p>
                    </Modal>
                </div>
        )
    }
}