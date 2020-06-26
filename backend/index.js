const express = require('express')
const app = express()
const PORT = 7000
const cors = require('cors')

const db = require('./3.databases/mySql')
const venuesRouter = require('./1.router/venues')
const packagesRouter = require('./1.router/packages')
const authRouter = require('././1.router/auth')
const userRouter =require('././1.router/users')
db.connect()

app.use(express.json())
app.use(cors())


app.use('/venues',venuesRouter)
app.use('/packages',packagesRouter)
app.use('/auth',authRouter)
app.use('/users',userRouter)
app.use('/public' ,express.static('public'))

app.get('/',(req,res)=>{
    res.send('<h1>API for Venue App</h1>')
})







app.listen(PORT,()=>{
    console.log('server running on port ' + PORT)
})