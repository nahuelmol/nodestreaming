const fs = require('fs')
const path = require('path')



const WriteFile = async (Bff, namefile) => {

	const filePath = path.join(__dirname + '/../samples/' + namefile);

	if(namefile.includes('m3u8')){
		console.log('Content of m3u8:')
		console.log(Bff)

	} else {
		fs.writeFile(filePath, Bff, (err) => {
  			if (err) {
    			console.error('Error writing file:', err);
	  		} else {
    			console.log(namefile + ' written successfully!');
  			}
		});
	}
	

}

const WriteStreamingFile = async (Bffcompleto, filename) => {

	WriteFile(Bffcompleto, filename);
}


module.exports = {
	WriteStreamingFile,
}
