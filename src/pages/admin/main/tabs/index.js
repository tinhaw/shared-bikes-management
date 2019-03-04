import React,{ Component } from 'react'
import { Card,Button,Tabs,message } from 'antd'

export default class Tabpanes extends Component {
    constructor(){
        super();
        this.newTabIndex = 1;
        const panes=[
            {
                title:"tab 1",
                content:"tab 1 content",
                key:"1"
            },
            {
                title:"tab 2",
                content:"tab 2 content",
                key:"2"
            },
            {
                title:"tab 3",
                content:"tab 3 content",
                key:"3"
            },
            {
                title:"tab 4",
                content:"tab 4 content",
                key:"4"
            },
            {
                title:"tab 5",
                content:"tab 5 content",
                key:"5"
            },
        ];
        this.state={
            activeKey: panes[2].key,
            panes
        }
    }

    onChange=(activeKey)=>{
        message.info("切换到到页签："+activeKey);
        this.setState({ activeKey });
    }

    onEdit=(targetKey,action)=>{
        this[action](targetKey);
    }

    add = () => {
        const panes = this.state.panes;
        const activeKey = `newTab_${this.newTabIndex++}`;
        panes.push({ title: activeKey, content: 'New Tab Pane', key: activeKey });
        this.setState({ panes, activeKey });
      }
    
    remove = (targetKey) => {
        let activeKey = this.state.activeKey;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
        if (pane.key === targetKey) {
            lastIndex = i - 1;
        }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (lastIndex >= 0 && activeKey === targetKey) {
        activeKey = panes[lastIndex].key;
        }
        this.setState({ panes, activeKey });
    }

    render(){
        const TabPane=Tabs.TabPane;
        return(
            <div>
                <Card
                    className="card-wrap"
                    title="默认页签"
                >
                    <Tabs activeKey={this.state.activeKey}>
                        {
                            this.state.panes.map((pane)=>{
                                return <TabPane tab={pane.title} key={pane.key}>{pane.content}</TabPane>
                            })
                        }
                    </Tabs> 
                </Card>
                <Card
                    className="card-wrap"
                    title="卡片式页签"
                >
                    <Tabs type="card" onChange={ this.onChange } activeKey={this.state.activeKey}>
                        {
                            this.state.panes.map((pane)=>{
                                return <TabPane tab={pane.title} key={pane.key}>{pane.content}</TabPane>
                            })
                        }
                    </Tabs> 
                </Card>
                <Card
                    className="card-wrap"
                    title="新增和关闭页签"
                >
                    <Tabs type="editable-card" onChange={ this.onChange } onEdit={this.onEdit} activeKey={this.state.activeKey}>
                        {
                            this.state.panes.map((pane)=>{
                                return <TabPane tab={pane.title} key={pane.key}>{pane.content}</TabPane>
                            })
                        }
                    </Tabs> 
                </Card>
            </div>
        )
    }
}