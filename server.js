const app = require('./app.js')
const morgan = require('morgan')

app.use(morgan('tiny'));

app.listen(8000, () => {
  console.log('HTTP listenig 3000');
});
