const dgram = require('dgram');
const server = dgram.createSocket('udp4');

const { ReceivedBuffers } = require('./ToBuffer')

const HTTP_UDP_PORT = process.env.HTTP_UDP_SERVER_PORT;
const HTTP_UDP_HOST = process.env.HTTP_UDP_SERVER_HOST;

server.on('error', (err) => {
  console.error(`server error:\n${err.stack}`);
  server.close();
});

server.on('message', (msg, rinfo) => {
  ReceivedBuffers(msg)
});

server.on('listening', () => {
  var address = server.address()
  console.log(`UDP listening ${address.address}:${address.port}`);
});

server.bind(HTTP_UDP_PORT, HTTP_UDP_HOST);

module.exports = server;