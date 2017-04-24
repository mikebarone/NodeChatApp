require('./config/config.js');
var express = require('express');
const path = require('path');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT;

var app = express();

// Public folder for site content
app.use(express.static(publicPath));

app.listen(port, () => {
    console.log(`Started up on port ${port}`);
});

