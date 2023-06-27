import React, { memo, useState } from 'react'
import {mintNFT, getTokenURI, getTokenCounter} from './Web3Client'
import "../App.css"

function ListingPage() {
    const [imageURI, setImageURI] = useState("")
    const [IPFSURI, setIPFSURI] = useState("https://bafkreick4d75t5obnrrah62kynqot3ngpzr273pwa35gyuu337sikljgky.ipfs.nftstorage.link/")
    const [lastToken, setLastToken] = useState()
    const [photoData, setPhotoData] = useState("")
  
    const MintNFT = () => {
      // mintNFT("https://bafkreick4d75t5obnrrah62kynqot3ngpzr273pwa35gyuu337sikljgky.ipfs.nftstorage.link/").then(tx => {
      //   console.log(tx)
      // }).catch(err => {console.log(err)})
  
      // mintNFT("https://bafybeihkwifjq7xglttbvgarfyonjfbcug7jl5ivhpfdzjswhsg6dgoj6a.ipfs.nftstorage.link/").then(tx => {
      //   console.log(tx)
      // }).catch(err => {console.log(err)})
  
      mintNFT(photoData).then(tx => {
        console.log(tx)
      }).catch(err => {console.log(err)})
  
      console.log(getTokenCounter())
    }
  
    const GetTokenURI = (tokenID) => {
      return getTokenURI(tokenID);
    }
  
  
    function fetchTokenURI() {
      getTokenCounter().then(res =>{
        setLastToken(res)
      });
      console.log(lastToken)
      GetTokenURI(lastToken).then(res =>{
        setImageURI(res)
        console.log(imageURI)
      });
    }
  
    const mintNftButton = () => {
      return (
        <button onClick={MintNFT} className='cta-button mint-nft-button'>
          Mint NFT
        </button>
      )
    }

    const handelSubmit = (e) => {
      e.preventDefault();
      
      MintNFT();
    }
  
    const showNFTButton = () => {
      return (
        <button onClick={fetchTokenURI} className='cta-button show-nft-button'>
          Show NFT
        </button>
      )
    }
  
    const hideNFTButton = () => {
      return (
        <button onClick={() => setImageURI("")} className='cta-button hide-nft-button'>
          Hide NFT
        </button>
      )
    }

    async function storeImageNFT(id, image, content_type, name, description){
      var image_blob = Blob([image], {type: content_type})

      const nft = {
        image: image_blob,
        name: name,
        description: description
      }
    }

    const showImage = async (e) => {
      e.preventDefault()
      const reader = new FileReader()
      reader.onload = async (e) => { 
        const text = (e.target.result)
        console.log(text)
        setPhotoData(text)
      };

    // reader.readAsText(e.target.files[0])
    reader.readAsDataURL(e.target.files[0])
    console.log(photoData)
  }

  return (
    <div className='main-app'>
        <h1>DEPRECIATED</h1>
        {/* {mintNftButton()} */}
        {showNFTButton()}
        {hideNFTButton()}
        <img src={imageURI}/>

        <form onSubmit={handelSubmit}>
          <input type="file" onChange={(e) => showImage(e)}></input>
          <input type="submit"></input>
        </form>
        {/* <img src={photoData}/> */}
    </div>
  )
}

export default ListingPage