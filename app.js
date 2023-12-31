const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./routes');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public/js')));

app.use('/', routes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});