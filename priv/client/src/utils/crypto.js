import nodeRSA from 'node-rsa';
import nodeAES from 'crypto-js';
import randomAES from 'crypto';

import { SIZE_AES } from './config';

class CryptedDisk8 {

    generateRSAKeyPair(size) {
        let key = new nodeRSA();

        return key.generateKeyPair(size, 65537);
    }

    generateRSAPublicKey(generatedKeyPair) {
        return generatedKeyPair.exportKey('components-public');
    }

    generateAESKey() {
        return randomAES.randomBytes(SIZE_AES).toString('base64');
    }

    encryptAES(AESKey, RSAPubKey) {
        let publicKey = new nodeRSA();
        publicKey.importKey(RSAPubKey);

        return publicKey.encrypt(AESKey, 'base64');
    }

    decryptAES(AESCypher, RSAPrivKey) {
        return RSAPrivKey.decrypt(AESCypher, 'utf8');
    }

    encryptMessage(message, key) {
        return nodeAES.AES.encrypt(message, key).toString();
    }

    decryptMessage(message, key) {
        let decrypted = nodeAES.AES.decrypt(message.toString(), key);
        return decrypted.toString(nodeAES.enc.Utf8);
    }
}

export default new CryptedDisk8()
