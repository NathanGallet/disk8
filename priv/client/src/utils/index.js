import nodeRSA from 'node-rsa';
import nodeAES from 'crypto-js';
import randomAES from 'crypto';

const sizeAES = 256;

const generateRSAKeyPair = (size) => {
    var key = new nodeRSA();
    key.generateKeyPair(size, 65537);
    return key;
},

const generateRSAPublicKey = (generatedKeyPair) => {
    var publicRSAKey = generatedKeyPair.exportKey('components-public');
    return publicRSAKey;
},

const generateAESKey = () => {
    var key = randomAES.randomBytes(sizeAES);
    return key.toString('base64');
},

const encryptAES = (AESKey, RSAPubKey) => {
    var publicKey = new nodeRSA();
    publicKey.importKey(RSAPubKey);
    var encryptedAES = publicKey.encrypt(AESKey, 'base64');
    return encryptedAES;
},

const decryptAES = (AESCypher, RSAPrivKey) => {
    var plainAES = RSAPrivKey.decrypt(AESCypher, 'utf8');
    return plainAES;
},

const encryptMessage = (message, key) => {
    var encrypted = nodeAES.AES.encrypt(message, key).toString();
    return encrypted;
},

const decryptMessage = (message, key) => {
    var decrypted = nodeAES.AES.decrypt(message.toString(), key);
    decrypted = decrypted.toString(nodeAES.enc.Utf8);
    return decrypted;
}

module.exports = {
    generateRSAKeyPair,
    generateRSAPublicKey,
    generateAESKey,
    encryptAES,
    decryptAES,
    encryptMessage,
    decryptMessage
}
