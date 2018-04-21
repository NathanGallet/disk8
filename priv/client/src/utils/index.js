import nodeRSA from 'node-rsa';
import nodeAES from 'crypto-js';
import randomAES from 'crypto';

const sizeAES = 256;

module.exports = {

    generateRSAKeyPair: function(size){
        var key = new nodeRSA();
        key.generateKeyPair(size, 65537);
        return key; //Rsa keyPair
        //Carreful, this return a full key, private and public, do not sent that key to others
    },

    generateRSAPublicKey: function(generatedKeyPair){
        var publicRSAKey = generatedKeyPair.exportKey('components-public');
        return publicRSAKey;
    },

    /**
     * generateAESKey - Should Generate a TRUE random AES key
     * 128/256 bits, it's up to you Chauca ;)
     *
     * @returns {undefined}
     */
    generateAESKey: function(){
        var key = randomAES.randomBytes(sizeAES);
        return key.toString('base64');
    },

    encryptAES: function(AESKey, RSAPubKey){
        var publicKey = new nodeRSA();
        publicKey.importKey(RSAPubKey);

        var encryptedAES = publicKey.encrypt(AESKey, 'base64');

        return encryptedAES;//Encrypted AES Key
    },


    decryptAES: function(AESCypher, RSAPrivKey){

        var plainAES = RSAPrivKey.decrypt(AESCypher, 'utf8');
        return plainAES;//Plain AES Key
    },

    encryptMessage: function(message, key){
        var encrypted = nodeAES.AES.encrypt(message, key).toString();
        return encrypted;
    },

    decryptMessage: function(message, key){

        var decrypted = nodeAES.AES.decrypt(message.toString(), key);
        decrypted = decrypted.toString(nodeAES.enc.Utf8);
        return decrypted;
    }
}

//console.log(module.exports.test(5));
// A partir de la, tout fonctionne, decommente les lignes suivantes pour un exemple d'utilisation, bon courage pour le reste :p
/*console.log("le programme commence");

   var AES = module.exports.generateAESKey();
   //var AES = "ceci est un putain de test du dernier recours".toString('base64');
   console.log('\nclee AES b64: ' + AES);
   var texte = "ceci est mon message a chiffrer";
   var test = module.exports.encryptMessage(texte, AES);
   console.log('\nmessage chiffre : ' + test);
   console.log('\nmessage dechiffre : ' + module.exports.decryptMessage(test, AES));


   var keyRSA = module.exports.generateRSAKeyPair(512);
   var publicKey = module.exports.generateRSAPublicKey(keyRSA);

   var encryptedAES = module.exports.encryptAES(AES, publicKey);

   //console.log('\ncle AES chiffre : ' + encryptedAES);

   var decryptedAES = module.exports.decryptAES(encryptedAES, keyRSA);

   console.log('\nclee AES : ' + decryptedAES);

   var message = module.exports.decryptMessage(test, decryptedAES);

   console.log(message.toString('utf8'));

   console.log('le programme est termine');
 */
