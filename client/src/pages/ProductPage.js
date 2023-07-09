import React, {useEffect, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {getTokenURI, approve, listToken, getItemMinter} from '../components/Web3Client'
import Web3 from "web3";

export const ProductPage = () => {
  const navigate = useNavigate()
  const {id} = useParams()

  const [image, setImage] = useState(new Blob())
  const [name, setName] = useState("")
  const [descr, setDescr] = useState("")
  const [loadSite, setLoadSite] = useState(false)
  const [isMinter, setIsMinter] = useState(false)
  const[price, setPrice] = useState()
  const[stock, setStock] = useState()
  const [inputs, setInputs] = useState([]);


  useEffect(() => {
    const onPageLoad = () => {
      setLoadSite(true);
    };

    // Check if the page has already loaded
    if (document.readyState === 'complete') {
      onPageLoad();
    } else {
      window.addEventListener('load', onPageLoad);
      // Remove the event listener when component unmounts
      return () => window.removeEventListener('load', onPageLoad);
    }
  }, []);

  useEffect(()=>{
    if(loadSite){
      try{
        fetchTokenURI(id)

      }
      catch (err){
          navigate("/product/"+id)
      }
    }

    })


    useEffect(() => {
      if (typeof window.ethereum !== 'undefined') {
        // Request the user's accounts from MetaMask
        const web3 = new Web3(window.ethereum);
        window.ethereum.request({ method: 'eth_accounts' })
          .then(async (result) => {
            if(loadSite){
              try{
                getItemMinter(id).then(minter=>{
                  setIsMinter(window.BigInt(minter)==window.BigInt(result[0]))
                })
                  }
                  catch (err){
                      navigate("/product/"+id)
                  }
            }
          })
          .catch((error) => {
            console.error('Error retrieving accounts:', error);
          });
      } else {
        console.error('MetaMask is not installed');
      }
    });

    useEffect(()=>{
      if(typeof window.ethereum != "undefined"){
          window.ethereum.on('accountsChanged', function(){
              navigate("/")
              navigate("/product/"+id)
            })
      }
    })
  

    const addInput = () => {
      setInputs([...inputs, '']);
    };
  
    const handleInputChange = (index, event) => {
      const newInputs = [...inputs];
      newInputs[index] = event.target.value;
      setInputs(newInputs);
    };

  function fetchTokenURI(tokenID) {
      getTokenURI(parseInt(tokenID)).then(async CID => {
          await fetch(CID.replace("ipfs://", "https://").replace("/metadata.json", ".ipfs.dweb.link/metadata.json")).then(async res => {
              const json = await res.json()
              setImage(json["image"].replace("ipfs://", "https://").replace("/blob", ".ipfs.dweb.link/blob"))
              setName(json["name"])
              setDescr(json["description"])
          })
          }).catch(error => {
          console.error(error)
      });
  }

  const changePrice = (e) =>{
    setPrice(e.target.value)
  }

  const changeStock= (e) =>{
    setStock(e.target.value)
  }


  const ListingRedirect = () => {
    navigate("/listing");
  }
  const HomeRedirect = () => {
      navigate("/");
  }
      
  const ProfilePageRedirect = () => {
      navigate("/profile");
  }

  const MarketPlaceRedirect = () => {
    navigate("/market");
  }


  
  return (
    <div>
      <h1>{name}</h1>
      <h4>{descr}</h4>
      <img
            src={`${image}?w=248&fit=crop&auto=format`}
            srcSet={`${image}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={"Ha"}
            loading="lazy"
            className='cta-image'
            draggable="false"
            style={{height:"40%", width:"40%"}}
      />
      <br></br><br></br>
      {isMinter ?(        
        <form onSubmit={console.log()}>
          <label>List Product: </label>
          <br></br>
          <label>Price: </label>
          <input type='number' className='cta-text' onChange={changePrice}/>
          <br></br>
          <label>Stock: </label>
          <input type='number' className='cta-text' onChange={changeStock}/>
          <br></br>
          <label>Search Optimization: </label>
          <div>
          <input type='button' onClick={addInput} value="Add Search Input"/>
          {inputs.map((value, index) => (
            <input
              key={index}
              value={value}
              onChange={(event) => handleInputChange(index, event)}
            />
          ))}
         </div>
          <br></br>
          <input type='submit' value='List Product' className='cta-button'/>
        </form>):(
          <br></br>
        )}
      <br></br>
      <button onClick={()=>HomeRedirect()} className="cta-button">Home</button>
      <button onClick={()=>ListingRedirect()} className="cta-button">ListingPage</button>
      <button onClick={() => ProfilePageRedirect()} className="cta-button">Profile</button>
      <button onClick={() => MarketPlaceRedirect()} className="cta-button">Market Place</button>
    </div>
  )
}
