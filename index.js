const express = require('express');
const bodyParser = require('body-parser');
const alogrouter = require('./algo/router');
const port = process.env.port || 3000;

const app = express();
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.use('/',alogrouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));