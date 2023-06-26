import "./App.css";

import { useEffect } from 'react';

import {init} from './components/Web3Client'

import { NFTMint } from "./components/NFTMint";
import { MarketPlace } from "./components/MarketPlace";


function App() {

  useEffect(()=>{init()}, []);

  return (
    <div className='App'>
      <h1>Hello</h1>
      <NFTMint/>
      <MarketPlace/>
      </div>
  )

}

export default App;
