import "./App.css";

import { useEffect } from 'react';

import {init} from './components/Web3Client'

import HomePage from "./pages/HomePage";

import { MarketPlacePage } from "./pages/MarketPlacePage";

import ListingPage from "./pages/ListingPage"

import ProfilePage from "./pages/ProfilePage"

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {  
  useEffect(()=>{
    init()
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/market" element={<MarketPlacePage/>}/>
        <Route path="/listing" element={<ListingPage/>}/>
        <Route path="/profile" element={<ProfilePage/>}/>
        <Route path="/*" element={<HomePage/>}/>
      </Routes>
    </BrowserRouter>
  )

}

export default App;
