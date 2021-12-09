const express = require('express')
const passport = require('passport')
const app = express()
const PORT = process.env.PORT || 3000

const oauthRouter = require('./Routes/oauth.routes');

app.use(express.json());
app.set('view engine', 'ejs')
app.use(passport.initialize())
require('./Middleware/passport')(passport)

app.use(express.static('views'))

app.use('/', oauthRouter)

app.listen(PORT, () => {
    console.log(`Server is working on http://localhost:${PORT}/main`)
});



