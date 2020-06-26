const db = require('./../3.databases/mySql')
// const {uploader} = require('./../helpers/uploadFile')
require('dotenv').config()


const getPackageById= (req,res)=>{
    let id = req.params.id    
    let sql = `select * from packages where is_deleted = 0 and id=?;`

    db.query(sql,id,(err,result)=>{
        try{
            if(err) throw err
            res.json({
               error : false,
               data : result
                
            })

        }catch(err){
            res.json({
                error : true,
                message : err.message
            })
        }
    })
}

const getDataPackageByVenueId= (req,res)=>{
    let id = req.params.id    
    let sql = `select * from packages where is_deleted = 0 and venueId=?;`

    db.query(sql,id,(err,result)=>{
        try{
            if(err) throw err
            res.json({
               error : false,
               data : result
                
            })

        }catch(err){
            res.json({
                error : true,
                message : err.message
            })
        }
    })
}


const deletePackagesById = (req,res)=>{
    let id = req.params.id
    let sql = 'update packages set is_deleted = 1 where id=?;'
    db.query(sql,id,(err,result) => {
        try{
            if(err) throw err         
                    res.json({
                        error:false,
                        message : 'delete data success',
                        data : result
                        
                    })
        }catch(err){
            res.json({
                error:true,
                message:err.message

            })
        }
    })
}

const addProduct = (req,res)=>{
    let data = req.body
    
    let sql='insert into packages set ?;'

    db.query(sql,data,(err,result)=>{
        try{
            if(err) throw err
            console.log(result)
            res.json({
                error:false,
                message : "add data berhasil",
                data : data
            })
        }catch(err){
            res.json({
                error:true,
                message:err.message
            })
        }
    })
}

const editProduct = (req,res)=>{
    let data = req.body
    let id = req.params.id
    
    let sql='update packages set ? where id=?;'

    db.query(sql,[data,id],(err,result)=>{
        try{
            if(err) throw err
            console.log(result)
            res.json({
                error:false,
                message : "edit data berhasil",
                data : data
            })
        }catch(err){
            res.json({
                error:true,
                message:err.message
            })
        }
    })
}

module.exports = {
   getDataPackageByVenueId,
   deletePackagesById,
   getPackageById,
   editProduct,
   addProduct
}
