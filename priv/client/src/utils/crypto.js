import OpenPGP from 'openpgp';
import { isNull } from 'lodash';

import Auth from '../utils/auth';
import { keyPairCreated } from '../actions/authentification';

class CryptedDisk8 {

    generateKeys(name, password) {
        let options = {
            userIds: [{ pseudo: name}],
            numBits: 2048, // RSA key size
            passphrase: password // protects the private key
        };
        return new Promise((resolve, reject) => {
            OpenPGP.generateKey(options)
                   .then((key) => {
                       let private_key = key.privateKeyArmored;
                       let public_key = key.publicKeyArmored;

                       let keys = {
                           private_key,
                           public_key
                       };

                       resolve(keys);
                   })
        })
    }
}


export default new CryptedDisk8()
