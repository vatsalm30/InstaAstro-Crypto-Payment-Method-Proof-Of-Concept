import {useState} from 'react'
import { NFTStorage, File } from 'nft.storage'

export const Storage = () => {

    const [nftImage, setNFTImage] = useState(new Blob())
    const [imageURL, setImageURL] = useState("")
    const [nftURL, setNFTURL] = useState("")

    const NFT_STORAGE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEYyODM3YUM2MjJDYTk1NTBEQzBmODM0MWE5OGZGNkIzQUYwMWM3ODMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3NTAwOTUzNTI0MywibmFtZSI6IlZhbWF6b24gSXBmcyBlbmNvZGluZyJ9.ry07HwNtVi4ciXthBL9HZgcr1kLaRy7PesrRfLeS0BI"
    async function storeNFT(image, name, description) {
        // load the file from disk
        //const image = await fileFromPath(imagePath)
    
        // create a new NFTStorage client using our API key
        const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY })
        
        // call client.store, passing in the image & metadata
        return nftstorage.store({
            image,
            name,
            description,
        }).then(nftIPFS => {
            setNFTURL(nftIPFS.url)
            setImageURL(nftIPFS.data.image.href)
            return nftIPFS;
          })
        .catch(error => console.error(error));
    }

    async function handelSubmit(e){
        e.preventDefault()
        storeNFT(nftImage, "Shark", "Cool Shark Thingy")
        // setImageURL(URL.createObjectURL(nftImage))
        // nftImage.url = URL.createObjectURL(nftImage)
        console.log(nftURL)
        console.log(imageURL)
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
        <input type='submit'></input>
        </form>
        <img src={"ipfs://bafybeib6stchioaqcwtj56df2myzv4a5xfok4f4e5h5cqvymhttwlju6zq/blob"}/>
    </div>
    )
}
