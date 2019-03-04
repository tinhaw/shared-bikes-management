import React,{Component} from 'react'
import { Card,Row,Col } from 'antd'
import axios from '../../../../axios'
import './style.less'

export default class OrderDetail extends Component {

    constructor(){
        super();
        this.state={
            center:[116.404, 39.915],
        };
    }

    componentDidMount(){
        this.request();

    }

    request=(params)=>{
        const that=this;
        axios.ajax({
            url:"/order/detail",
            data:{
                isLoading:false,
                params
            },
        }).then((res)=>{
            let data=res.data;
            this.setState({
                area:data.area,
                route:data.route,
                use_mode:data.use_mode,
                order_sn:data.order_sn,
                bike_sn:data.bike_sn,
                user_name:data.user_name,
                phone_num:data.phone_num,
                center:data.center,
                city_name:data.city_name,
                start_address:data.start_address,
                end_address:data.end_address,
                distance:data.distance
            });
            this.renderMap();
        })
    }

    renderMap=()=>{
        const route=this.state.route;
        const routePoints=route.map((item)=>{
            return new window.BMap.Point(item[0],item[1]);
        });

        const area=this.state.area;
        const areaPoints=area.map((item)=>{
            return new window.BMap.Point(item[0],item[1]);
        })

        const map=new window.BMap.Map("orderDetailMap");

        //建立图标
        const startIcon=new window.BMap.Icon(require('../../../../static/image/start_point.png'),new window.BMap.Size(36,42),{
            imageSize:new window.BMap.Size(36,42),anchor:new window.BMap.Size(18, 42)});
        const endIcon=new window.BMap.Icon(require('../../../../static/image/end_point.png'), new window.BMap.Size(36, 42), {
            imageSize: new window.BMap.Size(36, 42),
            anchor: new window.BMap.Size(18, 42)
        });
        const userIcon=new window.BMap.Icon(require('../../../../static/image/user_location.png'),new window.BMap.Size(36,42));

        //创建麻点
        const startPoint=new window.BMap.Point(route[0][0],route[0][1]);
        const endPoint=new window.BMap.Point(route[route.length-1][0],route[route.length-1][1]);
        const startMarker=new window.BMap.Marker(startPoint,{icon:startIcon})
        const endMarker=new window.BMap.Marker(endPoint,{icon:endIcon})
        map.addOverlay(startMarker);
        map.addOverlay(endMarker);

        map.centerAndZoom(endPoint, 15); 
        map.addControl(new BMap.NavigationControl({anchor: window.BMAP_ANCHOR_TOP_RIGHT}));	  
        map.setCurrentCity(this.state.city_name);          // 设置地图显示的城市 此项是必须设置的
        map.enableScrollWheelZoom(true);  



        //绘制行车路线
        const track=new BMap.Polyline(routePoints,{strokeColor:"#1869AD", strokeWeight:3, strokeOpacity:1});
        map.addOverlay(track);

        //绘制服务区
        const polygon=new BMap.Polygon(areaPoints,{
            strokeColor: '#CE0000',
            strokeWeight: 4,
            strokeOpacity: 1,
            fillColor: '#ff8605',
            fillOpacity:0.4
        });
        map.addOverlay(polygon);
    }

    render(){
        return(
            <div className="order-detail-container">
                <Card title="地图详情" className="card-wrap">
                    <div className="order-detail-map" id="orderDetailMap">

                    </div>
                </Card>
                <Card title="基础信息" className="card-wrap">
                    <Row className="order-detail-item">
                        <Col span={8} className="order-detail-label">用车模式：</Col>
                        <Col span={16} className="order-detail-content">{{1:"服务区",2:"停车点"}[this.state.use_mode]}</Col>
                    </Row>
                    <Row className="order-detail-item">
                        <Col span={8} className="order-detail-label">订单编号：</Col>
                        <Col span={16} className="order-detail-content">{this.state.order_sn}</Col>
                    </Row>
                    <Row className="order-detail-item">
                        <Col span={8} className="order-detail-label">车辆编号：</Col>
                        <Col span={16} className="order-detail-content">{this.state.bike_sn}</Col>
                    </Row>
                    <Row className="order-detail-item">
                        <Col span={8} className="order-detail-label">用户姓名：</Col>
                        <Col span={16} className="order-detail-content">{this.state.user_name}</Col>
                    </Row>
                    <Row className="order-detail-item">
                        <Col span={8} className="order-detail-label">手机号码：</Col>
                        <Col span={16} className="order-detail-content">{this.state.phone_num}</Col>
                    </Row>
                </Card>
                <Card title="行驶轨迹" className="card-wrap">
                    <Row className="order-detail-item">
                        <Col span={8} className="order-detail-label">行程起点：</Col>
                        <Col span={16} className="order-detail-content">{this.state.start_address}</Col>
                    </Row>
                    <Row className="order-detail-item">
                        <Col span={8} className="order-detail-label">行程终点：</Col>
                        <Col span={16} className="order-detail-content">{this.state.end_address}</Col>
                    </Row>
                    <Row className="order-detail-item">
                        <Col span={8} className="order-detail-label">行驶里程：</Col>
                        <Col span={16} className="order-detail-content">{(this.state.distance)/1000}公里</Col>
                    </Row>
                </Card>
            </div>
        )
    }
}