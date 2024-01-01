const express = require('express');
const app = express()

const dgram = require('dgram');

const dotenv = require('dotenv');
dotenv.config();

const udpServer = dgram.createSocket('udp4');

const UDP_SERVER_HOST = process.env.UDP_SERVER_HOST
const UDP_SERVER_PORT = process.env.UDP_SERVER_PORT

const HTTP_UDP_HOST = process.env.HTTP_UDP_SERVER_HOST;
const HTTP_UDP_PORT = process.env.HTTP_UDP_SERVER_PORT;


udpServer.on('message', (msg, rinfo) => {
  console.log(`server got: ${msg} `);
});

udpServer.bind(HTTP_UDP_PORT, () => {
  console.log(`UDP server, listening on ${HTTP_UDP_HOST}:${HTTP_UDP_PORT}`);
});

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