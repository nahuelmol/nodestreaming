const path = require('path');

const fs = require('fs');
const FSpromise = require('fs').promises;
const server = require('./udpserver.js')

const dotenv = require('dotenv');
dotenv.config();

const Call = (hasFiles) => {
  if (hasFiles) {
    console.log('Files are present in the directory.');
    return true;
  } else {
    console.log('No files found in the directory or an error occurred.');
  }
}

function LookForFiles(dirpath) {
  return FSpromise.readdir(dirpath)
    .then((files) => files.length > 0)
    .catch(() => false);
}

async function TakeFiles (dirpath) {

    async function FilteredFiles (extension) {

      var res = await FSpromise.readdir(dirpath)
                      .then((files) => {
                        return response = files.filter((file) => {
                          //I return the files with the specified extension
                          //sometimes I got twice the extension
                          if(file.includes(extension)){
                            return dirpath + '\\' + file; 
                          } else {
                            return;
                          }})
                      })
                      .catch( err => console.log('err:', err))
      return res;
    }
    
    tsfiles   = await FilteredFiles('.ts')
    m3u8files = await FilteredFiles('.m3u8')
    txtfiles  = await FilteredFiles('.txt')

    if(m3u8files.length > 0 && tsfiles.length > 0) { 
      console.log('.m3u8 and .ts exists')
      SendFiles(dirpath);

    } else if(txtfiles.length > 0) { 
      console.log('.m3u8 and .ts doesnt exists');
      SendFiles(dirpath);
    };
}

async function SendFiles (DIR_PATHs) {

  const HTTP_UDP_HOST = process.env.HTTP_UDP_SERVER_HOST;
  const HTTP_UDP_PORT = process.env.HTTP_UDP_SERVER_PORT;

  const Handler = (err) => {
    if (err) {
      console.error('Error sending file:', err);
    } else {
      console.log('File sent successfully');
    }
  }

  fs.readdir(DIR_PATH, (err, files) => {

    if (err) { return console.log('Error reading directory')};

    const HandlerMSG = (err) => {
      if (err) throw err;
    }

    let filecounter = 0

    files.forEach(file => {


      filepath = DIR_PATH + '\\\\' + file


      if(filepath.includes('.ts') || filepath.includes('.m3u8')){

        const fileBuffer = fs.readFileSync(filepath);
        const FileNameBuffer = Buffer.from(file, 'utf-8');

        const MTU = 1500;
        const packetDataSize = MTU - (FileNameBuffer.length + 4);

        let buffer_counter = 0;
        //then fileBuffer is divided in 1500, to know how many buffers represent that file
        //instead of ding the division, we go through fileBuffer each 1500, it's sampling
        for (let i = 0; i < fileBuffer.length; i += packetDataSize) {

          var IdentifierBuffer = Buffer.alloc(2);
          IdentifierBuffer.writeUInt16BE(buffer_counter);

          var FilenamesizeBuffer = Buffer.alloc(2);
          FilenamesizeBuffer.writeUInt16BE(FileNameBuffer.length)

          if(fileBuffer.length < packetDataSize){

            const packet = Buffer.concat([IdentifierBuffer, FilenamesizeBuffer, FileNameBuffer, fileBuffer]);
            server.send(packet, 0, packet.length, HTTP_UDP_PORT, HTTP_UDP_HOST, HandlerMSG);

          }else{
            const packetdata = fileBuffer.slice(i, i + packetDataSize);
            const packet = Buffer.concat([IdentifierBuffer, FilenamesizeBuffer, FileNameBuffer, packetdata]);

            server.send(packet, 0, packet.length, HTTP_UDP_PORT, HTTP_UDP_HOST, HandlerMSG);
          }
          

          buffer_counter++;
        }
        console.log('file:', file)

      } 

      filecounter++;
    });
  })}


module.exports = {
  LookForFiles,
  SendFiles,
  TakeFiles,
  Call,
}
