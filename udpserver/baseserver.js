
const path = require('path');
const fs = require('fs');
const server = require('./udpserver.js')

const { TakeFiles, LookForFiles, SendFiles, Call } = require('./filesRoutines.js')

const dotenv = require('dotenv');
dotenv.config();

const hlsDirectory = process.env.HLS_PATH; 

var UDPpacket = {}

var ADDRESS = process.env.UDP_SERVER_HOST
var PORT = process.env.UDP_SERVER_PORT

const isPathValid = (path) => {
  try {
    fs.accessSync(path);
    return true;
  } catch (error) {
    return false;
  }
}


function TakeMessage(msg){
  var warn_msg = 'The HLS path must be reconfigured'

  if (!isPathValid(hlsDirectory)){ return console.log(warn_msg) }

  if(msg == 'start'){

    if(LookForFiles(hlsDirectory)) { 
      TakeFiles(hlsDirectory); 
    } else {
      console.log('there are not files');
    }

  } else if(msg == 'Request data'){
    console.log('working on: ', msg.toString())
  }
}


server.on('error', (err) => {
  console.error(`server error:\n${err.stack}`);
  server.close();
});

server.on('message', (msg, rinfo) => {
  console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
  TakeMessage(msg)
});



server.on('listening', () => {
  var address = server.address()
  console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(PORT, ADDRESS);



