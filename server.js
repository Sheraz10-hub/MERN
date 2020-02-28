const express = require('express');

// require the module(or function) which is created in db.js file
const connectDB = require('./config/db');

const app = express();

// connect database (calling async function which is created in db.js file)
connectDB();

app.get('/', (req, res) => {
    res.send("API Running")
})

const PORT = process.env.PORT || 5000 

app.listen(PORT, () => {
    console.log(`Server starting at Port ${PORT}`);
});


