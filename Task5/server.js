const express = require('express')
const app = express()
const userRouter = require('./routes/users')

app.use(express.json())
app.use('/users',userRouter)

app.listen(4000,(req,res) => {
    console.log(`Server running at port 4000`)
})