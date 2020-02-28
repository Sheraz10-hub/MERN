const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send("API Running")
})

// process is looking for enviroment port. because when we diploy it to heroKU than its takes their port. 
const PORT = process.env.PORT || 5000 // when env veriabel is set its going to 5000

// we are calling callback function. beacuse we want something when its connects.
app.listen(PORT, () => {
    console.log(`Server starting at Port ${PORT}`);
});


