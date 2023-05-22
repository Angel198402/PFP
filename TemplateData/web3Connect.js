
if (window.ethereum) {
  web3 = new Web3(window.ethereum);
  // connect popup

  // window.ethereum.on("accountsChanged", function () {
  //   location.reload();
  // });

}
else {
  alert("Metamask not detected!, Plesae connect to a wallet")
}


//Query Ethereum blockchain for NFT data  

const GetSubString = (str) => {
  const first4 = str.substring(0, 4);  
  const last4 = str.substring(str.length - 4);  
  const result = first4 + ".." + last4;
  return result;
} 


async function getNftData() { 
  // const test = "https://cors-anywhere.herokuapp.com/https://nft.bueno.art/api/contract/bunqwsPH1QYnRyTK2x9SH/chain/1/metadata/30";    
  //   const test1 = await fetch(test);
  //   const rmsi = await test1.json();
  //   console.log(rmsi);  
    
    
  const nftURLs = [];
  const contract = new web3.eth.Contract(contractABI, contractAddress);  
  const tokens = await contract.methods.tokensOfOwner(web3.currentProvider.selectedAddress).call();
  console.log("tokens", tokens);
  for (let i=0; i<tokens.length; i++){
    const metadataURL = await contract.methods.tokenURI(tokens[i]).call();
    const metadataJSON = await fetch('https://cors-anywhere.herokuapp.com/'+metadataURL);
    const metadata = await metadataJSON.json();
    const imageURL = metadata.image;
    nftURLs.push(imageURL);
  }
  return nftURLs;
  // const nftData = await contract.methods.getTokenById(tokenId).call();  
  // return nftData;  
}  

