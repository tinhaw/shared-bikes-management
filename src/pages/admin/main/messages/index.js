import React,{Component} from 'react'
import { Button,Card,message } from 'antd'

export default class Messages extends Component {

    openMessage(type){
        message[type]("全局提示的内容。")
    }

    render(){
        return(
            <div>
                <Card
                    title="全局提示"
                >
                        <Button type="primary" onClick={ ()=>{ this.openMessage("success") } }>success</Button>
                        <Button type="primary" onClick={ ()=>{ this.openMessage("info") } }>info</Button>
                        <Button type="primary" onClick={ ()=>{ this.openMessage("error") } }>error</Button>
                        <Button type="primary" onClick={ ()=>{ this.openMessage("warning") } }>warning</Button>
                        <Button type="primary" onClick={ ()=>{ this.openMessage("loading") } }>loading</Button>

                </Card>
            </div>
        )
    }
}
