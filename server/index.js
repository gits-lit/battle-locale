const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// to avoid a CORS issue
app.use((req, res, next) => {
    // http://localhost:3000
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// just some default page
app.get('/', (req, res) => res.send("Battle Locale's server :)"));

// set up the API routes
app.use('/api/users', require('./routes/users'));
app.use('/api/game', require('./routes/game'));
app.use('/api/notifications', require('./routes/notifications'));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}.`));