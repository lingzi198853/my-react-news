import React from 'react';
import { Row, Col, Tabs,Carousel } from 'antd';
import PCNewsBlock from './pc_news_block';
import PCNewsImageBlock from './pc_news_image_block';
const TabPane = Tabs.TabPane;

export default class PCNewsContainer extends React.Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      autoplay: true
    };
    return (
      <div>
        <Row>
          <Col span={2}></Col>
          <Col span={20} class="container">
            <div className="leftContainer">
              <div className="carousel">
                <Carousel {...settings}>
                  <div><img src="./src/images/carousel_1.jpg" alt=""/></div>
                  <div><img src="./src/images/carousel_2.jpg" alt=""/></div>
                  <div><img src="./src/images/carousel_3.jpg" alt=""/></div>
                  <div><img src="./src/images/carousel_4.jpg" alt=""/></div>
                </Carousel>
              </div>
              <PCNewsImageBlock count={6} type="guoji" width="400px" carTitle="国际头条" imageWidth="112px"/>
            </div>
            <Tabs className="tabs_news">
              <TabPane tab="新闻" key="1">
                <PCNewsBlock count={22} type="top" width="100%" borderd="false"></PCNewsBlock>
              </TabPane>
            </Tabs>
            <div>
              <PCNewsImageBlock count={7} type="guonei" width="100%" cartTitle="国内新闻" imageWidth="132px"/>
              <PCNewsImageBlock count={14} type="yule" width="100%" cartTitle="娱乐新闻" imageWidth="132px"/>
            </div>
          </Col>
          <Col span={2}></Col>
        </Row>
      </div>
    )
  }
}