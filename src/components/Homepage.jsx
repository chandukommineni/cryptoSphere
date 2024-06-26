import React, { useEffect } from "react";
import millify from "millify";
import { Typography,Row,Col,Statistic } from "antd";
import { Link } from "react-router-dom";
import { useSelector} from "react-redux";
import {Cryptocurrencies,News} from "./index"
import Loader from "./Loader";
const {Title}=Typography
const Homepage = () => {
 

  const stats = useSelector(state => state.Data.coins.stats);

  if (!stats) {
    return <Loader/>
  }

  return (
    <>
      <Title level={2} className="heading">Global Crypto Stats</Title>
      <Row>
        <Col span={12}><Statistic title="Total Cryptocurrencies" value={stats.total} /></Col>
        <Col span={12}><Statistic title="Total Exchanges" value={millify(stats.totalExchanges)} /></Col>
        <Col span={12}><Statistic title="Total Market Cap" value={millify(stats.totalMarketCap)} /></Col>
        <Col span={12}><Statistic title="Total 24h Volume" value={millify(stats.total24hVolume)} /></Col>
        <Col span={12}><Statistic title="Total Markets" value={millify(stats.totalMarkets)} /></Col>
      </Row>
      <div className="home-heading-container">
        <Title level={2} className="home-title">Top 10 Cryptocurrencies in the world</Title>
        <Title level={3} className="show-more"><Link to="/cryptocurrencies">Show More</Link></Title>

      </div>
      <Cryptocurrencies simplified={true}/>
      <div className="home-heading-container">
        <Title level={2} className="home-title">Latest Crypto News</Title>
        <Title level={3} className="show-more"><Link to="/news">Show More</Link></Title>

      </div>
      <News simplified={true}/>
    </>
  );
};

export default Homepage;