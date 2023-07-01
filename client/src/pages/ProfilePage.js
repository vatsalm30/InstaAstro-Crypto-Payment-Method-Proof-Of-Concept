import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Web3 from "web3";
import TitlebarImageList from '../components/ImagePanel';
import {getTokenURI, getTokenCounter, getNFTMinter} from '../components/Web3Client';

const ProfilePage = () => {

    const [account, setAccount] = useState()
    const [balance, setBalance] = useState()
    const [NFTImageData, setNFTImageData] = useState([]);
    const [loadSite, setLoadSite] = useState(false);
    const tokensArray = []

    const navigate = useNavigate();

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


    useEffect(() => {
        if (typeof window.ethereum !== 'undefined') {
          // Request the user's accounts from MetaMask
          const web3 = new Web3(window.ethereum);
          window.ethereum.request({ method: 'eth_accounts' })
            .then(async (result) => {
              setAccount(result[0]);
              if(loadSite){
                try{
                    getTokenCounter().then((tokenID) =>{
                        loopOverTokens(tokenID, result[0])
                    }).catch((error) => console.log(error))
                    }
                    catch (err){
                        navigate("/profile")
                    }
              }
              
              const weiBalance = await web3.eth.getBalance(result[0]);
              const ethBalance = web3.utils.fromWei(weiBalance, 'ether');    
              setBalance(ethBalance)
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
                navigate("/profile")
              })
        }
      })

      function fetchTokenURI(tokenID, done) {
        GetTokenURI(parseInt(tokenID)).then(async CID => {
            await fetch(CID.replace("ipfs://", "https://").replace("/metadata.json", ".ipfs.dweb.link/metadata.json")).then(async res => {
                const json = await res.json()
                tokensArray.push(json)
                if(done){
                    setNFTImageData([...NFTImageData, ...tokensArray])
                }
                
            })
            }).catch(error => {
            console.error(error)
        });
    }

    async function loopOverTokens(tokenID, Account){
        for(let i = 1; i<= tokenID; i++){
            GetNFTMinter(i).then(async (Owner)=>{
                if (window.BigInt(Account) == window.BigInt(Owner))            
                    fetchTokenURI(i, i == tokenID && NFTImageData.length == 0);
            }
            )

        }
    }

    const GetTokenURI = (tokenID) => {
        return getTokenURI(tokenID)
    }    
    const GetNFTMinter = (tokenID) => {
        return getNFTMinter(tokenID)
    }

    const ListingRedirect = () => {
        navigate("/listing");
    }
    const HomeRedirect = () => {
        navigate("/");
    }
        
    const MarketPlaceRedirect = () => {
        navigate("/market");
    }

  return (
    <div>
        <h1>Profile</h1>
        <h3>Account: {account}</h3>
        <h3>Ethereum: {balance}</h3>
        <button onClick={()=>HomeRedirect()} className="cta-button">Home</button>
        <button onClick={()=>ListingRedirect()} className="cta-button">ListingPage</button>
        <button onClick={() => MarketPlaceRedirect()} className="cta-button">Market Place</button>
        <TitlebarImageList images={NFTImageData}/>
    </div>
  )
}

export default ProfilePage