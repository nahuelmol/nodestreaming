
const BUFFERS = [] 

var File = {
	currentFile:'none'
}

var acumulatedBuffers;
global.manyBuffers = 1

const { WriteStreamingFile } = require('./FileWriting.js')

const BufferReception = (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      BUFFERS.push(data);
      resolve();
    }, 1000);
  });
};

const ReceivedBuffers = (Bff) => {

	var BufferID = Bff.readUInt16BE(0);
  	var string_size = Bff.readUInt16BE(2);
  	var filename = Bff.toString('utf-8', 4, 4 + string_size);

	if(filename != File.currentFile){

		if(File.currentFile != 'none'){
			WriteStreamingFile(acumulatedBuffers, filename);
		}
		File.currentFile = filename;
	} 
	
  	var BufferData =  Bff.slice(5 + string_size);

	BufferReception(BufferData)

	acumulatedBuffers = Buffer.concat(BUFFERS)
	//lo que antes era una lista ahora se unifica en un unico buffer
} 

module.exports = {
	ReceivedBuffers,
}