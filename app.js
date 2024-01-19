const express = require('express');
const app = express();

const { udpserverhandler } = require('./receiverudp/serverfuncs');
const { ReceivedBuffers } = require('./receiverUDP/ToBuffer');
const { WriteStreamingFiles } = require('./receiverUDP/ToBuffer');

const server = require('./receiverUDP/udpserver')
const router = require('./router/router')
const routerApi = require('./router/routerapi')

app.use('/', router)
app.use('/api/', routerApi)
app.use(morgan('tiny'));



module.exports = app;
