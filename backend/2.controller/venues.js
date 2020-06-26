const db = require('./../3.databases/mySql')
const {uploader} = require('./../helpers/fileUpload')
require('dotenv').config()
const fs = require('fs')

function convertPath(param) {
    var path = param.split('public\venue')
    path[0] = 'public\\venue\\'
    return path.join('')
}




console.log(convertPath('public\venue\VEN-IMG-1593078415956.jpg'))


const getDataVenueById= (req,res)=>{
    let id = req.params.id    
    let sql = `select * from venues where is_deleted = 0 and id=?;`

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


const getDataVenueByUsersId= (req,res)=>{
    let id = req.params.id    
    let sql = `select * from venues where is_deleted = 0 and userId=?;`

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


const deleteVenuesById = (req,res)=>{
    let id = req.params.id
    let sql = 'update venues set is_deleted = 1 where id=?;'
    db.query(sql,id,(err,result) => {
        try{
            if(err) throw err         
            let sql = 'update packages set is_deleted = 1 where venueId=?'
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

        }catch(err){
            res.json({
                error:true,
                message:err.message

            })
        }
    })
}

const postNewVenue = (req,res) => {
    console.log('masuk')
    const upload = uploader('/venue','VEN-IMG-').single('venue_image')

    upload(req,res, (err) => {
        if(err) throw err
        const image = req.file
        const data = JSON.parse(req.body.data)
        const id = req.params.id
        
        console.log(image)
        console.log(data)
      

        const dataUpload = {
           name : data.name,
           address : data.address,
           imageUrl : image.path,
           city : data.city,
           userId : id
        }

        const sql = 'insert into venues set ? ;'
        db.query(sql,dataUpload,(err,result) => {
            try {
                if(err) throw err
                res.json({
                    error : false,
                    message :"Add Data To Venue Success"
                })
            } catch (error) {
                console.log(error)
            }
        })

    }) 


}


const EditDataVenue = (req,res) => {
    console.log('masuk')
    const upload = uploader('/venue','VEN-IMG-').single('venue_image')

    upload(req,res, (err) => {
        if(err) throw err
        const image = req.file
        const data = JSON.parse(req.body.data)
        const id = req.params.id
        console.log(image)
        console.log(data)

        const oldPath = data.path
        console.log(oldPath)
        

        const dataUpload = {
            name : data.name,
            address : data.address,
            imageUrl : image.path,
            city : data.city,
        }
        
        fs.unlinkSync(oldPath)
        const sql = 'update venues set ? where id = ?;'
        db.query(sql,[dataUpload,id],(err,result) => {
            try {
                if(err) throw err
                res.json({
                    error : false,
                    message :"Edit Data Venue Success"
                })
            } catch (error) {
                console.log(error)
            }
        })

    }) 


}



module.exports = {
   getDataVenueByUsersId,
   deleteVenuesById,
   postNewVenue,
   EditDataVenue,
   getDataVenueById
}
