const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config()
const db = require('./db/db')

const worksRoute = require('./routes/works')

const port = process.env.PORT || 8000

// starting db
db()

// middlewares
app.use(cors())
app.use(express.json())

// works route
app.use('/works', worksRoute)


app.listen(port, () => {
    console.log('server started listening on port: ', port);
})