import {useState, useEffect} from 'react';
import {getTokenURI, getTokenCounter} from '../components/Web3Client';
import TitlebarImageList from '../components/ImagePanel';
import { useNavigate } from "react-router-dom";

export const MarketPlacePage = () => {
    const [NFTImageData, setNFTImageData] = useState([]);
    const tokensArray = []
    const navigate = useNavigate();

    useEffect(()=>{
        try{
            getTokenCounter().then((tokenID) =>{
                loopOverTokens(tokenID)
            }).catch((error) => console.log(error))
        }
        catch (err){
            navigate("/")
        }
    }, [])

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

    async function loopOverTokens(tokenID){
        for(let i = 1; i<= tokenID; i++){
            await fetchTokenURI(i, i==tokenID && NFTImageData.length == 0);
        }
    }

    const GetTokenURI = (tokenID) => {
        return getTokenURI(tokenID)
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

  return (
    <div>
        <button onClick={()=>HomeRedirect()} className="cta-button">Home</button>
        <button onClick={()=>ListingRedirect()} className="cta-button">ListingPage</button>
        <button onClick={() => ProfilePageRedirect()} className="cta-button">Profile</button>
        <TitlebarImageList images={NFTImageData}/>
    </div>
  )
}
