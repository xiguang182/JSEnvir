const express = require('express');

const app = express();
// import myValue from './compo'
app.use('/', express.static('view'));

app.listen(3000, () => {
  console.log('Listening on port 3000...');
});

