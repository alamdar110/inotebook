const db = require('./db');
const express = require('express')
const app = express()
const port = 3000

db.connectDb();

app.get('/', (req, res) => {
    res.send('Hello Alamdar!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})