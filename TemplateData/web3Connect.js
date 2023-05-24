
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

const getSubString = (str) => {
  const first4 = str.substring(0, 4);  
  const last4 = str.substring(str.length - 4);  
  const result = first4 + ".." + last4;
  return result;
} 



async function getNftData() { 
  const nftData = [];
  const contract = new web3.eth.Contract(contractABI, contractAddress);  
  const tokens = await contract.methods.tokensOfOwner(web3.currentProvider.selectedAddress).call();
  for (let i=0; i<tokens.length; i++){
    const metadataURL = await contract.methods.tokenURI(tokens[i]).call();
    const metadataJSON = await fetch('http://4.246.227.197:8080/'+metadataURL);
    const metadata = await metadataJSON.json();
    const imageURL = metadata.image;
    nftData.push({
      imageURL : imageURL,
      tokenID: tokens[i]
    });
  }

  return nftData;
}  

