var jwt = require('jsonwebtoken')
require('dotenv').config()
var secret = process.env.secret_password
var today = new Date();
var date = today.getDate() +'-'+ (today.getMonth()+1) +'-'+today.getFullYear();


console.log(date)
var params = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb3Vyc2VfaWQiOiI2MjdlNzJhM2E3Y2QyMzZjZmMzZjA0ODIiLCJzdGFydCI6IjEiLCJEYXRlIjoiMTUtNS0yMDIyIiwiaWF0IjoxNjUyNjI0Mzg4LCJleHAiOjE2NTI2Mjc5ODh9.1iixAZ-GcnlaghqInB1JXzrtrxDegD9l1VKXcK_Zmko'

jwt.verify(params, secret, (err, decode)=>{
    if (!err){console.log(decode)}
    else 
        {console.log(err)}
})



