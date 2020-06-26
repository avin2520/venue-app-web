const Router = require('express').Router()
const Contr = require('./../2.controller/packages')

 Router.get('/venues/:id',Contr.getDataPackageByVenueId)
 Router.delete('/:id',Contr.deletePackagesById)
 Router.get('/:id',Contr.getPackageById)
 Router.post('/',Contr.addProduct)
 Router.patch('/:id',Contr.editProduct)


module.exports= Router