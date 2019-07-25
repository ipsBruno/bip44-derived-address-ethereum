const bitcore = require('bitcore-lib');
const pubToAddress = require('ethereumjs-util').pubToAddress
const ec = require('elliptic').ec('secp256k1');


var seed = 'xprvseedstring......'


function getAddress(seed, derivepath) {
	let key = new bitcore.HDPrivateKey(seed);
	let derived = key.derive(derivepath);
	let publicJson = ec.keyFromPublic(derived.publicKey.toBuffer()).getPublic().toJSON();

	let pub1 = Buffer.from(publicJson[0].toArray());
	let pub2 = Buffer.from(publicJson[1].toArray());

	let address = pubToAddress(Buffer.concat([
		Buffer.concat([Buffer.from(Array(32 - pub1.length > 0 ? 32 - pub1.length : 0).fill(0)), pub1]),
		Buffer.concat([Buffer.from(Array(32 - pub2.length > 0 ? 32 - pub2.length : 0).fill(0)), pub2])
	]));

	return '0x' + address.toString('hex');
}

function getPrivateKey(seed, derivepath) {
	let key = new bitcore.HDPrivateKey(seed);
	let derived = key.derive(derivepath);
	return Buffer.concat([Buffer.from(Array(32 - priv.length > 0 ? 32 - priv.length : 0).fill(0)), derived.privateKey.toBuffer()]).toString('hex');
}

/*
 * Get Ethereum Private Key for Index Address 
 */
function getEthPrivate(seed, index) {
	return getAddress(seed, "m/44'/60'/0'/0/" + index);
}

/*
 *  Get Ethereum Ropsten (Testnet) Private Key for Index Address 
 */
function getRopstenPrivate(seed, index) {
	return getAddress(seed, "m/44'/1'/0'/0/" + index);
}

/*
 *  Get Ethereum Public Key for Index Address 
 */
function getEthAddr(seed, index) {
	return getAddress(seed, "m/44'/60'/0'/0/" + index);
}
/*
 *  Get Ethereum Ropsten (Testnet) Public Key for Index Address 
 */
function getRopstenAddr(seed, index) {
	return getAddress(seed, "m/44'/1'/0'/0/" + index);
}




console.log(getEthAddr(seed, 0), getRopstenAddr(seed, 0));
console.log(getEthPrivate(seed, 0), getRopstenPrivate(seed, 0));
