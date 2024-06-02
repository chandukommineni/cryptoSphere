import React, { useEffect, useState } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import {Card,Row,Col,Input} from "antd"
import { useSelector } from "react-redux";
import Loader from "./Loader"
const Cryptocurrencies = ({simplified}) => {
  const cryptocoins=simplified ?useSelector((state)=>state.Data.limitedCryptos.coins): useSelector((state)=>state.Data.coins.coins);
  const [searchTerm,setSearchTerm]=useState("")
  const[cryptos,setCryptos]=useState([])
  useEffect(()=>{
       const filterData=cryptocoins?.filter((coin)=>coin.name.toLowerCase().includes(searchTerm.toLowerCase()))
       setCryptos(filterData)
  },[cryptocoins,searchTerm])
  if (!cryptos){
    return (
      <Loader/>
    )
  }

  return (
    <>
    { !simplified && <div className="search-crypto">
      <Input placeholder="Search CryptoCurrency" onChange={(e)=>{setSearchTerm(e.target.value)}}/>
    </div>
    }
    <Row gutter={[32,32]} className="cryto-card-container">
         {
          cryptos?.map((currency,index)=>{
            return (
              <Col xs={24} sm={12} lg={6} className="crypto-card" key={index}>
                     <Link to={`/crypto/${currency.uuid}`}>
                       <Card 
                       title={`${currency.rank}. ${currency.name}`}
                       extra={<img className="crypto-image" src={currency.iconUrl}/>}
                       hoverable
                       >
                        <p>Price : {millify(currency.price)} USD</p>
                        <p>Price : {millify(currency.price*85)} INR</p>

                        <p>Market Cap: {millify(currency.marketCap)}</p>
                        <p>Daily Change: {millify(currency.change)}</p>



                       </Card>
                     </Link>
              </Col>
            )
          })
         }
    </Row>
    </>
 
  )
};

export default Cryptocurrencies;
