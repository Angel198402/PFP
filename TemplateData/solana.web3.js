
// import { PublicKey, Connection } from "@solana/web3.js";
const metadataProgramId = new solanaWeb3.PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s");
const TOKEN_PROGRAM_ID = new solanaWeb3.PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA');


async function getUserNFTByMint(wallet, collectionAddress) {  
    
    const connection = new solanaWeb3.Connection("https://api.metaplex.solana.com/", "confirmed");  
    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(new solanaWeb3.PublicKey(wallet)  , { programId: TOKEN_PROGRAM_ID });  
      
    console.log("plesae", tokenAccounts)
    let myNFTs = tokenAccounts.value.filter((account) => account.account.data.parsed.info.tokenAmount.amount == "1" && account.account.data.parsed.info.tokenAmount.decimals == "0");
    console.log("my NFTs ", myNFTs);

    const nftMetadata = []; 
    for (let i = 0; i < myNFTs.length; i++) {  
      const mintPublicKey = new solanaWeb3.PublicKey(myNFTs[i].account.data.parsed.info.mint);
      
      const metadataAccounts = await connection.getProgramAccounts(  
        metadataProgramId,  
        { filters: [{ memcmp: { offset: 32, bytes: mintPublicKey.toBase58() } }] }  
      );  

      console.log(metadataAccounts)
    }  

    return "";
    // return JSON.stringify(images); 
  }

  function fetchImageMetadata(accountInfo) {  
    const METADATA_PREFIX = 'metadata';  
    const buffer = accountInfo.data.slice(METADATA_PREFIX.length);  
    const decoder = new TextDecoder();  
    const json = decoder.decode(buffer);  
    
    // Parse the JSON object and extract the 'image' field 
    console.log(json); 
    const metadata = JSON.parse(json);  
    if (metadata) {  
      return metadata.image;  
    }  
    
    return null;  
  } 


//   async function getMetadata(metadataAddress) {  
//     const connection = new solanaWeb3.Connection(web3.clusterApiUrl("mainnet-beta"));  
//     const metadataInfo = await connection.getAccountInfo(metadataAddress);  
//     const metadata = solanaWeb3.Metadata.fromAccountInfo(metadataInfo);  
//     return metadata;  
// }  




// async function getNFTMetadata(mintAddress) {  
//     const connection = new solanaWeb3.Connection("https://api.metaplex.solana.com/", "confirmed");  
//     const METADATA_PROGRAM_ID = "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s";  
    
//     const metadataAddress = await PublicKey.findProgramAddress(  
//       [Buffer.from(METADATA_PROGRAM_ID), new PublicKey(mintAddress).toBuffer()],  
//       new PublicKey(METADATA_PROGRAM_ID)  
//     );  
//     const metadataAccount = await connection.getAccountInfo(metadataAddress[0], "confirmed");  
    
//     if (metadataAccount) {  
//       const metadata = METADATA_SCHEMA.decodeMessage(metadataAccount.data);  
//       const url = new TextDecoder("utf-8").decode(metadata.data.uri);  
//         return url;
//       // Fetch and parse the external metadata using the url variable  
//     }  
//   }
