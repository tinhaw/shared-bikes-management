import React,{Component} from 'react'
import { Button,Card,Radio } from 'antd'
import './style.less'


export default class Buttons extends Component {
    constructor(){
        super();
        this.state={
            isLoading:true,
            size:"default"
        }
    }

    handleLoading = ()=>{
        this.setState({
            isLoading:!this.state.isLoading
        })
    }

    handleSize = (e) => {
        this.setState({
            size:e.target.value
        })
    }

    render(){
        return(
            <div>
                <Card
                    className="card-wrap"
                    title="基础按钮"
                 >
                 <p>
                     <Button type='primary'>Primary</Button><Button>Default</Button>
                     <Button type='dashed'>Dashed</Button><Button type='danger'>Danger</Button>
                </p>
                </Card>
                <Card
                    className="card-wrap"
                    title="图标按钮"
                 >
                 <p>
                     <Button type='primary' icon="plus">创建</Button>
                     <Button type='primary' icon="edit">编辑</Button>
                     <Button type='primary' icon="download">下载</Button>
                     <Button type='primary' icon="delete">删除</Button>

                </p>
                </Card>
                <Card
                    className="card-wrap"
                    title="loading按钮"
                 >
                 <p>
                     <Button type='primary' loading={this.state.isLoading}>确定</Button>
                     <Button shape='circle' loading={this.state.isLoading}></Button>
                     <Button type='primary' onClick={ this.handleLoading }>{this.state.isLoading?"停止":"开始"}</Button>
          
                </p>
                </Card>
                <Card
                    className="card-wrap"
                    title="按钮大小"
                 >
                 <p> 
                    <Radio.Group value={this.state.size} onChange={ this.handleSize } >
                        <Radio value="small">小</Radio>
                        <Radio value="default">中</Radio>
                        <Radio value="large">大</Radio>
                    </Radio.Group>
                     <Button type='primary' size={this.state.size}>点击</Button>
                     <Button type='primary' size={this.state.size} icon="search">search</Button>
                </p>
                </Card>
            </div>
        )
    }
}