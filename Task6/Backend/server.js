const express = require('express')
const app = express()
const cors = require('cors')

const commonRouter = require('./routes/common')
const adminRouter = require('./routes/admin')
const userRouter = require('./routes/user')
const { authUser } = require('./utils/auth')


app.use(cors())
app.use(express.json())
app.use(authUser)
app.use(commonRouter)
app.use('/user',userRouter)
app.use('/admin',adminRouter)


app.listen(4000,'localhost',() => {
    console.log('server is running at port 4000')
})