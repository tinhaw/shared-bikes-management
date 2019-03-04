import React,{Component} from 'react'
import { Card,Table,Button,Form,Select,DatePicker } from 'antd'
import axios from '../../../../axios'
import Util from '../../../../util'
const FormItem=Form.Item;
const Option=Select.Option;

export default class Order extends Component {
    
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
            url:"/order/list",
            data:{
                isLoading:false,
                params
            },
        }).then((res)=>{
            let data=res.data.list;
            data.map((item)=>{
                item.key=item.order_sn;
            })
            this.setState({
                dataSource:data,
                pagination:Util.pagination(res,(current)=>{
                    that.request({
                        page:current
                    });
                })
            })
        })
    }

    handleSelectedChange=(selectedRowKeys, selectedRows)=>{
        this.setState({
            selectedRowKeys
        })
    }

    handleDetailBtn=()=>{
        if(!this.state.selectedRowKeys){
            alert("请选择一条数据");
        }else{
            const params={
                order_sn:this.state.selectedRowKeys[0]
            };
            this.request(params);
            window.open("/#/common/order/detail")
        }

    }

    handleRowClick=(record)=>{
        const selectedRowKeys=[record.key];
        this.setState({
            selectedRowKeys
        })
    }

    render(){
        const columns=[
            {
                title:"订单编号",
                align:"center",
                dataIndex: 'order_sn',
            },
            {
                title:"车辆编号",
                align:"center",
                dataIndex: 'bike_sn',
            },
            {
                title:"用户名",
                dataIndex: 'user_name',
            },
            {
                title:"手机号码",
                dataIndex: 'phone_num'
            },
            {
                title:"里程",
                dataIndex: 'distance'
            },
            {
                title:"状态",
                dataIndex: 'status'
            },
            {
                title:"开始时间",
                dataIndex: 'start_time',
                render(start_time){
                    let date=Util.formatDate(start_time);
                    let time=Util.formatTime(start_time);
                    return `${date} ${time}`;
                }
            },
            {
                title:"结束时间",
                dataIndex: 'end_time',
                render(end_time){
                    let date=Util.formatDate(end_time);
                    let time=Util.formatTime(end_time);
                    return `${date} ${time}`;
                }
            },
            {
                title:"订单金额",
                dataIndex: 'total_fee',
                render(total_fee){
                    return "￥"+total_fee/100
                }
            },
            {
                title:"实付金额",
                dataIndex: 'user_pay',
                render(user_pay){
                    return "￥"+user_pay/100
                }
            }
        ]

        const selectedRowKeys=this.state.selectedRowKeys;

        const rowSelection={
            type:"radio",
            onChange:this.handleSelectedChange,
            selectedRowKeys
        }

        return(
            <div>
                <Card 
                    className="card-wrap"
                >
                    <FilterForm requestFilteredList={ this.request }/>
                </Card>
                <Card>
                    <Button type="primary" onClick={this.handleDetailBtn}>订单详情</Button>
                </Card>
                <div style={{backgroundColor:"white",padding:10}}>
                    <Table 
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource}
                        rowSelection={rowSelection}
                        onRow={(record) => {
                            return {
                              onClick: (event) => {
                                  this.handleRowClick(record);
                              },       // 点击行

                            };
                          }}
                    />
                </div>
            </div>
        )
    }
}

class OriginalFilterForm extends Component {

    handleSubmit=()=>{
        const filterInfo=this.props.form.getFieldsValue();
        this.props.requestFilteredList(filterInfo);
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
                        <Button>重置</Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}

const FilterForm=Form.create({})(OriginalFilterForm);

