const db = require('./db');
const express = require('express')
const cors = require('cors')
const app = express()
const port = 5000

db.connectDb();

app.use(express.json());
app.use(cors())

//Routes
app.use('/api/notes', require('./routes/notes'));
app.use('/api/auth', require('./routes/auth'));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})