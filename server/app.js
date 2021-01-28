const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();


// App Config
const app = express();
const port = process.env.PORT || 3000;
const connection_url = "mongodb://db:27017/eu-platform-db";


// Middlewares
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());

// DB config
mongoose
    .connect(connection_url,
        {   useNewUrlParser: true,
            createIndex: true,
            useUnifiedTopology: true
        }
    )
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));

// API Endpoints
app.get('/', (req, res) => res.status(200).send('helloo tiago'));

const usersRouter = require('./routes/users');
const adminRouter = require('./routes/admin');

app.use('/users', usersRouter);
app.use('/admin', adminRouter);

// Listener
app.listen(port, () => {
    console.log('Server running on port ' + port);
})