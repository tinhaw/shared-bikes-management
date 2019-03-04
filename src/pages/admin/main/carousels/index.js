import React,{Component} from 'react'
import { Card,Carousel } from 'antd'
import './style.less'

export default class Carousels extends Component {
    render(){
        return(
            <div>
                <Card 
                    className={'card-wrap'+' '+'words-carousel-wrap '}
                    title="文字背景轮播图"
                >
                    <Carousel
                        autoplay
                    >
                        <div><h3>学习react</h3></div>
                        <div><h3>学习vue</h3></div>
                        <div><h3>学习anguler</h3></div>
                    </Carousel>
                </Card>
                <Card 
                    className={'card-wrap'+' '+'pics-carousel-wrap '}
                    title="图片背景轮播图"
                >
                    <Carousel
                        autoplay
                    >
                        <div><img  src={require('../../../../static/carousel-img/carousel-1.jpg')} alt="图片无法显示" /></div>
                        <div><img  src={require('../../../../static/carousel-img/carousel-2.jpg')} alt="图片无法显示" /></div>
                        <div><img  src={require('../../../../static/carousel-img/carousel-3.jpg')} alt="图片无法显示" /></div>
                    </Carousel>
                </Card>
            </div>
        )
    }
}
