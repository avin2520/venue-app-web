const db = require('./../3.databases/mySql')
const {uploader} = require('./../helpers/fileUpload')
require('dotenv').config()
const fs = require('fs')

const getAllDataUsers = (req,res)=>{  
    let sql = `select * from users where is_deleted = 0  ;`

    db.query(sql,(err,result)=>{
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

const getUsersById= (req,res)=>{
    let id = req.params.id    
    let sql = `select * from users where is_deleted = 0 and is_suspended=0 and id=?;`

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

const postCompleteProfile = (req,res) => {
    console.log('masuk')
    const upload = uploader('/profile','PROF-IMG-').single('profile_image')

    upload(req,res, (err) => {
        if(err) throw err
        const image = req.file
        const data = JSON.parse(req.body.data)
        const id = req.params.id
        
        console.log(image)
        console.log(data)
      

        const dataUpload = {
           firstName : data.firstName,
           lastName : data.lastName,
           avatar : image.path,
           address : data.address
        }

        const sql = 'update users set ? where id=? ;'
        db.query(sql,[dataUpload,id],(err,result) => {
            try {
                if(err) throw err
                res.json({
                    error : false,
                    message :"Complete Profile Success"
                })
            } catch (error) {
                console.log(error)
            }
        })

    }) 

}

const deleteUsersById = (req,res)=>{
    let id = req.params.id
    let sql = 'update users set is_deleted = 1 where id=?;'
    db.query(sql,id,(err,result) => {
        try{
            if(err) throw err         
            let sql = 'select * from venues where is_deleted=0 and userId=?;'
            db.query(sql,id,(err,result) => {
                try{
                    if(err) throw err
                    else if(result.length !== 0 ){
                    const arrayId=[]
                    result.forEach((val)=>{
                        arrayId.push(val.id)
                    })
                    arrayId.forEach((val)=>{
                            let sql = `UPDATE venues SET is_deleted = 1 WHERE id= ${val};`
                            db.query(sql,(err,result)=>{
                                        try{
                                            if(err) throw err
                                            arrayId.forEach((val)=>{
                                                let sql = `select * from packages where is_deleted=0 and venueId=${val};`
                                                db.query(sql,(err,result)=>{
                                                    try{
                                                        if(err) throw err
                                                        else if(result.length !== 0 ){
                                                            const arrayVenueId=[]
                                                            result.forEach((val)=>{
                                                                arrayVenueId.push(val.id)
                                                            })
                        
                                                            arrayVenueId.forEach((val)=>{   
                                                                let sql = `UPDATE packages SET is_deleted = 1 WHERE venueId= ${val};`
                                                                db.query(sql,(err,result)=>{
                                                                            try{
                                                                                if(err) throw err
                                                                                console.log(result)
                                                                                res.json({
                                                                                    error:false,
                                                                                    message : 'delete data success',
                                                                                    data : result
                                                                                    
                                                                                })
                                                
                                                                            }catch(err){
                                                                               console.log(error)
                                                                            }
                                                                        })
                                                                
                                                            })
                        
                                                        }
                        
                                                    }catch(err){
                                                       console.log(error)
                                                    }
                                                })
                                            })
                                           
            
                                        }catch(err){
                                           console.log(error)
                                        }
                                    })
                            
                    })
                }
                   

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


module.exports = {
    postCompleteProfile,
    getUsersById,
    getAllDataUsers,
    deleteUsersById
 }
 