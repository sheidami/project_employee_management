const express = require('express');
const cors = require('cors'); 
const mongoose = require("mongoose")
const user = require('./routes/user');
const employee = require('./routes/employee');
const app = express();
const SERVER_PORT = 5000; 

// Middleware JSON parsing
app.use(express.json());
app.use(express.urlencoded())
const DB_CONNECTION_STRING = "mongodb+srv://admin:829682@cluster0.mznpgmx.mongodb.net/comp3123_assignment2?retryWrites=true&w=majority"
mongoose.connect(DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(cors());
app.use('/api/v1/user', user);
app.use('/api/v1/emp', employee);


app.listen(SERVER_PORT, () => {
  console.log(`Server is listening on port ${SERVER_PORT}`);
});

