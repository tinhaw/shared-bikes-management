import React,{Component} from 'react'
import { Card,Table,Button,Modal,message } from 'antd'
import axios from '../../../../axios'
import Util from '../../../../util'

export default class TableHigh extends Component {

    constructor(){
        super();
        this.state={
        };
    }

    

    componentDidMount(){
        this.request();
    }

    request=(params)=>{
        const that=this;
        axios.ajax({
            url:"/userinfo",
            data:{
                isLoading:false,
                params
            },
        }).then((res)=>{
            let data=res.data.list;
            data.map((item)=>{
                item.key=item.id;
            })
    
            this.setState({
                dataSource:data,
                selectedCheckedRowKeys:[],
                selectedCheckedRows:null,
                pagination:Util.pagination(res,(current)=>{
                    that.request({
                        page:current
                    });
                })
            })
        })
    }

    handleChange=(pagination, filters, sorter)=>{
        this.setState({
            sorterOrder:sorter.order
        })
    }

    handleDelete=(item)=>{
        const that=this;
        Modal.confirm({
            title:"删除确认",
            content:`您是否确定删除数据:ID=${item.id}？`,
            onOk:()=>{
                message.success("删除成功");
                that.request({
                    id:item.id
                });
            },
            okText:"确定",
            cancelText:"取消"
        })
    }

    render(){
        const columns=[
            {
                title:'id',
                dataIndex: 'id',
                width:80
            },
            {
                title:'姓名',
                dataIndex: 'userName',
                width:80
            },
            {
                title:'性别',
                dataIndex: 'sex',
                width:80,
                render(sex){
                    return{
                        0:"男",
                        1:"女"
                    }[sex]
                }
            },
            {
                title:'年龄',
                dataIndex: 'age',
                width:80
            },
            {
                title:'爱好',
                dataIndex: 'interest',
                width:80,
                render(interest){
                    return{
                        1:"足球",
                        2:"篮球",
                        3:"篮球",
                        4:"网球",
                        5:"游泳",
                        6:"徒步",
                    }[interest]
                }
            },
            {
                title:'状态',
                dataIndex: 'state',
                width:80,
                render(state){
                    return{
                        1:"百度FE",
                        2:"咸鱼一条",
                        3:"文青一枚",
                        4:"北大才子",
                        5:"技术宅",
                        6:"白帽子",
                    }[state]
                }
            },
            {
                title:'生日',
                dataIndex: 'birthday',
                width:120
            },
            {
                title:'地址',
                dataIndex: 'address',
                width:160
            },
            {
                title:'时间',
                dataIndex: 'time',
                width:120
            },
        ]

        const columns3=[
            {
                title:'id',
                dataIndex: 'id',
                align:"center",
                width:80
            },
            {
                title:'姓名',
                dataIndex: 'userName',
                width:80
            },
            {
                title:'性别',
                dataIndex: 'sex',
                width:80,
                render(sex){
                    return{
                        0:"男",
                        1:"女"
                    }[sex]
                }
            },
            {
                title:'年龄',
                dataIndex: 'age',
                sorter:(a,b)=>{
                    return a.age-b.age
                },
                sorterOder:this.state.sorterOrder,
                width:80
            },
            {
                title:'爱好',
                dataIndex: 'interest',
                width:80,
                render(interest){
                    return{
                        1:"足球",
                        2:"篮球",
                        3:"篮球",
                        4:"网球",
                        5:"游泳",
                        6:"徒步",
                    }[interest]
                }
            },
            {
                title:'状态',
                dataIndex: 'state',
                width:80,
                render(state){
                    return{
                        1:"百度FE",
                        2:"咸鱼一条",
                        3:"文青一枚",
                        4:"北大才子",
                        5:"技术宅",
                        6:"白帽子",
                    }[state]
                }
            },
            {
                title:'生日',
                dataIndex: 'birthday',

                width:120
            },
            {
                title:'地址',
                dataIndex: 'address',
                width:160
            },
            {
                title:'操作',
                width:80,
                render:(text,item)=>{
                    return <Button  type="danger" onClick={()=>{ this.handleDelete(item) }}>删除</Button>
                }
            },
        ]

        const columns2=[
            {
                title:'id',
                dataIndex: 'id',
                fixed:"left",
                width:80
            },
            {
                title:'姓名',
                dataIndex: 'userName',
                fixed:"left",
                width:80
            },
            {
                title:'性别',
                dataIndex: 'sex',
                fixed:"left",
                width:80,
                render(sex){
                    return{
                        0:"男",
                        1:"女"
                    }[sex]
                }
            },
            {
                title:'年龄',
                dataIndex: 'age',
                fixed:"left",
                width:80
            },
            {
                title:'爱好',
                dataIndex: 'interest',
                fixed:"left",
                width:80,
                render(interest){
                    return{
                        1:"足球",
                        2:"篮球",
                        3:"篮球",
                        4:"网球",
                        5:"游泳",
                        6:"徒步",
                    }[interest]
                }
            },
            {
                title:'状态',
                dataIndex: 'state',
                fixed:"left",
                width:80,
                render(state){
                    return{
                        1:"百度FE",
                        2:"咸鱼一条",
                        3:"文青一枚",
                        4:"北大才子",
                        5:"技术宅",
                        6:"白帽子",
                    }[state]
                }
            },
            {
                title:'生日',
                dataIndex: 'birthday',
                width:120
            },
            {
                title:'生日',
                dataIndex: 'birthday',
                width:120
            },
            {
                title:'生日',
                dataIndex: 'birthday',
                width:120
            },
            {
                title:'生日',
                dataIndex: 'birthday',
                width:120
            },
            {
                title:'生日',
                dataIndex: 'birthday',
                width:120
            },
            {
                title:'生日',
                dataIndex: 'birthday',
                width:120
            },
            {
                title:'生日',
                dataIndex: 'birthday',
                width:120
            },
            {
                title:'生日',
                dataIndex: 'birthday',
                width:120
            },
            {
                title:'生日',
                dataIndex: 'birthday',
                width:120
            },
            {
                title:'生日',
                dataIndex: 'birthday',
                width:120
            },
            {
                title:'生日',
                dataIndex: 'birthday',
                width:120
            },
            {
                title:'生日',
                dataIndex: 'birthday',
                width:120
            },
            {
                title:'生日',
                dataIndex: 'birthday',
                width:120
            },
            {
                title:'地址',
                dataIndex: 'address',
                fixed:"right",
                width:160
            },
            {
                title:'时间',
                dataIndex: 'time',
                fixed:"right",
                width:120
            },
        ]

        return(
            <div>
                <Card
                    className="card-wrap"
                    title="固定高度"
                >
                    <Table 
                        columns={columns}
                        bordered
                        dataSource={this.state.dataSource}
                        scroll={{
                            y:300
                        }}
                        pagination={this.state.pagination}
                    />
                </Card>
                <Card
                    className="card-wrap"
                    title="固定侧边"
                >
                    <Table 
                        columns={columns}
                        bordered
                        dataSource={this.state.dataSource}
                        scroll={{
                            x:2320
                        }}
                        pagination={this.state.pagination}
                    />
                </Card>
                <Card
                    className="card-wrap"
                    title="表格排序"
                >
                    <Table 
                        columns={columns3}
                        bordered
                        dataSource={this.state.dataSource}
                        onChange={this.handleChange}
                        pagination={false}
                    />
                </Card>
                <Card
                    className="card-wrap"
                    title="操作按钮"
                >
                    <Table 
                        columns={columns3}
                        bordered
                        dataSource={this.state.dataSource}
                        onChange={this.handleChange}
                        pagination={false}
                    />
                </Card>
            </div>
        )
    }
}