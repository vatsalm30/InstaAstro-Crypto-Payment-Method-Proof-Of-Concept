import Web3 from "web3";
import SaleTokenContract from "contracts/SaleTokens.json"
import MarketContract from "contracts/Market.json"


let selectedAccount;
let SaleTokenAddress;
let SaleToken;
let Market;
let MarketAddress;
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
    SaleTokenAddress = SaleTokenContract.networks[networkId].address
    MarketAddress = MarketContract.networks[networkId].address
    SaleToken = new web3.eth.Contract(SaleTokenContract.abi, SaleTokenAddress)
    Market = new web3.eth.Contract(MarketContract.abi, MarketAddress)
};

export const mintItems = (itemNum, tokenURI) => {
    return SaleToken.methods.mintItems(itemNum, tokenURI).send({ from: selectedAccount });
}
export const approve = () => {
  return SaleToken.methods.mintItems(MarketAddress, true).send({ from: selectedAccount });
}
export const getTokenURI = (tokenID) => {
  return SaleToken.methods.uri(tokenID).call();
}
export const getTokenCounter = () => {
    return SaleToken.methods.getLastTokenId().call();
}
export const getItemMinter = (tokenID) => {
    return SaleToken.methods.getMinter(tokenID).call();
}

export const listToken = (tokenID, price, stock, searchTerms) => {
    return Market.methods.listToken(SaleTokenAddress, tokenID, price, stock, searchTerms).send({ from: selectedAccount });
}

export const buyToken = (tokenID) => {
  return Market.methods.buyToken(tokenID).send({ from: selectedAccount });
}