const connectToMongo = require("./db");
connectToMongo();
var cors = require('cors')

const express = require('express');
const app = express();
app.use(express.json());
app.use(cors())

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/note'));

const port = 5000;
app.listen(port,()=>
{
    console.log(`Example app listening on port ${port}`);

})