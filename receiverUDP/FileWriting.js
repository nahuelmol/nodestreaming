const fs = require('fs')
const path = require('path')

const WriteFile = async (FileBff, namefile) => {

	const filePath = path.join(__dirname + '/../samples/' + namefile);

	fs.writeFile(filePath, FileBff, (err) => {
  		if (err) {
    		console.error('Error writing file:', err);
  		} else {
    		console.log('File written successfully!');
  		}
	});

}


const WriteStreamingFile = async (BUFFER, namefile) => {

	WriteFile(BUFFER, namefile);

}


module.exports = {
	WriteStreamingFile,
}
