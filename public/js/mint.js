const Web3Modal = window.Web3Modal.default;
const WalletConnectProvider = window.WalletConnectProvider.default;

let web3Modal, hash_proof, provider, web3, contract, user_address, checkInterval

let publicMint = false
var mint_count = 1;
var max_count = 6;
var mint_costs; // Change cost here
var chainId = 4; // should be 4 for rinkeby and 1 for mainnet

var t_address = "0xaD1783051b821D3bb65177aFe68e53e758Dd2cDf"
var t_abi = [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [], "name": "ApprovalCallerNotOwnerNorApproved", "type": "error" }, { "inputs": [], "name": "ApprovalQueryForNonexistentToken", "type": "error" }, { "inputs": [], "name": "ApprovalToCurrentOwner", "type": "error" }, { "inputs": [], "name": "ApproveToCaller", "type": "error" }, { "inputs": [], "name": "BalanceQueryForZeroAddress", "type": "error" }, { "inputs": [], "name": "MintToZeroAddress", "type": "error" }, { "inputs": [], "name": "MintZeroQuantity", "type": "error" }, { "inputs": [], "name": "OwnerQueryForNonexistentToken", "type": "error" }, { "inputs": [], "name": "TransferCallerNotOwnerNorApproved", "type": "error" }, { "inputs": [], "name": "TransferFromIncorrectOwner", "type": "error" }, { "inputs": [], "name": "TransferToNonERC721ReceiverImplementer", "type": "error" }, { "inputs": [], "name": "TransferToZeroAddress", "type": "error" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "approved", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "approved", "type": "bool" }], "name": "ApprovalForAll", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "inputs": [{ "internalType": "uint16", "name": "_mintAmount", "type": "uint16" }, { "internalType": "address", "name": "_receiver", "type": "address" }], "name": "Airdrop", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "MaxMintPublic", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "MaxMintWL", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint16", "name": "_mintAmount", "type": "uint16" }], "name": "OwnerMint", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "PublicCost", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "PublicSalePaused", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint16", "name": "_mintAmount", "type": "uint16" }, { "internalType": "address", "name": "_receiver", "type": "address" }], "name": "Reserve", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "WLCost", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "WLPaused", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "approve", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_tokenID", "type": "uint256" }], "name": "burn", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "getApproved", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "hiddenURL", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "operator", "type": "address" }], "name": "isApprovedForAll", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "maxSupply", "outputs": [{ "internalType": "uint16", "name": "", "type": "uint16" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "ownerOf", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint16", "name": "_mintAmount", "type": "uint16" }], "name": "publicMint", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "reveal", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "bytes", "name": "_data", "type": "bytes" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "operator", "type": "address" }, { "internalType": "bool", "name": "approved", "type": "bool" }], "name": "setApprovalForAll", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "_uriPrefix", "type": "string" }], "name": "setBaseURI", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "_uriPrefix", "type": "string" }], "name": "setHiddenUri", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint8", "name": "_limit", "type": "uint8" }], "name": "setMaxMintPublic", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint8", "name": "_limit", "type": "uint8" }], "name": "setMaxMintWL", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_cost", "type": "uint256" }], "name": "setPublicCost", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "setPublicSalePaused", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "setRevealed", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_cost", "type": "uint256" }], "name": "setWLCost", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "setWLPaused", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "_whitelistMerkleRoot", "type": "bytes32" }], "name": "setWhitelistMerkleRoot", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" }], "name": "supportsInterface", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_tokenId", "type": "uint256" }], "name": "tokenURI", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "transferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "uriPrefix", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "uriSuffix", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "whitelistMerkleRoot", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint8", "name": "_mintAmount", "type": "uint8" }, { "internalType": "bytes32[]", "name": "merkleProof", "type": "bytes32[]" }], "name": "whitelistMint", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]

function init() {

    const providerOptions = {
        walletconnect: {
            package: WalletConnectProvider,
            options: {
                infuraId: "c0db0b85222f4f5c82dd2bed1fc843f9",
            }
        }
    };

    web3Modal = new Web3Modal({
        cacheProvider: false,
        providerOptions,
    });

}

function truncateString(str, length) {
    return str.length > length ? str.substring(0, length - 1) + '.....' : str
}

async function update_supply() {
    // max_supply
    await contract.methods.maxSupply().call().then(function (res, err) {
        if (res) {
            $('#max_supply').html(res)
        }
    });
    await contract.methods.totalSupply().call().then(function (res, err) {
        if (res) {
            $('#total_supply').html(res)
        }
    });
    $("#box-total-count").show()
}

async function update_cost() {
    if (publicMint === false) {
        await contract.methods.WLCost().call().then(function (res, err) {
            if (res) {
                mint_costs = parseFloat(web3.utils.fromWei(res, 'ether'))
                $('#mint_costs').html(mint_costs);
            }
        });
    } else {
        await contract.methods.PublicCost().call().then(function (res, err) {
            if (res) {
                mint_costs = parseFloat(web3.utils.fromWei(res, 'ether'))
                $('#mint_costs').html(mint_costs);
            }
        });
    }
}

async function setting_interval() {
    checkInterval = setInterval(async () => {
        hash_proof = $('#hash_proof').text()
        if (hash_proof !== '') {
            hash_proof = hash_proof.split(',')
            console.log(hash_proof)
            clearInterval(checkInterval)
            // Raise Minting
            await WLMint(mint_costs * mint_count, mint_count, hash_proof)
        }
    }, 500);
}

async function update_publicMint() {
    await contract.methods.WLPaused().call().then(async function (res, err) {
        await contract.methods.PublicSalePaused().call().then(function (res2, err) {
            if ((res !== false) && (res2 !== true)) {
                publicMint = true
                max_count = 6
                mint_count = 1
                $('#mint_count').html(mint_count);
            } else {
                publicMint = false
            }
        });
    });

}

function after_mint(res) {
    if (res) {
        alert("MINTED SUCCESSFULLY!")
    } else {
        alert("MINTING FAILED!")
    }
}

async function WLMint(final_cost, mint_count, hash_proof) {
    var final_wei_Val = (final_cost * Math.pow(10, 18)).toFixedSpecial(0)
    await contract.methods.whitelistMint(String(mint_count), hash_proof)
        .send({
            from: user_address,
            value: final_wei_Val
        }).then(function (res, err) {
            after_mint(res)
        });

}

async function public_Mint(final_cost, mint_count) {
    console.log("publicmint")
    var final_wei_Val = (final_cost * Math.pow(10, 18)).toFixedSpecial(0)
    await contract.methods.publicMint(String(mint_count))
        .send({
            from: user_address,
            value: final_wei_Val
        }).then(function (res, err) {
            after_mint(res)
        });

}

async function switch_network(chainId) {
    await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: web3.utils.toHex(chainId) }]
    });
}

async function do_it_Asside() {

    $('#connect_btn').html('....')

    // update publicmint
    await update_publicMint()

    // update cost
    await update_cost();

    // total supply
    await update_supply();

    $('#connect_btn').hide()

    $('#updation_con').fadeIn()
}

function check() {
    web3.eth.getAccounts().then(async (tx) => {
        if (tx[0] !== undefined) {
            user_address = tx[0]
            alert("Wallet connected !!!")
            $('#mint_link').html('Connected : ' + truncateString(String(user_address), 10));
            // $('#user_address').html('0x1f9E9d8420387D6B8e74d71468Ae17b693ec537f')
            $('#user_address').html(user_address)

            web3.eth.net.getId().then(async (netId) => {
                if (netId === chainId) {

                    await do_it_Asside()

                    if (publicMint === false) {
                        $('#WLmint_btn').show();
                        await setting_interval();
                        setTimeout(() => {
                            $('#WLmint_btn').on('click', async () => {
                                await WLMint(mint_costs * mint_count, mint_count, hash_proof)
                            });
                        }, 2000);
                    } else {
                        $('#Publicmint_btn').show();
                        $('#Publicmint_btn').click(async () => {
                            await public_Mint(mint_costs * mint_count, mint_count)
                        })
                    }

                } else {
                    switch (chainId) {
                        case 1:
                            alert("Connect to ETH mainnet");
                            break;
                        case 4:
                            alert("Connect to Rinkeby");
                            break;
                    }

                    await switch_network(chainId)

                }
            });
        }
    });
}

async function connectweb3() {
    try {
        provider = await web3Modal.connect();
        web3 = new Web3(provider);
        contract = new web3.eth.Contract(t_abi, t_address);
        check()
    } catch (e) {
        console.log("Could not get a wallet connection", e);
        return;
    }

    provider.on("accountsChanged", (accounts) => {
        location.reload();
    });

    provider.on("chainChanged", (chainId) => {
        location.reload();
    });

    provider.on("networkChanged", (networkId) => {
        location.reload();
    });

}

function set_value(type) {
    if (type == 'increase') {
        if (mint_count != max_count) {
            mint_count++;
        }
    } else {
        if (mint_count != 1) {
            mint_count--;
        }
    }
    $('#mint_count').html(mint_count);
}


$(document).ready(() => {
    init();

    $('#connect_btn').click(async () => { await connectweb3(); })

    $('#increase_btn').click(() => { set_value('increase'); })

    $('#decrease_btn').click(() => { set_value('decrease'); })
});



Number.prototype.toFixedSpecial = function (n) {
    var str = this.toFixed(n);
    if (str.indexOf("e+") === -1) return str;

    str = str
        .replace(".", "")
        .split("e+")
        .reduce(function (p, b) {
            return p + Array(b - p.length + 2).join(0);
        });

    if (n > 0) str += "." + Array(n + 1).join(0);

    return str;
};