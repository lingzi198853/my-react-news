import React from 'react';
import {Card} from 'antd';
import {BrowserRouter as Router, Route,HashRouter,hashHistroy, Link, browserHistory} from 'react-router-dom'

export default class PCNewsImageBlock extends React.Component{
  constructor(){
    super();
    this.state = {
      news: ''
    };
  }
    componentWillMount(){
      var myFetchOptions = {
        method: 'GET'
      };
      fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type="+this.props.type+"&count="+this.props.count, myFetchOptions)
        .then(response=>response.json())
        .then(json=>{this.setState({news:json})});
  };
  render(){
    const styleImage = {
      display: "blcok",
      width: this.props.imageWidth,
      height: "90px"
    };
    const styleH3 = {
      width: this.props.imageWidth,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    };
    const {news} = this.state;
    const newList = news.length
    ?
    news.map((newsItem, index)=>(
     <div key={index} class="imageblock">
     <HashRouter>
       <Link to={`details/${newsItem.uniqueky}`} target="_blank">
        <div className="custom-image">
          <img src="" alt="" style={styleImage} src={newsItem.thumbnail_pic_s} />
        </div>
        <div className="custom-card">
          <h3 style={styleH3}>{newsItem.title}</h3>
          <p>{newsItem.author_name}</p>
        </div>
       </Link>
     </HashRouter>
     </div>
      ))
      : '没有加载到任何新闻';

    return(
      <div className="topNewsList">
        <Card title={this.props.cartTitle} bordered={true} style={{width:this.props.width}}>
            {newList}
        </Card>
      </div>
    )
  }
}