import React, { useEffect } from "react";
import {Routes,Route, Link } from "react-router-dom";
import { Layout,Typography,Space } from "antd";
import {Navbar,Exchanges,Homepage,Cryptocurrencies,CryptoDetails,News} from "./components";
import { useDispatch } from "react-redux";
import {fetchCryptoCoins,fetchCryptosLimit,fetchExchanges} from "./store/cryptoSlice"
import {fetchCryptoNews} from "./store/newsSlice"
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCryptoCoins());
    dispatch(fetchCryptosLimit(10));
    dispatch(fetchCryptoNews())
    dispatch(fetchExchanges())

  }, [dispatch]);
  return (
    <div className="app">
  
      <div className="navbar">
         <Navbar/>
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            <Routes>
              <Route path="/" element={<Homepage/>}/>
              <Route path="/exchanges" element={<Exchanges/>}/>
              <Route path="/cryptocurrencies" element={<Cryptocurrencies/>}/>
              <Route path="/crypto/:coinId" element={<CryptoDetails/>}/>
              <Route path="/news" element={<News/>}/>
            </Routes>
          </div>
          
        </Layout>
        <div className="footer" >
         <Typography.Title level={5} style={{color:"white",textAlign:"center"}} >
            CryptoSphere <br/>
            All rights reserved
         </Typography.Title>
         <Space>
          <Link to="/">Home</Link>
          <Link to="/exchanges">Exchanges</Link>
          <Link to="/news">News</Link>

         </Space>
      </div>
      </div>
      
   
    </div>
  )
};

export default App;
