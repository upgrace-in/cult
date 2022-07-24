import $ from 'jquery'
import { useEffect } from 'react';

const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');
window.Buffer = window.Buffer || require("buffer").Buffer

function App() {

  // Merkle tree integration
  let proof
  let whitelistAddresses = [
    "0x50A023476C1619979c67725bE45Be8629ab27Ff0",
    "0x2f8F0588BC81aAfA41cB0CC847bd1FE255E3Ec56"
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
          const hexProof = merkleTree.getHexProof(leafNodes[0])
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
    })
  }, [])

  return (
    <div className="App">
    </div>
  );
}

export default App;
