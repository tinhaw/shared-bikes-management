import React,{ Component } from 'react'
import { Form ,Card,Input,Button,Icon,Checkbox } from 'antd'
import './style.less'

export default class FormLogin extends Component {
    render(){
        return(
            <div>
                <Card
                    className="card-wrap"
                    title="内联登录表单"
                >
                    <Form
                      layout="inline"  
                    >
                        <Form.Item label="用户名">
                            <Input  placeholder='请在此输入用户名' />
                        </Form.Item>
                        <Form.Item label="密码">
                            <Input  placeholder='请在此输入密码' />
                        </Form.Item>
                        <Form.Item >
                            <Button type="primary">提交</Button>
                        </Form.Item>
                        
                    </Form>
                </Card>
                <Card
                    className="card-wrap"
                    title="水平登录框"
                >
                    <Form
                        style={{width:300}}
                    >
                        <Form.Item>
                            <Input prefix={<Icon type="user" style={{textAlign:"center"}} />} placeholder='请在此输入用户名' />
                        </Form.Item>
                        <Form.Item>
                            <Input prefix={<Icon type="lock" style={{textAlign:"center"}} />}  placeholder='请在此输入密码' />
                        </Form.Item>
                        <Form.Item>
                            <Checkbox>记住密码</Checkbox>
                            <a className="login-form-forgot" href="#">忘记密码</a>
                        </Form.Item>
                        <Form.Item >
                            <Button className="login-form-button" type="primary">登录</Button>
                        </Form.Item>
                        
                    </Form>
                </Card>
            </div>
        )
    }
}