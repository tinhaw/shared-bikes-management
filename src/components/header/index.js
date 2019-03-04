import React,{ Component } from 'react'
import { Button,Row,Col } from 'antd'
import Util from '../../util'
import axios from '../../axios'

import './style.less'

export default class Header extends Component{

    handleLogout(){
        //do logout
        console.log(this);
    }
    render(){

        const navType=this.props.navType;
        return(
            <div>
                <Row className='header'>
                    <Col span={12} className="primary-logo-wrap">
                        {navType?<div><img className="primary-logo-img" alt="logo无法显示" src={require("../../static/image/ebike_logo.png")}/><span>E-bike管理系统</span></div>:""}
                    </Col>
                    <Col span={12} className="primary-text-wrap">
                        <div>
                            <span>欢迎，</span>
                            <span>{ this.props.userName }</span>
                            <Button type="primary" className="logout-btn" onClick={this.handleLogout}>退出</Button>
                        </div>
                    </Col>

                </Row>
               
            </div>

        )
    }
}