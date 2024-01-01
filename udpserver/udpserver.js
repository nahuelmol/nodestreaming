const dgram = require('dgram');
const server = dgram.createSocket('udp4');

module.exports = server;