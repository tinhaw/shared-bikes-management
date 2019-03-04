import React,{ Component } from 'react'
import { Row , Col} from 'antd'
import Navleft from '../../components/navleft'
import Header from '../../components/header'
import Main from './main'
import Footer from '../../components/footer'
import BreadCrumb from './breadcrumb'
// import 'antd/dist/antd.css'
import './style.less'

export default class Admin extends Component {
    constructor(){
        super();
        this.state={
            userName:"牛魔王的主人"
        }
    }
    render(){
        return (
            <div>
                <Row>
                    <Col span={4}>
                        <Navleft />
                    </Col>
                    <Col span={20} className="right">
                        <Header  userName={this.state.userName} />
                        <BreadCrumb />
                        <Main>
                            {/* <Home /> */}
                            {this.props.children}
                        </Main>
                        <Footer />
                    </Col>
                </Row>
            </div>
        )
    }
}