import React,{ Component } from 'react'
import { Card,Spin,Icon,Alert} from 'antd'
import './style.less'

export default class Loading extends Component {
    
    render(){
        const icon=<Icon type="loading" style={{fontSize:24}}></Icon>;
        const Meta=Card;
        return(
            <div>
                <Card 
                    className='card-wrap'
                    title="loading组件"
                >
                        <Spin style={{marginRight:20}}></Spin>
                        <Spin style={{marginRight:20}} size="small"></Spin>
                        <Spin style={{marginRight:20}} size="large"></Spin>
                        <Spin style={{marginRight:20}} indicator={icon}></Spin>
                </Card>
                <Card 
                    className='card-wrap'
                    title="警示框"
                >
                    <Alert
                        style={{marginBottom:20}}
                        message="成功提示"
                        description="此处为提示信息的内容"
                        type="success"
                    />
                    <Alert
                        style={{marginBottom:20}}
                        message="错误提示"
                        description="此处为提示信息的内容"
                        type="error"
                    />
                    <Alert
                        style={{marginBottom:20}}
                        message="信息提示"
                        description="此处为提示信息的内容"
                        type="info"
                    />
                    <Spin 
                        spinning={true}
                    >
                        <Alert
                            style={{marginBottom:20}}
                            message="警告提示"
                            description="此处为提示信息的内容"
                            type="warning"
                        />
                    </Spin>
                </Card>
                <Card 
                    className='card-wrap'
                    title="鼠标悬停偏移"
                >
                    <div  className='card-hover-wrap'>
                        <Card
                            className='card-hover'
                            style={{ width: 240 }}
                            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                        >
                            <h3>标题</h3>
                        </Card>
                    </div>


                </Card>
            </div>
        )
    }
}