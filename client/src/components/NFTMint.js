import {useState} from 'react'
import {NFTStorage} from 'nft.storage'
import {mintNFT} from './Web3Client'
import "../App.css";

export const NFTMint = () => {

    const [nftImage, setNFTImage] = useState(new Blob())

    const NFT_STORAGE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEYyODM3YUM2MjJDYTk1NTBEQzBmODM0MWE5OGZGNkIzQUYwMWM3ODMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3NTAwOTUzNTI0MywibmFtZSI6IlZhbWF6b24gSXBmcyBlbmNvZGluZyJ9.ry07HwNtVi4ciXthBL9HZgcr1kLaRy7PesrRfLeS0BI"
    async function storeNFT(_image, _name, _description) {
        // load the file from disk
        //const image = await fileFromPath(imagePath)
    
        // create a new NFTStorage client using our API key
        const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY })
        
        // call client.store, passing in the image & metadata

        return nftstorage.store({
          name: _name,
          image: _image,
          description: _description,
        }).then(nftIPFS => {
            MintNFT(nftIPFS.url)
            return nftIPFS;
          })
        .catch(error => console.error(error));
    }

    const MintNFT = (nftURL) => {
        // mintNFT("https://bafkreick4d75t5obnrrah62kynqot3ngpzr273pwa35gyuu337sikljgky.ipfs.nftstorage.link/").then(tx => {
        //   console.log(tx)
        // }).catch(err => {console.log(err)})
    
        // mintNFT("https://bafybeihkwifjq7xglttbvgarfyonjfbcug7jl5ivhpfdzjswhsg6dgoj6a.ipfs.nftstorage.link/").then(tx => {
        //   console.log(tx)
        // }).catch(err => {console.log(err)})
    
        mintNFT(nftURL).then(tx => {
          console.log(tx)
        }).catch(err => {console.log(err)})
        }

    async function handelSubmit(e){
        e.preventDefault()
        const result = await storeNFT(nftImage, "Monkey", "Weird Monkey NFT", resolve => setTimeout(resolve, 3000))
        console.log(result)
    }

    function dataURItoBlob(dataURI) {
        var byteString = atob(dataURI.split(',')[1]);
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: 'image/png' });
      }

    const onGetImage = (e) => {
        var reader = new FileReader();
        reader.onload = function(event) {
        var imageBlob = dataURItoBlob(event.target.result);
        setNFTImage(imageBlob)
        };
        reader.readAsDataURL(e.target.files[0]);
    }

    return (
    <div>
        <form onSubmit={handelSubmit}>
        <input type="file" onChange={onGetImage}></input>
        <input type='Submit' value="Mint" className = "cta-button mint-nft-button"></input>
        </form>
    </div>
    )
}
