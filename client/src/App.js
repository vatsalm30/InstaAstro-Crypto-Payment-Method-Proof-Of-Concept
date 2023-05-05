import "./App.css";

import { useEffect } from 'react';

import {init} from './components/Web3Client'

import Listing from "./components/listing";
import { Storage } from "./components/Storage";


function App() {

  useEffect(()=>{init()}, []);

  return (
    <div className='App'>
      <h1>Hello</h1>
      {/* <Listing/> */}
      <Storage/>
      </div>
  )

}

export default App;