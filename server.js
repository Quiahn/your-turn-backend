// IMPORTING PACKAGES
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const db = require('./config/db')
const auth = require('./lib/auth')
const cron = require('node-cron')

// IMPORTING ROUTES
const postRoutes = require('./app/routes/post_routes')
const userRoutes = require('./app/routes/user_routes')

// MIDDLEWARE
const errorHandler = require('./lib/error_handler')
const requestLogger = require('./lib/request_logger')

// DEFINING PORTS
const serverDevPort = 4741
const clientDevPort = 7165

// CONNECTING TO DATABASE
mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

// SCHEDULING
const date = new Date
console.log('Hour', date.getHours(), 'Minute', date.getMinutes(), 'Second', date.getSeconds())
cron.schedule('0 0 0 * * *', function () {
    console.log('RESTARTED');
    mongoose.connection.db.dropCollection('posts')
        .catch(() => console.log('DID\'T WORK'))
});

// DEFINING VARIABLES
const app = express()
const port = process.env.PORT || serverDevPort

// USING MIDDLEWARE
app.use(cors())
app.use(auth)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(requestLogger)

// USING ROUTES
app.use(postRoutes)
app.use(userRoutes)

// ERROR HANDLING
app.use(errorHandler)

// LISTEN
app.listen(port, () => console.log('listening on port ' + port))

// EXPORT
module.exports = app
