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

export default class PieChart extends Component {

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
            legend:{
                orient:"vertical",
                right:"50px",
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
            series:[
                {
                    name:"本周订单量",
                    type:"pie",
                    radius:"55%",
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:[10, 52, 200, 334, 390, 330, 220]
                }
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
                right:"50px",
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
            series:[
                {
                    name:"本周订单量",
                    type:"pie",
                    radius:"60%",
                    data:[
                        {value:10,name:"周一"},
                        {value:52,name:"周二"},
                        {value:200,name:"周三"},
                        {value:334,name:"周四"},
                        {value:390,name:"周五"},
                        {value:330,name:"周六"},
                        {value:220,name:"周日"},
                    ].sort((a,b)=>{
                        return a.value-b.value
                    }),
                    roseType: 'radius',
                    animationType: 'scale',
                    animationEasing: 'elasticOut',
                    animationDelay: function (idx) {
                        return Math.random() * 200;
                    }
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
                right:"50px",
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
            series:[
                {
                    name:"本周订单量",
                    type:"pie",
                    radius:["50%","70%"],
                    data:[
                        {value:10,name:"周一"},
                        {value:52,name:"周二"},
                        {value:200,name:"周三"},
                        {value:334,name:"周四"},
                        {value:390,name:"周五"},
                        {value:330,name:"周六"},
                        {value:220,name:"周日"},
                    ]
                }
            ]
        }
        return option;
    }


    render(){
        return(
            <div>
                <Card
                    className="card-wrap"
                    title="饼图一"
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
                    title="饼图二"
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
                    title="饼图三"
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