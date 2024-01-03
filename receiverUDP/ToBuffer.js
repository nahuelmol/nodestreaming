
const BUFFERS = [] 

global.manyBuffers = 1

const BufferReception = (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      BUFFERS.push(data);
      resolve();
    }, 1000);
  });
};

const ReceivedBuffers = async (Bff, buffersXfiles) => {
	await BufferReception(Bff)

	const acumulatedBuffers = Buffer.concat(BUFFERS)

	if(manyBuffers == buffersXfiles){
		console.log('Complete Buffer: ')
		console.log(acumulatedBuffers)
	}

	manyBuffers++;
} 

module.exports = {
	ReceivedBuffers,
}