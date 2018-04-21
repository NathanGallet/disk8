const io = require('socket.io-client');
const colors = require('colors');
const crypto = require('../crypto/crypto');


var nickName;
var currentRoom = null;
var AESKey = null;
var keyPair = null;
var OP = false;
var cryptedAES;
var dataTest = "ceci est une phrase qui ne sert a rien";

var socket = io.connect('http://localhost:1337');


function getRSAPubPriv(){

  var privateKey = crypto.generateRSAKeyPair(512);
  var publicKey = crypto.generateRSAPublicKey(privateKey);

  return {
    private: privateKey,
    public: publicKey
  }

}
function sendMessage(data){
  if(data[0] == '/') //If we have a slash its a command (e.g /join)
    return executeCommand(data.substring(1)); //Call execute command with the command (without the '/')

  data = crypto.encryptMessage(data, AESKey);
  socket.emit('talk', {pseudo: nickName, room: currentRoom ,message: data})
  rl.prompt();
}

function executeCommand(data){
  //Separate command from parameter (e.g join #parki)
  var command = data.split(' ')[0];
  var parameter = data.split(' ')[1];

  switch(command){
    case 'join':
      socket.emit('join',
                  {roomName: parameter,
                    userName: nickName,
                    publicKey: keyPair.public
                  });
      currentRoom = parameter;
      break;
    case 'leave':
      socket.emit('leave', currentRoom);
      currentRoom = null;
      break;
    case 'aesForce':
      socket.emit('aesForce', cryptedAES);
      break;
    case 'sendRSAPublic':
      socket.emit('sendRSAPublic', publicKey);
      break;
    case 'help':
      console.log(publicKey);
      console.log(AESKey);
      console.log(cryptedAES);
      break;
    case 'test':
      socket.emit('test', {data:dataTest, target:parameter, user:nickName});
      break;
  }

  rl.prompt();
}

function displayMessage(data){
  var pseudo = data.pseudo;
  var message = data.message;
  var color;

  //Compute a random hash for the pseudo
  var sum = 0;
  for(var i = 0; i < pseudo.length; i++) sum += pseudo.charCodeAt(i);

  switch(sum % 6){
    case 0:
      color = 'red'
      break;
    case 1:
      color = 'green'
      break;
    case 2:
      color = 'blue'
      break;
    case 3:
      color = 'magenta'
      break;
    case 4:
      color = 'cyan'
      break;
    case 5:
      color = 'gray'
      break;
  }
  colors.setTheme({
    pseudoColor: color
  })
  console.log( colors.pseudoColor(pseudo) + ': ' + message);
}

//When the client is launched, we need to have a nick name then send it to the server
rl.question("Please, tell me your name, and don't forget to follow the white rabbit...", function(name) {
  //add easter eggs if the name is Neo :D
  nickName = name;
  var message = nickName + " has enter to NyanChat";
  // socket.emit ('add user', {msg : message, pk: publicKey, pseudo: nickName});

  console.log('Generating RSA Keypair...');
  keyPair = getRSAPubPriv();
  console.log('Done.');

  rl.prompt();
});

rl.on('line', function(data){sendMessage(data);} )

//display the message for all users
socket.on('welcome', function(data){
  console.log( colors.yellow(data.message) );
  rl.prompt();
});

socket.on('message', function(data){
  data.message = crypto.decryptMessage(data.message, AESKey);
  displayMessage(data);
  rl.prompt();
});
//Message from the server and for you only <3
socket.on('serverInfo', function(message){
  console.log(colors.yellow(message) )
  rl.prompt();
});
//Force to get aes key from another client, function to test crypto
socket.on('aesForce', function(data){
  cryptedAES = data.aesForce;
  AESKey = crypto.decryptAES(cryptedAES, privateKey);
  rl.prompt();
});
// Use to send RSA public key to others, in the futur, it needs to be one user only
socket.on('sendRSAPublic', function(data){
  publicKey = data.sendRSAPublic;
  cryptedAES = crypto.encryptAES(AESKey, publicKey);
  rl.prompt();
});

socket.on('youAreTheOP', function(){
  //Some display
  console.log(colors.yellow('You are the OP. Congratulation.') )

  //Set OP to true
  OP = true;

  //Generate AES key
  AESKey = crypto.generateAESKey();
  console.log(colors.yellow('AES key generated') )

});

socket.on('plzEncryptAES', function(user){
  console.log('In PzlEncryptAES');
  if( !OP )
    return; //Let's move on if we are not the OP

  console.log(colors.red('Encryping AES for a ' + user.name) );
  var cypher = crypto.encryptAES(AESKey, user.key);
  socket.emit('hereIsEncryptedAES', {user: user, encryptedAES: cypher});
  console.log(colors.red('Done') )

});

socket.on('encryptedAES', function(message){

  console.log( colors.red('Decrypting recieved AES key...'));
  AESKey = crypto.decryptAES(message.encryptedAES, keyPair.private);

  console.log( colors.red('Done.'));
});
