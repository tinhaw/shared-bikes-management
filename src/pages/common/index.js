import React,{ Component } from 'react'
import Header from '../../components/header'

export default class Common extends Component {

    constructor(){
        super();
        this.state={
            userName:"牛魔王的主人"
        }
    }

    render(){
        return(
            <div>
                <Header navType="primary" userName={this.state.userName}/>
                {this.props.children}
            </div>
        )
    }
}