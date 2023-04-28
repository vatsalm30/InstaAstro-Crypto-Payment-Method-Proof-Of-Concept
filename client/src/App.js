import Web3 from 'web3';
import "./App.css";
import { useEffect, useState } from 'react';
import {init, mintNFT, getTokenURI, getTokenCounter} from './components/Web3Client'
import NFTContract from 'contracts/NFT.json';

function App() {

  useEffect(()=>{init()}, []);
  const [imageURI, setImageURI] = useState("")
  const [IPFSURI, setIPFSURI] = useState("https://bafkreick4d75t5obnrrah62kynqot3ngpzr273pwa35gyuu337sikljgky.ipfs.nftstorage.link/")
  const [lastToken, setLastToken] = useState()

  const MintNFT = () => {
    // mintNFT("https://bafkreick4d75t5obnrrah62kynqot3ngpzr273pwa35gyuu337sikljgky.ipfs.nftstorage.link/").then(tx => {
    //   console.log(tx)
    // }).catch(err => {console.log(err)})

    // mintNFT("https://bafybeihkwifjq7xglttbvgarfyonjfbcug7jl5ivhpfdzjswhsg6dgoj6a.ipfs.nftstorage.link/").then(tx => {
    //   console.log(tx)
    // }).catch(err => {console.log(err)})

    mintNFT("https://bafkreick4d75t5obnrrah62kynqot3ngpzr273pwa35gyuu337sikljgky.ipfs.nftstorage.link/").then(tx => {
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

  

  const mintNftHandler = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {

        // Get network provider and web3 instance.
        const web3 = await new Web3(Web3.givenProvider || 'http://localhost:7545');

        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();

        console.log("Network: ", await web3.eth.net.getId());
        const NFTContractAddress = NFTContract.networks[await web3.eth.net.getId()].address;
        const abi = NFTContract.abi;

        // Create a contract instance
        const nftContract = new web3.eth.Contract(abi, NFTContractAddress);
        console.log(nftContract);
        console.log("Initialize payment");

        let nftTxn = await nftContract.methods.safeMint("https://bafybeihkwifjq7xglttbvgarfyonjfbcug7jl5ivhpfdzjswhsg6dgoj6a.ipfs.nftstorage.link/").send({ from: accounts[0]}).on('receipt', function () {
          console.log('receipt')
        });

        let tokenURI = nftContract.methods.tokenURI(1).call()
        console.log(tokenURI)

        console.log("Mining...please wait");
        console.log("Mined: ", nftTxn.transactionHash);

      }

    } catch (err) {
      console.log(err);
    }
  }

  const mintNftButton = () => {
    return (
      <button onClick={MintNFT} className='cta-button mint-nft-button'>
        Mint NFT
      </button>
    )
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

  return (
    <div className='App'>
      <div className='main-app'>
          {mintNftButton()}
          {showNFTButton()}
          {hideNFTButton()}
          <img src={imageURI}/>
        </div>
      </div>
  )
}

export default App;