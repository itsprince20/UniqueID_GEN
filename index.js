const express = require("express");

// const uuid = crypto.randomUUID()
// console.log("uuid",uuid);
// const uuid1 = crypto.randomInt(100000);
// console.log("uuid1",uuid1);
const cors = require("cors");
const app = express();
// const requestIp = require('request-ip');
app.use(cors({ origin: true }));
// app.use(requestIp.mw())



app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const route = require('./routes/routes');

app.use('/',route);


app.listen(8080,()=>{
    console.log("Listening on 8080");
})