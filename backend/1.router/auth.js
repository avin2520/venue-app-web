const Router = require('express').Router()
const Contr = require('./../2.controller/auth')

Router.get('/', (req,res) => res.send('<h1>Router Auth</h1>'))
Router.patch('/verify/:token', Contr.verify)
Router.post('/register' , Contr.register )
Router.post('/login' , Contr.login )
Router.post('/test-nodemailer' , Contr.testNodemailer )


module.exports= Router