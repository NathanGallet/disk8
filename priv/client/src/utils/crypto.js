import * as OpenPGP from 'openpgp';

import { keyPairCreated } from '../actions/authentification';

class CryptedDisk8 {

    generateKeys(name, password) {
        const options = {
            userIds: [{ pseudo: name}],
            numBits: 2048, // RSA key size
            passphrase: password // protects the private key
        };

        return new Promise((resolve, reject) => {
            OpenPGP
                .generateKey(options)
                .then((key) => {
                    const private_key = key.privateKeyArmored;
                    const public_key  = key.publicKeyArmored;
                    const keys        = {
                        private_key,
                        public_key
                    };

                    resolve(keys);
                })
        })
    }

    async encryptMessage(message, private_key, public_key, password) {

        const privKeyObj = (await OpenPGP.key.readArmored(private_key)).keys[0]
        const options    = {
            message: OpenPGP.message.fromText(message),                   // input as Message object
            publicKeys: (await OpenPGP.key.readArmored(public_key)).keys, // for encryption
            privateKeys: [privKeyObj]                                     // for signing (optional)
        }

        return new Promise((resolve, reject) => {
            OpenPGP
                .encrypt(options)
                .then( ciphertext => resolve(ciphertext.data) )
        })
    }

    /* async descryptMessage() {

     * } */
}


export default new CryptedDisk8()
