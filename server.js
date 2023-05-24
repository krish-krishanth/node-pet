const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/userRoutes');


const app = express();
const port = 3000;
const mongoUrl = 'mongodb://127.0.0.1:27017/university';


mongoose.connect(mongoUrl, {useNewUrlParser: true,useUnifiedTopology: true })
    .then(() => {
        console.log('connected to mongoDB');
        app.listen(port, () => {
            console.log(`server is running on http://localhost:${port}`);
        })
    })
    .catch((err) => {
        console.error('Error connecting to mongoDB', error);
    })


//middleware
app.use(express.json());
app.use('/api/users',userRoutes);