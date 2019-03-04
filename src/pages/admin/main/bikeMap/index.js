import React,{Component} from 'react'
import { Card,Button,Form,Select,DatePicker } from 'antd'
import axios from '../../../../axios'
import Util from '../../../../util'
const FormItem=Form.Item;
const Option=Select.Option;

export default class BikeMap extends Component {

    componentDidMount(){
        this.request();
    }

    request=(params)=>{
        axios.ajax({
            url:"/bike_map",
            data:{
                isLoading:false,
                params
            },
        }).then((res)=>{
            let data=res.data;
            this.setState({
                route:data.route,
                area:data.area,
                bikes:data.bikes,
                city_name:data.city_name,
                center:data.center
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

        const map=new window.BMap.Map("bikeMapContainer");

        //建立图标
        const startIcon=new window.BMap.Icon(require('../../../../static/image/start_point.png'),new window.BMap.Size(36,42),{
            imageSize:new window.BMap.Size(36,42),anchor:new window.BMap.Size(18, 42)});
        const endIcon=new window.BMap.Icon(require('../../../../static/image/end_point.png'), new window.BMap.Size(36, 42), {
            imageSize: new window.BMap.Size(36, 42),
            anchor: new window.BMap.Size(18, 42)
        });
        const userIcon=new window.BMap.Icon(require('../../../../static/image/user_location.png'),new window.BMap.Size(36,42));
        const bikeIcon=new window.BMap.Icon(require('../../../../static/image/bike.jpg'),new window.BMap.Size(36,42),{
            imageSize: new window.BMap.Size(36, 42),
            anchor: new window.BMap.Size(18, 42)
        });

        //创建麻点
        const startPoint=new window.BMap.Point(route[0][0],route[0][1]);
        const endPoint=new window.BMap.Point(route[route.length-1][0],route[route.length-1][1]);
        const startMarker=new window.BMap.Marker(startPoint,{icon:startIcon});
        const endMarker=new window.BMap.Marker(endPoint,{icon:endIcon});
        map.addOverlay(startMarker);
        map.addOverlay(endMarker);

        const centerPoint=new window.BMap.Point(this.state.center[0],this.state.center[1]);

        map.centerAndZoom(centerPoint, 15); 
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
            fillOpacity:0.1
        });
        map.addOverlay(polygon);

        //添加车辆
        const bikes=this.state.bikes;
        bikes.forEach(item => {
            let bikePoint=new window.BMap.Point(item[0],item[1]);
            let bikeMarker=new window.BMap.Marker(bikePoint,{icon:bikeIcon});
            map.addOverlay(bikeMarker);
        });
    }

    render(){
        return(
            <div>
                <Card
                    className="card-wrap"
                    title="条件筛选"
                >
                    <FilterForm 
                        requestFilteredList={ this.request }
                    />
                </Card>
                <Card
                    className="card-wrap"
                    title="车辆地图"
                >
                    <div id="bikeMapContainer" style={{height:800}}>
                    </div>
                </Card>
            </div>
        )
    }
}

class OriginalFilterForm extends Component {

    handleSubmit=()=>{
        const filterInfo=this.props.form.getFieldsValue();
        this.props.requestFilteredList(filterInfo);
    }

    reset=()=>{
        this.props.form.resetFields();
    }

    render(){
        const { getFieldDecorator } =this.props.form;
        return(
            <div>
                <Form layout="inline">
                    <FormItem label="城市">
                        {
                            getFieldDecorator('city_name',{
                                initialValue:"0"
                            })(
                                <Select style={{width:100}}>
                                    <Option value="0">全部</Option>
                                    <Option value="1">北京</Option>
                                    <Option value="2">上海</Option>
                                    <Option value="3">深圳</Option>
                                    <Option value="4">广州</Option>
                                </Select>
                            )
                        }
                    </FormItem>
                    <FormItem label="开始日期">
                        {
                            getFieldDecorator('start_date',{

                            })(
                                <DatePicker placeholder="开始日期"/>
                            )
                        }
                    </FormItem>
                    <FormItem label="结束日期">
                        {
                            getFieldDecorator('end_date',{

                            })(
                                <DatePicker placeholder="结束日期"/>
                            )
                        }
                    </FormItem>
                    <FormItem label="订单状态">
                        {
                            getFieldDecorator('status',{
                                initialValue:"0"
                            })(
                                <Select style={{width:150}}>
                                    <Option value="0">全部</Option>
                                    <Option value="1">进行中</Option>
                                    <Option value="2">行程结束</Option>
                                </Select>
                            )
                        }
                    </FormItem>
                    <FormItem>
                        <Button type="primary" onClick={ this.handleSubmit }>查询</Button>
                        <Button onClick={ this.reset } >重置</Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}

const FilterForm=Form.create({})(OriginalFilterForm);