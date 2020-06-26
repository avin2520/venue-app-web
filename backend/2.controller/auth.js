const db = require('./../3.databases/mySql')
const passwordHasher = require('./../helpers/hash')
const transporter = require('./../helpers/nodemailer')
const {createJwt,decodeToken} = require('./../helpers/jwt')

function Register(req,res){
    const data = req.body // {email : fikri@fikril.com , password : 123123}
    
    // check email availability
    const sqlEmailCheck = 'select * from users where email = ? or username =?;'; 
    db.query(sqlEmailCheck , [data.email,data.username] , (err,result) => {
        try{
            if(err) throw err
            if(result.length > 0){

                // email has ben taken
                res.json({
                    error : true,
                    message : "email or username not available"
                })
                
            }else{
                // available

                // hashing password
                const afterHashing = passwordHasher(data.password)
                data.password = afterHashing

                // post data to sql with status unverified email
                const sqlInsert = 'insert into users set ?;'
                db.query(sqlInsert, data, (err,result) => {
                    try{
                        if(err) throw err

                        const token = createJwt({email : data.email , id : result.insertId})
                        // send email verification to user
                        transporter.sendMail({
                            from : "VENUE APP",
                            to : data.email,
                            subject : "VERIFY YOUR EMAIL NOW !!!",
                            html : `
                                <h1> Click Link <a href='tes'> Here </a> to verify your email
                            `
                        }).then((response) => {
                            res.json({
                                error :false,
                                message : "Register Success, Check your Email to Verify"
                            })
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                    


                    }catch(err){
                        res.json({
                            error : true,
                            message : err.message
                        })
                    }
                })
                
            }

        }catch(err){
            res.json({
                error : true,
                message : err.message
            })
        }
    })
    
   
    
    // respon register success
}




function testNodemailer (req,res){
    console.log('masuk')

    const mailOptions = {
        from : "avinda",
        to : "avinda628@gmail.com",
        subject : "Verify your email now !!!!",
        html : "<h1>Hello, Please Verify your email <a href='google.com'>here</a>"
    }

    transporter.sendMail(mailOptions)
    .then((val) => {
        console.log(val)
        res.json({
            error : false,
            message : "Email successfully sent"
        })
    })
    .catch((err) => {
        console.log(err)
    })
    

}

// universal cookies
// jwt buat protect api route
// deployment
// eer diagram
// mongo db & mongoose


function verify (req,res) {
    const token = req.params.token
    const dataToken = decodeToken(token)
    console.log(dataToken)

    let sqlUpdate = 'update users set verified = 1 where id = ? and email = ?;'
    db.query(sqlUpdate, [dataToken.id, dataToken.email], (err,result) => {
        if(err) throw err
        res.json({
            error : false,
            message : "verify success"
        })
    })
}



function login (req,res){
    // ambil data nya pake req
    const data = req.body // {password : 123123, email : fikri@fikri.com}

    // hash password
    const afterHashing = passwordHasher(data.password)
    data.password  = afterHashing


    // check last login kapan? kalo udah lama, kirim email buat verifikasi
    // check device info, apabila device nya berbeda, kirim email buat verifikasi (os module)

    // device info , last login


    // email verification, itu gak melulu link
    // kalian bisa kirim kode verifikasi, 

    // jalanin query
    let sql = 'select * from users where email = ? and password = ?;'
    db.query(sql, [data.email , data.password ] , (err,result) => {
        try{
            if(err) throw err
            if(result.length === 0) throw {error : true , message : "Password or Email Invalid"}
            if(result[0].verified === 0) throw {error : true,message : "Email Belum di Verifikasi, silahkan verifikasi terlebih dahulu"}
            const dataUser = result[0]
            console.log(dataUser)
            const token = createJwt({id : dataUser.id, email : dataUser.email , role : dataUser.role, is_verified:dataUser.is_verified})

            res.json({
                error : false,
                message : "Login Success",
                data : {id : dataUser.id, email : dataUser.email , role : dataUser.role,is_verified:dataUser.is_verified},
                token : token
            })
        }catch(err){
            res.json({
                error : true,
                message : err.message
            })
        }
    })
    // if user ada dan password ada res success
    // else res. failed
    

}

module.exports ={
    register : Register,
    testNodemailer,
    verify,
    login
}