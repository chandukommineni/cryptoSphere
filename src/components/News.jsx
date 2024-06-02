import React from "react";
import { Select,Typography,Row,Col,Avatar,Card } from "antd";
import moment from "moment";
import { useSelector } from "react-redux";
import Loader from "./Loader";
const {Text,Title}=Typography
const {Option}=Select
const News = ({simplified}) => {
  const data=useSelector((state=>state.News.data))
  const news=simplified ?data?.slice(0,6):data 
  console.log(news)
  if (!data.length>0) {
    return(
      <Loader/>
    )
  }
   const demoImage="https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News"
  return(
    <Row gutter={[24,24]}>
      {
        news.map((value,i)=>{
         return (
          <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
             <a href={value.url} target="_blank" rel="noreferrer">
                 <div className="news-image-container">
                  <Title className="news-title" level={5}>{value.title}</Title>
                  <img src={value.thumbnail || demoImage} alt="news" width="100px" height="100px"/>
                 </div>
                 <p>
                  {
                    value.description.length>100 ? `${value.description.substring(0,100)}...`:value.description
                  }
                 </p>
                 <div className="provider-container">
                  <div>
                     <Text><b>Posted :</b></Text>
                    <Text>{moment(value.createdAt).startOf("ss").fromNow()}</Text>
                  </div>
                 </div>
             </a>

          </Card>
        </Col>
         )
        })
      }

    </Row>
  )
};

export default News;
