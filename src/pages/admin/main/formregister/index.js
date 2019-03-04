import React,{ Component } from 'react'
import { Form ,Card,Input,Button,Checkbox,Radio,InputNumber,Switch,DatePicker,Select,TimePicker,Upload,Icon,message } from 'antd'
import moment from 'moment'

const FormItem=Form.Item;
const SelectOption=Select.Option;
const TextArea=Input.TextArea;

class FormRegister extends Component {
    constructor(){
        super();
        this.state={};
    }

    handleSubmit=()=>{
        const regInfo=this.props.form.getFieldsValue();
        console.log(regInfo);
        message.success(`${regInfo.userName}，恭喜你注册成功。你的密码为：${regInfo.userPwd}`)
    }

    handleChange = (info) => {
        if (info.file.status === 'uploading') {
          this.setState({ loading: true });
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          this.getBase64(info.file.originFileObj, imageUrl => this.setState({
            imageUrl,
            loading: false,
          }));
        }
      }

      getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
      }

      beforeUpload(file){
        const isJPG = file.type === 'image/jpeg';
        if (!isJPG) {
          message.error('You can only upload JPG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          message.error('Image must smaller than 2MB!');
        }
        return isJPG && isLt2M;
      }

    render(){
        const { getFieldDecorator } = this.props.form;
        const formItemLayout={
            labelCol:{
                xs:{span:24},
               sm:{span:3}
            },
            wrapperCol:{
                xs:{span:24},
                sm:{span:8}
            }
        }

        const offsetLyout={
            wrapperCol:{
                xs:{span:24},
                sm:{span:8,offset:3}
            }
        }
        return(
            <div>
                <Card
                    className="card-wrap"
                    title="注册表单"
                >
                    <Form
                    >
                        <FormItem
                            {...formItemLayout}
                            label="用户名"
                        >
                            {
                                getFieldDecorator('userName',{
                                    rules:[
                                        {required:true,message:"用户名不能为空"}
                                    ]
                                })(
                                    <Input type="text" placeholder="请输入用户名"/>
                                )
                            }
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="密码"
                        >
                            {
                                getFieldDecorator('userPwd',{
                                    rules:[
                                        {required:true,message:"密码不能为空"}
                                    ]
                                })(
                                    <Input type="password" placeholder="请输入密码"/>
                                )
                            }
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="性别"
                        >
                            {
                                getFieldDecorator('gender',{
                                    initialValue:"1"
                                })(
                                    <Radio.Group>
                                        <Radio value="1">男</Radio>
                                        <Radio value="0">女</Radio>
                                    </Radio.Group>
                                )
                            }
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="年龄"
                        >
                            {
                                getFieldDecorator('age',{
                                    initialValue:18
                                })(
                                    <InputNumber min={0} max={60} />
                                )
                            }
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="婚否"
                        >
                            {
                                getFieldDecorator('isMarried',{
                                    valuePropName:"checked",
                                    initialValue:false
                                })(
                                    <Switch />
                                )
                            }
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="生日"
                        >
                            {
                                getFieldDecorator('birthday',{
                                    initialValue:moment("2019-02-04","YYYY-MM-DD")
                                })(
                                    <DatePicker 
                                        format="YYYY-MM-DD"
                                    />
                                )
                            }
                        </FormItem>
                        <FormItem label="当前状态" {...formItemLayout}>
                            {
                                getFieldDecorator('state', {
                                    initialValue: '2'
                                })(
                                    <Select>
                                        <SelectOption value="1">咸鱼一条</SelectOption>
                                        <SelectOption value="2">风华浪子</SelectOption>
                                        <SelectOption value="3">北大才子一枚</SelectOption>
                                        <SelectOption value="4">百度FE</SelectOption>
                                        <SelectOption value="5">创业者</SelectOption>
                                    </Select>
                                )
                            }
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="爱好"
                        >
                            {
                                getFieldDecorator('hobby',{
                                    initialValue:['1','5']
                                })(
                                    <Select 
                                        mode="multiple"
                                    >
                                        <SelectOption value='1'>足球</SelectOption>
                                        <SelectOption value='2'>篮球</SelectOption>
                                        <SelectOption value='3'>网球</SelectOption>
                                        <SelectOption value='4'>羽毛球</SelectOption>
                                        <SelectOption value='5'>骑行</SelectOption>
                                        <SelectOption value='6'>爬山</SelectOption>
                                        <SelectOption value='7'>徒步</SelectOption>
                                        <SelectOption value='8'>钓鱼</SelectOption>
                                    </Select>
                                )
                            }
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="早起时间"
                        >
                            {
                                getFieldDecorator('wakeTime',{
                                    initialValue:moment('12:00:00', 'HH:mm:ss')
                                })(
                                    <TimePicker 
                                    />
                                )
                            }
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="地址"
                        >
                            {
                                getFieldDecorator('wakeTime',{
                                    initialValue:"广东省深圳市福田区"
                                })(
                                    <TextArea />
                                )
                            }
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="头像"
                        >
                            {
                                getFieldDecorator('avatar')(
                                   <Upload
                                        listType="picture-card"
                                        showUploadList={false}
                                        action="//jsonplaceholder.typicode.com/posts/"
                                        onChange={this.handleChange}
                                        beforeUpload={this.beforeUpload}
                                   >
                                        {this.state.avatarUrl?<img src={this.state.avatarUrl} alt="" />:<Icon type="plus"/>}
                                   </Upload>
                                )
                            }
                        </FormItem>
                        <FormItem
                            {...offsetLyout}
                        >
                            {
                                getFieldDecorator('isRead',{
                                    valuePropName:"checked",
                                    initialValue:true
                                })(
                                    <Checkbox

                                    >
                                       我已阅读过<a href="#">《慕课协议》</a>
                                    </Checkbox>
                                )
                            }
                        </FormItem>
                        <FormItem
                            {...offsetLyout}
                        >
                          <Button className="login-form-button" type="primary" size="large" onClick={this.handleSubmit} >注册</Button>
                        </FormItem>
                    </Form>
                </Card>
             
            </div>
        )
    }
}

export default Form.create()(FormRegister)