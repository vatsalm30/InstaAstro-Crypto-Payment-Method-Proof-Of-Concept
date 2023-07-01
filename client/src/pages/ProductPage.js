import React, {useEffect, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {getTokenURI} from '../components/Web3Client'

export const ProductPage = () => {
  const navigate = useNavigate()
  const {id} = useParams()

  const [image, setImage] = useState(new Blob())
  const [name, setName] = useState("")
  const [descr, setDescr] = useState("")
  const [loadSite, setLoadSite] = useState(false);

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
      <br></br>
      <button onClick={()=>HomeRedirect()} className="cta-button">Home</button>
      <button onClick={()=>ListingRedirect()} className="cta-button">ListingPage</button>
      <button onClick={() => ProfilePageRedirect()} className="cta-button">Profile</button>
      <button onClick={() => MarketPlaceRedirect()} className="cta-button">Market Place</button>
    </div>
  )
}
