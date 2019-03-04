import React,{Component} from 'react'
import { Card ,Row ,Col ,Modal} from 'antd'

export default class Gallery extends Component {
    constructor(){
        super();
        const imgs = [
            ['1.png', '2.png', '3.png', '4.png', '5.png','21.png'],
            ['6.png', '7.png', '8.png', '9.png', '10.png','22.png'],
            ['11.png', '12.png', '13.png', '14.png', '15.png','23.png'],
            ['16.png', '17.png', '18.png', '19.png', '20.png','24.png']
        ];
        const imgEleList=imgs.map((imgs2)=>imgs2.map((item)=>
            <Card
                style={{marginBottom:20}}
                key={item}
                cover={<img alt="example" src={require('../../../../static/image/'+item)} onClick={ ()=>{ this.openModal(item) } }/>}
            >
                <Card.Meta 
                    title="Europe Street beat"
                    description="www.instagram.com"
                />
            </Card>
        ));
        this.state={
            imgEleList,
            currentImg:require('../../../../static/image/1.png'),
            showModal:false
        }
    }

    openModal=(imgName)=>{
        this.setState({
            showModal:true,
            currentImg:require('../../../../static/image/'+imgName)
        })
    }

    closeModal=()=>{
        this.setState({
            showModal:false
        })
    }

    render(){
        return (
            <div>
                <Row
                    gutter={20}
                >
                    <Col md={6}>
                        {this.state.imgEleList[0]}
                    </Col>
                    <Col md={6}>
                        {this.state.imgEleList[1]}
                    </Col>
                    <Col md={6}>
                        {this.state.imgEleList[2]}
                    </Col>
                    <Col md={6}>
                        {this.state.imgEleList[3]}
                    </Col>
                </Row>
                <Modal
                    title="图片详情"
                    visible={this.state.showModal}
                    footer={null}
                    onCancel={ this.closeModal }
                    style={{width:500}}
                >
                    <img alt="" src={this.state.currentImg} style={{width:'100%'}}></img>
                </Modal>
            </div>
        )
    }
}