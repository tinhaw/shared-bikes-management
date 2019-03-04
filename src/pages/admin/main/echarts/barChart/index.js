import React,{ Component } from 'react'
import { Card } from 'antd'
import ReactEcharts from 'echarts-for-react'
import vintageTheme from '../vintageTheme'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'

export default class BarChart extends Component {

    componentWillMount(){
        echarts.registerTheme("vintage",vintageTheme);
    }

    

    getOption=()=>{
       let option={
            title:{
                text:"用户骑行订单量",
                x:"center",
                textStyle:{
                    color:"#333"
                }
            },
            tooltip:{
                triger:"axis"
            },
            xAxis:{
                data:[
                    '周一',
                    '周二',
                    '周三',
                    '周四',
                    '周五',
                    '周六',
                    '周日'
                ]
            },
            yAxis:{
                type:"value"
            },
            series:[
                {
                    name:"订单量",
                    type:"bar",
                    barWidth:"60%",
                    data:[10, 52, 200, 334, 390, 330, 220]
                }
            ]
        }
        return option;
    }
    getOption2=()=>{
       let option={
            title:{
                text:"用户骑行订单量",
                x:"center",
                textStyle:{
                    color:"#333"
                }
            },
            legend:{
                data:["ofo","摩拜","小蓝"],
                align:"right",
                right:"50px",
                top:"30px",
                orient:"vertical"
            },
            tooltip:{
                triger:"axis"
            },
            xAxis:{
                data:[
                    '周一',
                    '周二',
                    '周三',
                    '周四',
                    '周五',
                    '周六',
                    '周日'
                ]
            },
            yAxis:{
                type:"value"
            },
            series:[
                {
                    name:"ofo",
                    type:"bar",
                    data:[10, 52, 200, 334, 390, 330, 220]
                },
                {
                    name:"摩拜",
                    type:"bar",
                    data:[5, 30, 150, 230, 305, 300, 250]
                },
                {
                    name:"小蓝",
                    type:"bar",
                    data:[15, 32, 100, 180, 220, 290, 300]
                },
            ]
        }
        return option;
    }

    render(){
        return(
            <div>
                <Card
                    title="柱状图一"
                >
                    <ReactEcharts 
                        option={ this.getOption() }
                        notMerge={true}
                        lazyUpdate={true}
                        style={{height:600}}
                        theme="vintage"
                    /> 
                </Card>
                <Card
                    title="柱状图二"
                >
                    <ReactEcharts 
                        option={ this.getOption2() }
                        notMerge={true}
                        lazyUpdate={true}
                        style={{height:600}}
                        theme="vintage"
                    /> 
                </Card>
            </div>
        )
    }
}