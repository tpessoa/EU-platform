const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

// connect to MongoDB
mongoose
    .connect(
        'mongodb://db:27017/eu-platform-db',
        {   useNewUrlParser: true,
            useUnifiedTopology: true
        }
    )
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));

app.get('/', (req, res) => res.send('helloo tiago'));

const port = 3000;
app.listen(port, () => {
    console.log('Server running on port ' + port);
})