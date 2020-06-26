const Router = require('express').Router()
const Contr = require('./../2.controller/venues')

Router.get('/users/:id',Contr.getDataVenueByUsersId)
Router.get('/:id',Contr.getDataVenueById)
Router.delete('/:id',Contr.deleteVenuesById)
Router.post('/:id',Contr.postNewVenue)
Router.patch('/:id',Contr.EditDataVenue)



module.exports= Router