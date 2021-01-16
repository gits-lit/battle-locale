const express = require('express');
const bodyParser = require('body-parser');

// load in environment variables
require('dotenv').config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// to avoid an CORS issue
app.use((req, res, next) => {
    // http://localhost:3000
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res) => res.send("Battle Locale's server :)"));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}.`));