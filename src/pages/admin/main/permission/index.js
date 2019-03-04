import React ,{ Component } from 'react'
import { Button,Table,Modal,Card,Form,Input,Select,Tree,Transfer,message } from 'antd'
import axios from '../../../../axios'
import menuList from '../../../../config/menuConfig'

const FormItem=Form.Item;
const Option=Select.Option;
const { TreeNode }=Tree;

export default class Permission extends Component {

    constructor(){
        super();
        this.state={
        }
    }

    componentDidMount(){
        this.requestList();
    }

    requestList=(params)=>{
        axios.ajax({
            url:"/role/list",
            data:{
                isLoading:false,
                params
            },
        }).then((res)=>{
            let data=res.data.list;
            data.map((item)=>{
                item.key=item.role_id;
            })
            this.setState({
                dataSource:data,
            })
        })
    }

    requestEditRole=(params)=>{
        axios.ajax({
            url:"/role/detail",
            data:{
                isLoading:false,
                params
            },
        }).then((res)=>{
            if(res.code==0){
                let data=res.data;
                this.setState({
                    editRoleInfo:data,
                    isPermVisible:true
                });
            }
        })
    }

    requestUserAuthList=(params)=>{
        axios.ajax({
            url:"/userauth/list",
            data:{
                isLoading:false,
                params
            },
        }).then((res)=>{
            if(res.code==0){
                this.filterUserAuthList(res.data.list);
            }
        })
    }

    requestUserAuthsubmit=(params)=>{
        axios.ajax({
            url:"/userauth/submit",
            data:{
                isLoading:false,
                params
            },
        }).then((res)=>{
            if(res.code==0){
                message.success("用户权限列表提交成功");
            }
        })
    }

    handleRowClick=(record)=>{
        const selectedRowKeys=[record.key];
        this.setState({
            selectedRow:record,
            selectedRowKeys
        });
    }

    filterUserAuthList=(list)=>{
        let mockData=[];
        let targetKeys=[];
        list.forEach(item=>{
            let data={
                key:item.user_id,
                title:item.user_name,
                status:item.status
            };
            mockData.push(data);
            if(data.status==1){
                targetKeys.push(data.key)
            }
        });
        this.setState({
            mockData,targetKeys
        })
    }

    handleSelectedChange=(selectedRowKeys, selectedRows)=>{
        this.setState({
            selectedRow:selectedRows[0],
            selectedRowKeys
        });
    }

    handleCreateBtn=()=>{
        this.setState({
            isCreateVisible:true
        })
    }

    handlePermBtn=()=>{
        const selectedRow=this.state.selectedRow;
        const selectedRowKeys=this.state.selectedRowKeys;
        if(selectedRowKeys>1 && selectedRow){
            const role_id=selectedRow.role_id;
            this.requestEditRole({
                role_id
            });
            
        }else{
            alert("请选择一条数据");
        }

    }

    handleUserAuthBtn=()=>{
        const selectedRow=this.state.selectedRow;
        const selectedRowKeys=this.state.selectedRowKeys;
        if(selectedRowKeys>1 && selectedRow){
            const role_id=selectedRow.role_id;
            this.requestUserAuthList({
                role_id
            });
            this.setState({
                isUserAuthVisible:true
            })
        }else{
            Modal.info({
                content:"请选择一条数据"
            });
        }

    }

    handleCreateOk=()=>{
        this.setState({
            isCreateVisible:false
        })
        const createInfo=this.createForm.props.form.getFieldsValue();
        this.requestList(createInfo);
        this.createForm.props.form.resetFields();
        
    }

    handlePermOk=()=>{
        this.setState({
            isPermVisible:false
        })
        const permInfo=this.permForm.props.form.getFieldsValue();
        const checkedPermKeys=this.state.checkedPermKeys;
        permInfo.checkedPermKeys=checkedPermKeys;
        this.requestList(permInfo);
        this.permForm.props.form.resetFields();
       
    }
    handleUserAuthOk=()=>{
        this.setState({
            isUserAuthVisible:false
        })
        this.requestUserAuthsubmit(this.state.targetKeys);
    }

    handleCreateCancel=()=>{
        this.setState({
            isCreateVisible:false
        });
        this.createForm.props.form.resetFields();
    }

    handlePermCancel=()=>{
        this.setState({
            isPermVisible:false
        });
    }

    handleUserAuthCancel=()=>{
        this.setState({
            isUserAuthVisible:false
        })
    }

    getPermTree=(checkedPermKeys)=>{
        this.setState({
            checkedPermKeys
        })
    }

    patchUserAuthInfo=(targetKeys)=>{
        this.setState({
            targetKeys
        })
    }

    render(){

        const columns=[
            {
                title:"角色ID",
                dataIndex:"role_id"
            },
            {
                title:"角色名称",
                dataIndex:"role_name"
            },
            {
                title:"使用状态",
                dataIndex:"status"
            },
            {
                title:"授权时间",
                dataIndex:"auth_time"
            },
            {
                title:"授权人",
                dataIndex:"authorizer"
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
                <Card>
                    <Button type="primary" onClick={ this.handleCreateBtn }>创建角色</Button>
                    <Button type="primary" onClick={ this.handlePermBtn }>权限设置</Button>
                    <Button type="primary" onClick={ this.handleUserAuthBtn }>用户授权</Button>
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
                <Modal
                    title="创建角色"
                    visible={this.state.isCreateVisible}
                    onOk={this.handleCreateOk}
                    onCancel={this.handleCreateCancel}
                >
                    <CreateForm wrappedComponentRef={ inst=>{ this.permForm=inst } }/>
                </Modal>
                <Modal
                    title="权限设置"
                    visible={this.state.isPermVisible}
                    onOk={this.handlePermOk}
                    onCancel={this.handlePermCancel}
                >
                    <PermEditForm wrappedComponentRef={ inst=>{ this.permForm=inst }} data={ this.state.editRoleInfo } getPermTree={ this.getPermTree }/>
                </Modal>
                <Modal
                    width={800}
                    title="用户授权"
                    visible={this.state.isUserAuthVisible}
                    onOk={this.handleUserAuthOk}
                    onCancel={this.handleUserAuthCancel}
                >
                    <UserAuthForm roleInfo={ this.state.selectedRow } mockData={ this.state.mockData } targetKeys={ this.state.targetKeys } patchUserAuthInfo={ this.patchUserAuthInfo }/>
                </Modal>
  
            </div>
        )
    }
}

class OriginalCreateForm extends Component {

    render(){
        const { getFieldDecorator } = this.props.form;
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
                <Form>
                    <FormItem label="角色名称" {...formitemLayout}>
                        {
                            getFieldDecorator("role_name",{

                            })(
                                <Input type="text" placeholder="请输入角色名称"/>
                            )
                        }
                    </FormItem>
                    <FormItem label="状态" {...formitemLayout}>
                        {
                            getFieldDecorator("status",{
                                initialValue:1
                            })(
                                <Select>
                                    <Option value={1}>启用</Option>
                                    <Option value={0}>停用</Option>
                                </Select>
                            )
                        }
                    </FormItem>
                </Form>
            </div>
        )
    }
}

const CreateForm=Form.create({})(OriginalCreateForm);


class OriginalPermEditForm extends Component {

    constructor(){
        super();
        
    }

    renderTreeNode=(menu)=>{
        return menu.map(item=>{
            if(item.children){
                return (
                    <TreeNode title={ item.title } key={ item.key }>
                        { this.renderTreeNode(item.children) }
                    </TreeNode>
                )
                
            }else{
                return <TreeNode title={ item.title } key={ item.key }/>
            }
        })
    }

    onCheck=(checkedKeys)=>{

        this.props.getPermTree(checkedKeys);
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        const formitemLayout={
            labelCol:{
                span:6
            },
            wrapperCol:{
                span:16
            }
        }

        const data=this.props.data;

        return(
            <div>
                <Form>
                    <FormItem label="角色名称" {...formitemLayout}>
                        {
                            getFieldDecorator("role_name",{
                                initialValue:data.role_name
                            })(
                                <Input type="text" disabled/>
                            )
                        }
                    </FormItem>
                    <FormItem label="状态" {...formitemLayout}>
                        {
                            getFieldDecorator("status",{
                                initialValue:data.status
                            })(
                                <Select>
                                    <Option value={1}>启用</Option>
                                    <Option value={0}>停用</Option>
                                </Select>
                            )
                        }
                    </FormItem>
                    <Tree
                        checkable
                        defaultExpandAll
                        defaultCheckedKeys={this.props.data.checkedPermKeys}
                        // checkedKeys={ this.state.checkedPermKeys }
                        onCheck={ this.onCheck }
                    >
                        <TreeNode title="权限列表" key='all_permission'>
                            {
                                this.renderTreeNode(menuList)
                            }
                        </TreeNode>
                    </Tree>
                </Form>
            </div>
        )
    }
}

const PermEditForm=Form.create({})(OriginalPermEditForm);

class OriginalUserAuthForm extends Component {

    handleAuthSelectChange=(targetKeys)=>{
        this.props.patchUserAuthInfo(targetKeys);
    }

    filterOption = (inputValue, option) => {
        return option.title.indexOf(inputValue) > -1;
    };

    render(){

        const { getFieldDecorator } = this.props.form;
        const formitemLayout={
            labelCol:{
                span:4
            },
            wrapperCol:{
                span:18
            }
        }

        return(
            <div>
                <Form>
                    <FormItem label="角色名称" {...formitemLayout}>
                        {
                            getFieldDecorator("role_name",{
                                initialValue:this.props.roleInfo.role_name
                            })(
                                <Input disabled type="text" />
                            )
                        }
                    </FormItem>
                    <FormItem  label="选择用户" {...formitemLayout}>
                        {
                            getFieldDecorator("user_auth",{
                                
                            })(
                                <Transfer 
                                    listStyle={{width: 200,height: 400}}
                                    dataSource={ this.props.mockData }
                                    targetKeys={ this.props.targetKeys }
                                    showSearch
                                    render={item => item.title}
                                    onChange={this.handleAuthSelectChange}
                                    filterOption={this.filterOption}
                                    locale={{ itemUnit: '项', itemsUnit: '项', notFoundContent: '列表为空', searchPlaceholder: '请输入用户名' }}
                                    titles={['待选用户', '已选用户']}
                                />
                            )
                        }
                    </FormItem>
                </Form>
            </div>
        )
    }
}

const UserAuthForm=Form.create({})(OriginalUserAuthForm);