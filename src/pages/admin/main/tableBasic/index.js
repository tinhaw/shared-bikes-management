import React,{Component} from 'react'
import { Card,Table,Modal,Button,message } from 'antd'
import axios from '../../../../axios'
import Util from '../../../../util'

export default class TableBasic extends Component {
    constructor(){
        super();
        this.state={
            selectedCheckedRowKeys:[]
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

    onRowClick=(record)=>{
        Modal.info({
            title:"您点击的用户信息",
            content:`用户名：${record.userName}，性别：${record.sex}，年龄：${record.age}。`
        });
        let selectedKey=[record.key];
        this.setState({
            selectedRowKeys:selectedKey
        })
    }

    onCheckedRowClick=(record)=>{
        Modal.info({
            title:"您点击的用户信息",
            content:`用户名：${record.userName}，性别：${record.sex}，年龄：${record.age}。`
        });
        let selectedKeys=this.state.selectedCheckedRowKeys.push(record.key);
        this.setState({
            selectedCheckedRowKeys:selectedKeys
        })
    }

    handleDelete=()=>{
        let ids=[];
        this.state.selectedCheckedRows.map((item)=>{
            ids.push(item.id)
        });
        Modal.confirm({
            title:'删除提示',
            content: `您确定要删除这些数据吗？${ids.join(',')}`,
            onOk:()=>{
                message.success('删除成功');
                this.request({
                    ids
                });
            }
   
        })



    }

    render(){
        const columns=[
            {
                title:'id',
                dataIndex: 'id'
            },
            {
                title:'姓名',
                dataIndex: 'userName'
            },
            {
                title:'性别',
                dataIndex: 'sex',
                render(sex){
                    return{
                        0:"男",
                        1:"女"
                    }[sex]
                }
            },
            {
                title:'年龄',
                dataIndex: 'age'
            },
            {
                title:'爱好',
                dataIndex: 'interest',
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
                dataIndex: 'birthday'
            },
            {
                title:'地址',
                dataIndex: 'address'
            },
            {
                title:'时间',
                dataIndex: 'time'
            },
        ]

        const rowSelection={
            type:"radio",
            selectedRowKeys:this.state.selectedRowKeys,
            onChange:(selectedRowKeys,selectedRows)=>{
                this.setState({
                    selectedRowKeys,
                    selectedRows
                })
            }
        }
        const rowCheckedSelection={
            type:"checkbox",
            selectedRowKeys:this.state.selectedCheckedRowKeys,
            onChange:(selectedCheckedRowKeys,selectedCheckedRows)=>{
                this.setState({
                    selectedCheckedRowKeys,
                    selectedCheckedRows
                })
            }
        }

        return(
            <div>
                <Card
                    className="card-wrap"
                    title="基础表格"
                >
                    <Table 
                        columns={columns}
                        dataSource={this.state.dataSource}
                        bordered
                        pagination={false}
                    />
                </Card>
                <Card
                    className="card-wrap"
                    title="Mock-单选"
                >
                    <Table 
                        onRow={(record) => {
                            return {
                                onClick: () => {
                                    this.onRowClick(record)
                                }
                            };
                        }}
                        rowSelection={rowSelection}
                        columns={columns}
                        dataSource={this.state.dataSource}
                        bordered
                        pagination={false}
                    />
                </Card>
                <Card
                    className="card-wrap"
                    title="Mock-多选"
                >   
                    <div>
                        <Button onClick={this.handleDelete} type="primary" style={{marginBottom:10}}>删除选中项</Button>
                    </div>

                    <Table 

                        rowSelection={rowCheckedSelection}
                        columns={columns}
                        dataSource={this.state.dataSource}
                        bordered
                        pagination={this.state.pagination}
                    />
                </Card>
                <Card
                    className="card-wrap"
                    title="Mock-分页器"
                >
                    <Table 

                        rowSelection={rowCheckedSelection}
                        columns={columns}
                        dataSource={this.state.dataSource}
                        bordered
                        pagination={this.state.pagination}
                    />
                </Card>
            </div>
        )
    }
}

