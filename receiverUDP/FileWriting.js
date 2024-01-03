const fs = require('fs')
const path = require('path')

const WriteTXT = async (CompleteBff) => {

	const filePath = path.join(__dirname + '/../samples/logs.txt');

	fs.writeFile(filePath, CompleteBff, (err) => {
  		if (err) {
    		console.error('Error writing file:', err);
  		} else {
    		console.log('File written successfully!');
  		}
	});

}

const WriteFS = async () => {



}

const WriteM3U8 = async () => {

}

const WriteStreamingFiles = async (BUFFER, typefile) => {

	if(typefile == 'txt'){

		WriteTXT(BUFFER);

	} else if (typefile == 'fs'){

		WriteFS(BUFFER);

	} else if (typefile == 'm3u8'){

		WriteM3U8(BUFFER);

	} else {

	}
}


module.exports = {
	WriteStreamingFiles,
}
