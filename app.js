const express = require('express');
const app = express();

const { UdpServerHandler } = require('./receiverUDP/serverfuncs');
const { ReceivedBuffers } = require('./receiverUDP/ToBuffer');
const { WriteStreamingFiles } = require('./receiverUDP/ToBuffer');
const server = require('./receiverUDP/udpserver')

global.conterFile = 0;
global.counterBuffer = 0;

var File = {
  state:false,
  name:'',
  fileBufferSize:0,
  bufferXfiles:0
}

app.get('/', (req, res) => {

  res.send('Main page')
})


app.get('/processdata/:id', (req, res) => {

	var command = req.params.id

  UdpServerHandler(command, server);

  res.send('staring')

});

module.exports = app;
