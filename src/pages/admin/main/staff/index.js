import React,{Component} from 'react'
import { Card,Table,Button,Form,Select,DatePicker,Input,Modal,Radio } from 'antd'
import axios from '../../../../axios'
import Util from '../../../../util'
const FormItem=Form.Item;
const RadioGroup=Radio.Group;
const Option=Select.Option;


export default class Staff extends Component {

    constructor(){
        super();
        this.state={
            modal:{}
        }
    }

    componentDidMount(){
        this.request();
    }

    request=(params)=>{
        const that=this;
        axios.ajax({
            url:"/staff/list",
            data:{
                isLoading:false,
                params
            },
        }).then((res)=>{
            let data=res.data.list;
            data.map((item)=>{
                item.key=item.staff_id;
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

    handleOperate=(type)=>{
       if(type=="create"){
            this.setState({
                showModal:true,
                modal:{
                    title:"创建员工",
                    type:"create"
                }
            })
            return;
        }
        if( this.state.selectedRowKeys && this.state.selectedRowKeys>0 ){
            if(type=="detail"){
                this.setState({
                    showModal:true,
                    modal:{
                        title:"员工详情",
                        type:"detail"
                    },
                    data:this.state.selectedRow
                })
            }else if(type=="delete"){
                this.request(this.state.selectedRow);
                this.setState({
                    selectedRowKeys:[]
                })
            }else{
                this.setState({
                    showModal:true,
                    modal:{
                        title:"编辑员工",
                        type:"edit"
                    },
                    data:this.state.selectedRow
                })
            }
        }else{
            alert("请选择一条数据");
        }
        
    }

    handleSelectedChange=(selectedRowKeys, selectedRows)=>{
        this.setState({
            selectedRow:selectedRows[0],
            selectedRowKeys
        });
    }

    handleRowClick=(record)=>{
        const selectedRowKeys=[record.key];
        this.setState({
            selectedRow:record,
            selectedRowKeys
        });
    }

    closeModal=()=>{
        this.setState({
            showModal:false
        })
    }

    clearTable=()=>{
        this.setState({
            selectedRowKeys:[]
        })
    }


    render(){

        const columns=[
            {
                title:"员工编号",
                align:"center",
                dataIndex: 'staff_id',
            },
            {
                title:"员工姓名",
                dataIndex: 'staff_name',
            },
            {
                title:"性别",
                dataIndex: 'sex',
                render(sex){
                    return {
                        0:"男",
                        1:"女"
                    }[sex]
                }
            },
            {
                title:"状态",
                dataIndex: 'status',
                render(status){
                    return {
                        1:"咸鱼一条",
                        2:"风华浪子",
                        3:"北大才子",
                        4:"百度FE",
                        5:"创业者",
                        6:"文青一枚",
                    }[status]
                }
            },
            {
                title:"爱好",
                dataIndex: 'interest',
                render(interest){
                    return {
                        1:"足球",
                        2:"篮球",
                        3:"网球",
                        4:"登山",
                        5:"远足",
                        6:"旅行",
                    }[interest]
                }
            },
            {
                title:"生日",
                dataIndex: 'birthday',
                render(birthday){
                    return Util.formatDate(birthday);
                }
            },
            {
                title:"地址",
                dataIndex: 'address',
            },
            {
                title:"上班时间",
                dataIndex: 'time',
            },
        ];

        const selectedRowKeys=this.state.selectedRowKeys;

        const rowSelection={
            type:"radio",
            onChange:this.handleSelectedChange,
            selectedRowKeys
        };

        return(
            <div>
                <Card
                    title="条件筛选"
                >
                    <FilterForm requestFilteredList={ this.request }/>
                </Card>
                <Card>
                    <Button type="primary" icon="plus" onClick={ ()=>{ this.handleOperate("create") } }>创建员工</Button>
                    <Button type="primary" icon="edit" onClick={ ()=>{ this.handleOperate("edit") } }>编辑员工</Button>
                    <Button type="primary" onClick={ ()=>{ this.handleOperate("detail") } }>员工详情</Button>
                    <Button type="primary" icon="edit" onClick={ ()=>{ this.handleOperate("delete") } }>删除员工</Button>
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
                <BForm
                    modal={this.state.modal}
                    data={this.state.selectedRow}
                    showModal={ this.state.showModal }
                    handleShow={ this.closeModal }
                    requestList={ this.request }
                    clearTable={ this.clearTable }
                />
            </div>
        )
    }
}

class OriginalBForm extends Component {

    handleOk=()=>{
        this.props.handleShow();
        if(this.props.modal.type=="detail"){
            return;
        }
        const staff_info=this.props.form.getFieldsValue();
        this.props.requestList(staff_info);
        this.props.clearTable();
        this.reset();
    }

    reset=()=>{
        this.props.form.resetFields();

    }

    render(){
        const { getFieldDecorator } = this.props.form;
        const type= this.props.modal.type;
        const formitemLayout={
            labelCol:{
                span:6
            },
            wrapperCol:{
                span:16
            }
        }
        return(
            <div>
                <Modal
                    visible={ this.props.showModal }
                    title={ this.props.modal.title } 
                    onOk={ this.handleOk }
                    onCancel={ ()=>{ this.props.handleShow(); } }
                >
                    <Form>
                        <FormItem label="ID" {...formitemLayout}>
                            { type=="detail"?this.props.data.staff_id:getFieldDecorator("staff_id",{
                                initialValue:type=="edit"?this.props.data.staff_id:""
                            })(
                                <Input disabled={type=="edit"?true:false} type="text"/>
                            ) }
                        </FormItem>
                        <FormItem label="员工姓名" {...formitemLayout}>
                            { type=="detail"?this.props.data.staff_name:getFieldDecorator("staff_name",{
                                initialValue:type=="edit"?this.props.data.staff_name:""
                            })(
                                <Input type="text"/>
                            ) }
                        </FormItem>
                        <FormItem label="性别" {...formitemLayout}>
                            { type=="detail"?this.props.data.sex:getFieldDecorator("sex",{
                                initialValue:type=="edit"?this.props.data.sex:0
                            })(
                                <RadioGroup>
                                    <Radio value={0}>男</Radio>
                                    <Radio value={1}>女</Radio>
                                </RadioGroup>
                            ) }
                        </FormItem>
                        <FormItem label="状态" {...formitemLayout}>
                            { type=="detail"?this.props.data.status:getFieldDecorator("status",{
                                initialValue:type=="edit"?this.props.data.status:1
                            })(
                                <Select>
                                   <Option value={1}>咸鱼一条</Option>
                                   <Option value={2}>风华浪子</Option>
                                   <Option value={3}>北大才子</Option>
                                   <Option value={4}>百度FE</Option>
                                   <Option value={5}>创业者</Option>
                                   <Option value={6}>文青一枚</Option>
                                </Select>
                            ) }
                        </FormItem>
                        <FormItem label="爱好" {...formitemLayout}>
                            { type=="detail"?this.props.data.interest:getFieldDecorator("interest",{
                                initialValue:type=="edit"?this.props.data.interest:1
                            })(
                                <Select>
                                   <Option value={1}>足球</Option>
                                   <Option value={2}>篮球</Option>
                                   <Option value={3}>网球</Option>
                                   <Option value={4}>登山</Option>
                                   <Option value={5}>远足</Option>
                                   <Option value={6}>旅行</Option>
                                </Select>
                            ) }
                        </FormItem>
                        <FormItem label="爱好" {...formitemLayout}>
                            { type=="detail"?this.props.data.address:getFieldDecorator("address",{
                                initialValue:type=="edit"?this.props.data.address:""
                            })(
                               <Input.TextArea rows={3}/>
                            ) }
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        )
    }
}

const BForm=Form.create({})(OriginalBForm);

class OriginalFilterForm extends Component {

    handleLookUp=()=>{
        const filterInfo=this.props.form.getFieldsValue();
        this.props.requestFilteredList(filterInfo);
    }

    render(){
        const { getFieldDecorator } =this.props.form;
        return(
            <div>
                <Form layout="inline">
                    <FormItem label="员工姓名">
                        {
                            getFieldDecorator('staff_name',{

                            })(
                                <Input type="text" style={{width:200}} placeholder="请输入员工姓名"/>
                            )
                        }
                    </FormItem>
                    <FormItem label="手机号码">
                        {
                            getFieldDecorator('phone_num',{

                            })(
                                <Input type="text" style={{width:200}} placeholder="请输入手机号码"/>
                            )
                        }
                    </FormItem>
                    <FormItem label="入职日期">
                        {
                            getFieldDecorator('entry_date',{

                            })(
                                <DatePicker placeholder="入职日期"/>
                            )
                        }
                    </FormItem>
                    <FormItem>
                        <Button type="primary" onClick={ this.handleLookUp }>查询</Button>
                        <Button onClick={ this.handleReset }>重置</Button>
                    </FormItem>
                </Form>

            </div>
        )
    }
}

const FilterForm=Form.create({})(OriginalFilterForm);