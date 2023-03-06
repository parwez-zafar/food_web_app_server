const express = require('express');
const app = express();
const port = 8000;
const dbconnection = require('./db');

dbconnection();
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Reqested-With, Content-Type, Accept",
    );
    next();
})

app.get('/', (req, res) => {
    res.send("this is on '/' router");
})
app.use(express.json())
app.use('/api', require('./Routes/CreateUser'));
app.use('/api', require('./Routes/DisplayFoodItem'));

app.listen(port, () => {
    console.log("server started at port " + port);
})
