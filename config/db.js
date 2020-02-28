// for connection with mongoose
const mongoose = require('mongoose');

// we want to able that string that we put inside the default.json 
const config = require('config');

// now to get the value read(config gets all the value which is in mongoURI verible(default.json file) )
const db = config.get('mongoURI');

// we need to call with server.js
// so we create ascyn arrow function 
const connectDB =  async () => {
    try{
        // making a promiss (wait for connection)
        await mongoose.connect(db, { useNewUrlParser: true } ); // we also run without true (but it show warning)
        
        console.log("MongoDB connected..")
    }catch(err) {
        //err have message property
        console.log(err.message);
        // Exit process with failure 
        process.exit(1)
    }
}

// exporting connectDB function as a module
module.exports = connectDB;