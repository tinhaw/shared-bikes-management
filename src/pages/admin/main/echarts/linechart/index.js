import React,{ Component } from 'react'
import { Card } from 'antd'
import ReactEcharts from 'echarts-for-react'
import vintageTheme from '../vintageTheme'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'

export default class LineChart extends Component {

    componentWillMount(){
        echarts.registerTheme("vintage",vintageTheme);
    }

    getOption=()=>{
       let option={
            title:{
                text:"用户骑行订单量",
                subtext:"本周订单量",
                x:"center",
                textStyle:{
                    color:"#333"
                }
            },
            tooltip:{
                trigger: 'item',
                formatter:"{a}<br/>{b}:{c}"

            },
           
            xAxis:{
                type: 'category',
                boundaryGap: false,
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
                    name:"本周订单量",
                    type:"line",
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
                subtext:"本周订单量",
                x:"center",
                textStyle:{
                    color:"#333"
                }
            },
            tooltip:{
                trigger: 'item',
                formatter:"{a}<br/>{b}:{c}"

            },
            legend:{
                orient:"vertical",
                right:"30px",
                data:[
                    'ofo订单量',
                    '摩拜订单量',
                    '小蓝订单量'
                ]
            },
            xAxis:{
                type: 'category',
                boundaryGap: false,
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
                    name:"ofo订单量",
                    type:"line",
                    data:[100, 190, 260, 360, 415, 500, 690]
                },
                {   
                    name:"摩拜订单量",
                    type:"line",
                    data:[45, 85, 200, 305, 360, 458, 560]
                },
                {   
                    name:"小蓝订单量",
                    type:"line",
                    data:[30, 50, 90, 165, 240, 335, 400]
                },
            ]
        }
        return option;
    }

    getOption3=()=>{
       let option={
            title:{
                text:"用户骑行订单量",
                subtext:"本周订单量",
                x:"center",
                textStyle:{
                    color:"#333"
                }
            },
            tooltip:{
                trigger: 'item',
                formatter:"{a}<br/>{b}:{c}"

            },
            legend:{
                orient:"vertical",
                right:"30px",
                data:[
                    'ofo订单量',
                    '摩拜订单量',
                    '小蓝订单量'
                ]
            },
            xAxis:{
                type: 'category',
                boundaryGap: false,
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
                    name:"ofo订单量",
                    type:"line",
                    data:[100, 190, 260, 360, 415, 500, 690],
                    areaStyle: {}
                },
                {   
                    name:"摩拜订单量",
                    type:"line",
                    data:[45, 85, 200, 305, 360, 458, 560],
                    areaStyle: {}
                },
                {   
                    name:"小蓝订单量",
                    type:"line",
                    data:[30, 50, 90, 165, 240, 335, 400],
                    areaStyle: {}
                },
            ]
        }
        return option;
    }

    render(){
        return(
            <div>
                <Card
                    className="card-wrap"
                    title="折线图一"
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
                    className="card-wrap"
                    title="折线图二"
                >
                    <ReactEcharts 
                        option={ this.getOption2() }
                        notMerge={true}
                        lazyUpdate={true}
                        style={{height:600}}
                        theme="vintage"
                    /> 
                </Card>
                <Card
                    className="card-wrap"
                    title="折线图三"
                >
                    <ReactEcharts 
                        option={ this.getOption3() }
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