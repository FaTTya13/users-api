const express = require('express')
const userRouter = require('./routes/user.routes')
const authRouter = require('./routes/auth.routes')
const cors = require('cors')
require('dotenv').config()

const PORT = process.env.PORT || 8080

const app = express()

app.use(cors())
app.use(express.json())
app.use('/users', userRouter)
app.use('/auth', authRouter)

app.listen(PORT, ()=> console.log(`server started on port ${PORT}`))