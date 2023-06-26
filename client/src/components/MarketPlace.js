import {useState, useEffect} from 'react';
import {getTokenURI, getTokenCounter} from './Web3Client';
import TitlebarImageList from './ImagePanel';


export const MarketPlace = () => {
    const [NFTImageData, setNFTImageData] = useState([]);
    const stufArray = []
    
    useEffect(()=>{
        getTokenCounter().then(tokenID =>{
            const startTime = new Date().getTime();
            while (new Date().getTime() - startTime < 3000) {
                // Do nothing and wait for 3 seconds
            }
            loopOverTokens(tokenID)
            console.log(tokenID)
        }).catch((error) => console.log(error))
        console.log("Help")
    }, [])

    function fetchTokenURI(tokenID, done) {
        GetTokenURI(parseInt(tokenID)).then(async CID => {
            await fetch(CID.replace("ipfs://", "https://").replace("/metadata.json", ".ipfs.dweb.link/metadata.json")).then(async res => {
                const json = await res.json()
                stufArray.push(json)
                if(done){
                    setNFTImageData([...NFTImageData, ...stufArray])
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

  return (
    <div>
        <TitlebarImageList images={NFTImageData}/>
    </div>
  )
}
