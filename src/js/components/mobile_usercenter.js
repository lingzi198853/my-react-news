import React from 'react';
import MobileHeader from './mobile_header';
import MobileFooter from './mobile_footer';

import {Row,Col,Tabs,Card,Upload,Icon,Modal,Button} from 'antd';
const TabPane = Tabs.TabPane;
export default class PCUserCenter extends React.Component{
  constructor(){
    super();
    this.state = {
      usercollection:'',
      usercomments:''
    }
  }
  componentDidMount(){
    if(!localStorage.userNickName){
      location.href='/'
    }
    var myFetchOptions = {
      method:'GET'
    }
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid="+localStorage.userid,myFetchOptions)
    .then(response=>response.json())
    .then(json=>this.setState({usercollection:json}))

    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=" + localStorage.userid,myFetchOptions)
    .then(response=>response.json())
    .then(json=>this.setState({usercomments:json}))
  }
  logout(){
    localStorage.userid = '';
    localStorage.userNickName = '';
    location.href = '/'
  }
  setPreviewVisible(value){
    this.setState({
      previewVisible:value
    })
  }
  render(){
    const props = {
       action:"http://newsapi.gugujiankong.com/Handler.ashx",
       headers:{
        "Access-Control-Allow-Origin":"*",
       },
       listType:'picture-card',
       defaultFileList:[
        {
          uid:-1,
          name:'XXX.png',
          status:'done',
          url:'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
        }
       ],
       onPreview:(file)=>{
        
        this.setState({
          previewImage:file.url,
          previewVisible:true
        })
       }


    }
    const {usercollection,usercomments} = this.state;
    const usercollectionList = usercollection.length ? 
      usercollection.map((uc,index)=>(
          <Card key={index} title={uc.uniquekey} extra={<a href={`/#/details/${uc.uniquekey}`}>查看</a>}>
            <p>{uc.Title}</p>
          </Card>
        ))
    :
    '你还没有收藏过新闻，快去收藏吧';

    const usercommentsList = usercomments.length ?
        usercomments.map((comment,index)=>(
          <Card key={index} title={`于 ${comment.datetime} 评论了文章 ${comment.uniquekey}`} extra={<a href={`/#/details/${comment.uniquekey}`}>查看</a>}>
            <p>{comment.Comments}</p>
          </Card>
        ))
      :
        '你还没有评论，快去评论吧'
      ;
    return (
      <div>
        <MobileHeader/>
        <Row>
          <Col span={24}>
            <Tabs>
              <TabPane tab='我的收藏列表' key='1'>
                <div className='comment'>
                  <Row>
                    <Col span={24}>
                      {usercollectionList}
                    </Col>
                  </Row>
                </div>
              </TabPane>
              <TabPane tab='我的评论列表' key='2'>
                <div className='comment'>
                  <Row>
                    <Col span={24}>
                      {usercommentsList}
                    </Col>
                  </Row>
                </div>
              </TabPane>
              <TabPane tab='设置' key='3'>
                <div className='clearfix'>
                  <Upload {...props}>
                    <Icon type='plus'/>
                    <div className="ant-upload-text">上传照片</div>
                  </Upload>
                  <Modal visible ={this.state.previewVisible} footer={null}  onCancel={()=>this.setPreviewVisible(false)}>
                    <img alt="预览" width='100%' src={this.state.previewImage}/>
                  </Modal>
                </div>
              </TabPane>
              <TabPane tab='退出' key='4'>
                <Button type='primary' htmlType='button' onClick={this.logout.bind(this)}>退出</Button>
              </TabPane>
            </Tabs>
          </Col>
        </Row>
        <MobileFooter/>
      </div>
    )
  }
}