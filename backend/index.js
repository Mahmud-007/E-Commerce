const express = require('express');
const dotenv =  require('dotenv');
const app = express();

dotenv.config();
app.get('/', (req, res) => {
  res.send('hello web api project');
})

app.listen(process.env.PORT);