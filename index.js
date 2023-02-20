const express = require('express');
const app = express();
const port = 8000;
const dbconnection = require('./db');

dbconnection();

app.get('/', (req, res) => {
    res.send("this is on '/' router");
})
app.use(express.json())
app.use('/api', require('./Routes/CreateUser'));

app.listen(port, () => {
    console.log("server started at port " + port);
})
