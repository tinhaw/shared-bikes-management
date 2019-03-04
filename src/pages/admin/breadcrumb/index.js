import React,{ Component } from 'react'
import { Row,Col } from 'antd'
import Util from '../../../util'
import axios from '../../../axios'

import './style.less'

export default class BreadCrumb extends Component{
    constructor(){
        super();
        this.state={
            lives:{
                "province": "",
                "city": "",
                "adcode": "",
                "weather": "",
                "temperature": "",
                "winddirection": "",
                "windpower": "",
                "humidity": "",
                "reporttime": ""
            }
        };
    }
    componentDidMount(){
        const _this=this;
        setInterval(()=>{
            const timeStamp=new Date().getTime();
            this.setState({
                date:Util.formatDate(timeStamp),
                time:Util.formatTime(timeStamp)
            })
        },1000);
        axios.jsonp({
            url:"https://restapi.amap.com/v3/weather/weatherInfo?city=430400&key=82b855be6cd77f49222c88cff7333b51"
        }).then((res)=>{
            if(res.status==1){
                _this.setState({
                    lives:res.lives[0]
                });
            }else{
                _this.setState({
                    lives:{
                        "province": "",
                        "city": "",
                        "adcode": "",
                        "weather": "",
                        "temperature": "",
                        "winddirection": "",
                        "windpower": "",
                        "humidity": "",
                        "reporttime": ""
                    }
                }) 
            }
        });
    }

    render(){
        return(
            <div>
                <Row className='bread-crumb-wrap'>
                    <Col span={4} className='bread-crumb'>
                        首页
                    </Col>
                    <Col span={20} className='weather-wrap'>
                        <span className='date'>{ this.state.date }</span>
                        <span className='time'>{ this.state.time }</span>
                        <span className='weather'>地市：{this.state.lives.province}省{this.state.lives.city}，天气：{this.state.lives.weather}，温度(°C)：{this.state.lives.temperature}，风向：{this.state.lives.winddirection}，风力：{this.state.lives.windpower}</span>
                    </Col>
                </Row>
            </div>

        )
    }
}