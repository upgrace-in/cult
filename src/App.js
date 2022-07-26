import $ from 'jquery'
import { useEffect } from 'react';

const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');
window.Buffer = window.Buffer || require("buffer").Buffer

function App() {

  // Merkle tree integration
  let proof
  const whitelistAddresses = [

    "0x1f9E9d8420387D6B8e74d71468Ae17b693ec537f",
    "0x17AeCDc3FeD98beAc7629C78849c4444a0a2075b",
    "0xDBf643Dd9EBc85B662378B6f0f306e2cbd3BF36d",
    "0x04c63D8c2fc9DD602aeE46F12083af1DdE69C713"

  ]

  const leafNodes = whitelistAddresses.map(addr => keccak256(addr));
  const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });

  // Get the RootHash
  const rootHash = merkleTree.getRoot();

  useEffect(() => {
    $('#WLmint_btn').click(() => {
      const claimingAddress = $('#user_address').text()
      for (var i = 0; i < whitelistAddresses.length; i++) {
        if (claimingAddress === whitelistAddresses[i]) {
          const hexProof = merkleTree.getHexProof(leafNodes[i]) 
          proof = hexProof.toString()
          break
        } else {
          proof = null
        }
      }
      if (proof == null) {
        alert("You are not whitelisted !!!")
      } else {
        $('#hash_proof').html(proof)
        $('#WLmint_btn').off()
      }
      console.log(proof)
    })
  }, [])

  return (
    <div className="App">
    </div>
  );
}

export default App;
