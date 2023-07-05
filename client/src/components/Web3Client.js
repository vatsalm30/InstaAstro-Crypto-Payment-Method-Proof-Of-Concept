import Web3 from "web3";
import NFTContract from "contracts/NFT.json"
import MarketContract from "contracts/Market.json"


let selectedAccount;
let NFTADDRESS;
let NFT;
let Market;
export const init = async () => {
    let provider = window.ethereum;

    if(typeof provider !== 'undefined'){
      //metamask is installed

      provider.request({method: "eth_requestAccounts"})
      .then(accounts => {
        selectedAccount = accounts[0]
        // console.log(`Selected account is ${selectedAccount}`);
      })
      .catch(err => {
        console.log(err);
      })
      window.ethereum.on('accountsChanged', function(accounts){
        selectedAccount = accounts[0]
        // console.log(`Selected changed to ${selectedAccount}`);
      })
    }

    const web3 = new Web3(provider);

    const networkId = await web3.eth.net.getId();
    NFTADDRESS = NFTContract.networks[networkId].address
    NFT = new web3.eth.Contract(NFTContract.abi, NFTADDRESS)
    Market = new web3.eth.Contract(MarketContract.abi, MarketContract.networks[networkId].address)
};

export const mintNFT = (tokenURI) => {
    return NFT.methods.safeMint(tokenURI).send({ from: selectedAccount });
}
export const getTokenURI = (tokenID) => {
  return NFT.methods.tokenURI(tokenID).call();
}

export const getTokenCounter = () => {
    return NFT.methods.lastTokenId().call();
  }
export const getNFTMinter = (tokenID) => {
    return NFT.methods.ownerOf(tokenID).call();
  }

export const listToken = (tokenID, price, stock, searchTerms) => {
    return Market.methods.listToken(NFTADDRESS, tokenID, price, stock, searchTerms).send({ from: selectedAccount });
}

export const buyToken = (tokenID) => {
  return Market.methods.buyToken(tokenID).send({ from: selectedAccount });
}