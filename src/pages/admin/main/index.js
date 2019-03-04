import React,{ Component } from 'react'
import Home from './home'
import './style.less'

export default class Main extends Component {
    render(){
        return (
            <div className="main-container">
                {/* <Home /> */}
                {this.props.children}
            </div>
        )
    }
}