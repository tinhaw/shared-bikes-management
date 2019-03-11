import React,{ Component } from 'react';
import { Menu  } from 'antd';
import { NavLink } from 'react-router-dom'
const SubMenu = Menu.SubMenu;
// import logo_img from '../../static/image/ebike_logo.png';
import menuList from '../../config/menuConfig.js';
import './style.less';
import logo_img from '../../static/image/ebike_logo.png'


export default class Navleft extends Component {
    constructor(){
        super();
        this.state={};
    }

    componentDidMount(){
        console.log(menuList);
        const menuItems=this.renderMenuList(menuList);
        this.setState({
            menuItems
        })
    }

    handleClick = ({ item, key }) => {
        if (key == this.state.currentKey) {
            return false;
        }
        // 事件派发，自动调用reducer，通过reducer保存到store对象中
        // console.log(item);
        // console.log(key);
        this.setState({
            currentKey: key
        });
        // hashHistory.push(key);
    };

    renderMenuList=(menuList) => {
       return  menuList.map((item) => {
            if(item.children){
                return (
                    <SubMenu title={item.title} key={item.key}>
                        {this.renderMenuList(item.children)}
                    </SubMenu>
                )
            }
            return (<Menu.Item key={ '/admin'+item.key } title={item.title}><NavLink to={'/admin'+item.key}></NavLink>{ item.title }</Menu.Item>)
        })
    }

    render(){
        return (
            <div className="nav-left-wrap">
                <div className="logo">
                    <img src={logo_img}  alt="" />
                    <span className="logo-span">E-bike</span>
                </div>
                <Menu
                    className="nav-left"
                    theme='dark'
                    mode="vertical"
                    defaultSelectedKeys={['/home']}
                    onClick={this.handleClick}
                >
                    {this.state.menuItems}
                </Menu>
            </div>

        )
    }
}