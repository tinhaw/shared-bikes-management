import React,{Component} from 'react'
import { Card,Table,Button,Modal,Form,Select } from 'antd'
import axios from '../../../../axios'
import Util from '../../../../util'
const FormItem=Form.Item;
const Option=Select.Option;

export default class City extends Component {
    
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
            url:"/cityinfo",
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
                pagination:Util.pagination(res,(current)=>{
                    that.request({
                        page:current
                    });
                })
            })
        })
    }

    render(){
        const columns=[
            {
                title:"城市ID",
                align:"center",
                dataIndex: 'id',
            },
            {
                title:"城市名称",
                dataIndex: 'city_name',
            },
            {
                title:"用车模式",
                dataIndex: 'use_mode',
                render(use_mode){
                    return{
                        1:"停车点",
                        2:"禁停区"
                    }[use_mode]
                }
            },
            {
                title:"运营模式",
                dataIndex: 'op_mode',
                render(op_mode){
                    return{
                        1:"自营",
                        2:"加盟"
                    }[op_mode]
                }
            },
            {
                title:"授权加盟",
                dataIndex: 'auth_status',
            },
            {
                title:"城市管理员",
                dataIndex: 'city_admin',
                render(arr){
                    return arr.map((item)=>{
                        return item.admin_name
                    }).join("，");
                }
            },
            {
                title:"开通时间",
                dataIndex: 'open_time',
                render(open_time){
                    return Util.formatDate(open_time)
                }
            },
            {
                title:"操作时间",
                dataIndex: 'update_time',
                render(open_time){
                    return Util.formatDate(open_time)
                }
            },
            {
                title:"操作人",
                dataIndex: 'operator',
            }
        ]

        return(
            <div>
                <Card 
                    className="card-wrap"
                >
                    <FilterForm requestFilteredList={ this.request }/>
                </Card>
                <Card>
                    <OpenForm insertItem={ this.request }/>
                </Card>
                <div style={{backgroundColor:"white",padding:10}}>
                    <Table 
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource}
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
                    <FormItem label="用车模式">
                        {
                            getFieldDecorator('use_mode',{
                                initialValue:"0"
                            })(
                                <Select style={{width:150}}>
                                    <Option value="0">全部</Option>
                                    <Option value="1">指定停车点模式</Option>
                                    <Option value="2">禁停区模式</Option>
                                </Select>
                            )
                        }
                    </FormItem>
                    <FormItem label="营运模式">
                        {
                            getFieldDecorator('op_mode',{
                                initialValue:"1"
                            })(
                                <Select style={{width:100}}>
                                    <Option value="">全部</Option>
                                    <Option value="1">自营</Option>
                                    <Option value="2">加盟</Option>
                                </Select>
                            )
                        }
                    </FormItem>
                    <FormItem label="加盟商授权状态">
                        {
                            getFieldDecorator('auth_status',{
                                initialValue:"1"
                            })(
                                <Select style={{width:100}}>
                                    <Option value="">全部</Option>
                                    <Option value="1">已授权</Option>
                                    <Option value="2">未授权</Option>
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

class OriginalOpenForm extends Component {

    constructor(){
        super();
        this.state={
            modalVisible:false
        }
    }

    handleOk=()=>{
        const openInfo=this.props.form.getFieldsValue();
        this.props.insertItem(openInfo);
        this.setState({
            modalVisible:false
        })
    }

    handleCancel=()=>{
        this.setState({
            modalVisible:false
        })
    }

    handleOpenClick=()=>{
        this.setState({
            modalVisible:true
        })
    }

    render(){
        const formItemLayout={
            labelCol:{
                span:5
            },
            wrapperCol:{
                span:19
            }
        }
        const { getFieldDecorator } = this.props.form;

        return(
            <div>
                <Button type="primary" size="large" onClick={ this.handleOpenClick }>开通城市</Button>
                <Modal
                    title="开通城市"
                    visible={ this.state.modalVisible }
                    onOk={ this.handleOk }
                    onCancel={ this.handleCancel }
                >
                    <Form layout="horizontal">
                        <FormItem  label="选择城市" {...formItemLayout}>
                            {
                                getFieldDecorator("city_name",{
                                    initialValue:1
                                })(
                                    <Select style={{width:200}}>
                                        <Option value={0}>全部</Option>
                                        <Option value={1}>北京</Option>
                                        <Option value={2}>上海</Option>
                                        <Option value={3}>深圳</Option>
                                        <Option value={4}>广州</Option>
                                    </Select>
                                )
                            }
                        </FormItem>
                        <FormItem  label="营运模式" {...formItemLayout}>
                            {
                                getFieldDecorator("op_mode",{
                                    initialValue:1
                                })(
                                    <Select style={{width:200}}>
                                        <Option value={1}>自营</Option>
                                        <Option value={2}>加盟</Option>

                                    </Select>
                                )
                            }
                        </FormItem>
                        <FormItem  label="用车模式" {...formItemLayout}>
                            {
                                getFieldDecorator("use_mode",{
                                    initialValue:1
                                })(
                                    <Select style={{width:200}}>
                                        <Option value={1}>停车点</Option>
                                        <Option value={2}>禁停区</Option>
                                    </Select>
                                )
                            }
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        )
    }
}

const OpenForm=Form.create({})(OriginalOpenForm);