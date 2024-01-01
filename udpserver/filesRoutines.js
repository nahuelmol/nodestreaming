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

    async function filteredFiles (extension) {

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
    
    tsfiles   = await filteredFiles('.ts')
    m3u8files = await filteredFiles('.m3u8')
    txtfiles  = await filteredFiles('.txt')

    if(m3u8files.length > 0 && tsfiles.length > 0) { 
      console.log(tsfiles)
      console.log(m3u8files)
      console.log(' exists')
      SendFiles(dirpath, ['.m3u6', '.ts']);

    } else if(txtfiles.length > 0) { 
      console.log('text file exists');
      SendFiles(dirpath, ['.txt']);
    };
}

async function SendFiles (DIR_PATH, aimed_files) {

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

    if (err) {console.log('Error reading directory')};

    files.forEach(file => {
      filepath = DIR_PATH + '\\\\' + file

      if(filepath.includes('.ts') || filepath.includes('.m3u8')){
        const fileBuffer = fs.readFileSync(filepath);
        const packetSize = 1000;

        for (let i = 0; i < fileBuffer.length; i += packetSize) {
        
          const packet = fileBuffer.slice(i, i + packetSize);
          server.send(packet, 0, packet.length, HTTP_UDP_PORT, HTTP_UDP_HOST, (err) => {
            if (err) throw err;
          });

          console.log('sended from the buffered')
      }}
      

      fs.readFile(filepath, 'utf8', (err, data) => {
            if (err) {
              console.error('Error reading file:', err);
              return;}

            server.send(data, 0, data.length, HTTP_UDP_PORT, HTTP_UDP_HOST, Handler);

      })

    })
  })}


module.exports = {
  LookForFiles,
  SendFiles,
  TakeFiles,
  Call,
}