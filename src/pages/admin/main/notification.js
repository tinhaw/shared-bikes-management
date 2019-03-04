import React,{Component} from 'react'
import { Card , Button , notification,Select } from 'antd'


export default class Notification extends Component {

    openNotification(placement){
        notification.open({
            message:"通知提醒标题",
            description:"通知提醒框内容",
            placement
        })
    }

    openNotificationType(type){
        notification[type]({
            message:"通知提醒标题",
            description:"通知提醒框内容",
        })
    }

    render(){
        const { Option } = Select;
        const options=['topLeft', 'topRight', 'bottomLeft', 'bottomRight'];
        return(
            <div>
                <Card
                    style={{marginBottom:20}}
                    title="不同位置的通知提醒框"
                >
                    <Button type="primary" onClick={ ()=>{ this.openNotification("") } }>通知提醒框(默认)</Button>
                    <Button type="primary" onClick={ ()=>{ this.openNotification("topRight") } }>右上角</Button>
                    <Button type="primary" onClick={ ()=>{ this.openNotification("topLeft") } }>左上角</Button>
                    <Button type="primary" onClick={ ()=>{ this.openNotification("bottomLeft") } }>左下角</Button>
                    <Button type="primary" onClick={ ()=>{ this.openNotification("bottomRight") } }>右下角</Button>
                </Card>
                <Card
                    style={{marginBottom:20}}
                    title="不同类型的通知提醒框"
                >
                    <Button type="primary" onClick={ ()=>{ this.openNotificationType("success") } }>success</Button>
                    <Button type="primary" onClick={ ()=>{ this.openNotificationType("error") } }>error</Button>
                    <Button type="primary" onClick={ ()=>{ this.openNotificationType("info") } }>info</Button>
                    <Button type="primary" onClick={ ()=>{ this.openNotificationType("warning") } }>warning</Button>
                    <Button type="primary" onClick={ ()=>{ this.openNotificationType("warn") } }>warn</Button>
                </Card>
                <Card
                    style={{marginBottom:20}}
                    title="通知提醒框的全局配置"
                >   
                    <Select
                        defaultValue="topRight"
                        style={{ width: 120, marginRight: 10 }}
                        onChange={(val) => {
                            notification.config({
                              placement: val,
                            });
                          }}
                    >
                        { options.map((val)=>{
                            return <Option value={val} key={val}>{val}</Option>
                        }) }
                    </Select>

                    <Button type="primary" onClick={ ()=>{ this.openNotificationType("success") } }>success</Button>
                    <Button type="primary" onClick={ ()=>{ this.openNotificationType("error") } }>error</Button>
                    <Button type="primary" onClick={ ()=>{ this.openNotificationType("info") } }>info</Button>
                    <Button type="primary" onClick={ ()=>{ this.openNotificationType("warning") } }>warning</Button>
                    <Button type="primary" onClick={ ()=>{ this.openNotificationType("warn") } }>warn</Button>
                </Card>
            </div>
        )
    }
}