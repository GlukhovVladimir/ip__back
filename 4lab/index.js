const express = require('express')
const port = 3000

const passport = require('passport')
const clientRouter = require('./routes/clientRTS')
const hotelRoomRouter = require('./routes/hotelRoomRTS')
const userRouter = require('./routes/userRTS')
const app = express()
app.listen(port, () => {
    console.log(`Server working on  http://localhost:${port}`)
});


app.use(passport.initialize())
require('./passport')(passport)

app.use(express.json())
app.use('/', clientRouter)
app.use('/', hotelRoomRouter)
app.use('/', userRouter);

