const express = require('express')
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
var bodyParser = require('body-parser');
const res = require('express/lib/response');
const req = require('express/lib/request');
const app = express()

// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'jwt'
  });
  connection.connect();

app.get('/',(req,res)=>{
    res.json({
        message:'welcome to api'
    })
})

app.post('/api/signup',urlencodedParser,(req,res)=>{
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    connection.query(`insert into users (name,email,password) values ('${name}','${email}','${password}')`,(err,result)=>{
        if (err) throw err;
        res.json(result)
    });    
})
app.post('/api/post',urlencodedParser,verifyToken,(req,res)=>{
    jwt.verify(req.token,'asdf123',(err,authData)=>{
        console.log(err)
        if(err){
            res.sendStatus(403)
        }else{
            res.json({authData})
        }
    })
})

app.post('/api/login',urlencodedParser,(req,res)=>{
    const email = req.body.email
    const password = req.body.password
    connection.query(`select * from users where email = '${email}' and password = '${password}'`,(err,result)=>{
        if (err) throw err;
        jwt.sign({user: result},'asdf123',(err,token)=>{            
            res.json({token})
        })
    }); 
})
app.listen(5000,()=>{
    console.log(`server started  at  5000`)
})

function verifyToken(req,res,next){
    const bearearHeader = req.headers['authorization']
    if(typeof bearearHeader !== 'undefined'){
        const bearer = bearearHeader.split(' ');
        const bearerToken = bearer[1]
        req.token = bearerToken
        next();
    }else{
        res.sendStatus(403)
    }
}