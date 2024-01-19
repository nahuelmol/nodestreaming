const dotenv = require('dotenv');
dotenv.config();

const app = require('./app.js')

app.listen(app.get('port'), () => {
  console.log('HTTP listenig '+ app.get('port'));
});

