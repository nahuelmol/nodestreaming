

const UdpServerHandler = (command, server) => {
	const message = Buffer.from(command); //buffer filled with data

 	const Handler = (err) => {
      if (err) throw err;
  	}

	const UDP_PORT = process.env.UDP_SERVER_PORT;
	const UDP_HOST = process.env.UDP_SERVER_HOST;

  	if(command == 'start'){
    	bmessage = Buffer.from(command)
    	server.send(bmessage, 0, bmessage.length, UDP_PORT, UDP_HOST, Handler);
  	} 
}

module.exports = {
	UdpServerHandler,
}