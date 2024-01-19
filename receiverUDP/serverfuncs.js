const server = require('./udpserver');

const UdpServerHandler = (command) => {

 	const Handler = (err) => {
	      if (err) throw err;
  	}

	const UDP_PORT = process.env.UDP_SERVER_PORT;
	const UDP_HOST = process.env.UDP_SERVER_HOST;

  	if(command == 'start'){

    		bmessage = Buffer.from(command);
    		server.send(bmessage, 0, bmessage.length, UDP_PORT, UDP_HOST, Handler);

  	} else if (command == 'stop') {
		bmessage = Buffer.from(command);
		server.send(bmessage, 0, bemssage.length, UDP_PORT, UDP_HOST, Handler);
			
	}
}

module.exports = {
	UdpServerHandler,
}
