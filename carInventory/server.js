// Imports 
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

//Initialize an express
const app = express()
//JSON middleware to accept json objects from request
app.use(express.json())
app.use(cors())

//Create our server 
const port = 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

//MongoDB Connection
//Hiding password in .env 
const password = process.env.MONGO_PASSWORD

const uri = `mongodb+srv://hannahstanley02:${password}@cluster0.fwhftap.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
console.log(uri)

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

mongoose.connect(uri, clientOptions)
.then(()=>{
    console.log('Connection to mongodb done successfully...')
})
.catch((error)=>{
    console.log('Error connecting to mongodb', error)
})

// Routes
const carRoutes = require('./controllers/carController');
app.use('/api/cars', carRoutes);
