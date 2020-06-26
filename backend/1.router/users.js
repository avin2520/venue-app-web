const Router = require('express').Router()
const Contr = require('./../2.controller/users')


Router.patch('/:id' , Contr.postCompleteProfile)
Router.get('/:id' , Contr.getUsersById)
Router.get('/' , Contr.getAllDataUsers)
Router.patch('/delete/:id' , Contr.deleteUsersById)




module.exports= Router