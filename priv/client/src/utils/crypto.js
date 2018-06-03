import Crypto from 'node-forge';
import { isNull } from 'lodash';

import Auth from '../utils/auth';
import { keyPairCreated } from '../actions/authentification';

class CryptedDisk8 {

    // Generate an RSA key pair asynchronously, uses web workers
    // -1 to run a fast core estimator to optimize number of workers
    generateKeys() {
        return new Promise((resolve, reject) => {
            Crypto.pki.rsa.generateKeyPair({bits: 2048, workers: -1}, (err, keypair) => {

                if (!isNull(err)) {
                    reject(err);
                }

                let privateKey = keypair.privateKey;
                let publicKey  = keypair.publicKey;

                let keys = {
                    privateKey,
                    publicKey
                };

                resolve(keys);
            })
        })
    }
}

export default new CryptedDisk8()
