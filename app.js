const express = require('express');
const app = express();

const dgram = require('dgram');
const udpServer = dgram.createSocket('udp4');

const dotenv = require('dotenv');
dotenv.config();


const { ReceivedBuffers } = require('./receiverUDP/ToBuffer');
const { WriteStreamingFiles } = require('./receiverUDP/ToBuffer');

const UDP_SERVER_HOST = process.env.UDP_SERVER_HOST
const UDP_SERVER_PORT = process.env.UDP_SERVER_PORT

const HTTP_UDP_HOST = process.env.HTTP_UDP_SERVER_HOST;
const HTTP_UDP_PORT = process.env.HTTP_UDP_SERVER_PORT;

global.counterFile = 0
global.counterBuffer = 0


udpServer.on('message', (msg, rinfo) => {

  const startfile = msg.toString('utf-8').startsWith('startfile')
  const endfile = msg.toString('utf-8').startsWith('endfile')


  if(startfile){
    
    console.log('\nBuffers received:', counterBuffer)
    console.log('Files received:' , counterFile)

    console.log(msg.toString());
    
    counterFile++;
    counterBuffer = 0;

  } else if(endfile){
    console.log(msg.toString());
  } else {

    console.log('Buffer -> ', counterBuffer , ', size -> ', msg.length , ' bits');

    if(msg.length < 20) {
      console.log('lttle buffer -> ', msg.toString('utf-8'))
    }

    counterBuffer++;
  }


  //let buffer = Buffer.alloc(0)
  //buffer = Buffer.concat([buffer, msg]) 
});

udpServer.bind(HTTP_UDP_PORT, () => {
  console.log(`UDP server, listening on ${HTTP_UDP_HOST}:${HTTP_UDP_PORT}`);
});

app.get('/', (req, res) => {

  res.send('Main page')
})

app.get('/processdata/:id', (req, res) => {

	var command = req.params.id
  const message = Buffer.from(command); //buffer filled with data

  udpServer.send(message, 0, message.length, UDP_SERVER_PORT, UDP_SERVER_HOST, (err) => {
    if (err) {
      console.error(`Error sending UDP message: ${err.message}`);
      res.status(500).send('Internal Server Error');
    } else {
    	console.log(`sent to ${UDP_SERVER_HOST}:${UDP_SERVER_PORT}`)
      res.send('Request sent to UDP server');
    }
  });

});

module.exports = app;