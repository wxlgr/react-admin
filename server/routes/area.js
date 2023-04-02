const e = require("express");
const express = require("express");
const sqlFn = require("../mysql");
const router = express.Router();


router.get('/province',(req,res,next)=>{
    const sql='select * from province'
    sqlFn(sql,[],(err,data)=>{
        if(err){
            next(err)
            return
        }
        res.send({
            code:'00000',
            records:data
        })
    })
})
router.get('/city',(req,res,next)=>{
    const sql='select * from city where pid =?'
    sqlFn(sql,[req.query.pid],(err,data)=>{
        if(err){
            next(err)
            return
        }
        res.send({
            code:'00000',
            records:data
        })
    })
})
router.get('/region',(req,res,next)=>{
    const sql='select * from region where pid =?'
    sqlFn(sql,[req.query.pid],(err,data)=>{
        if(err){
            next(err)
            return
        }
        res.send({
            code:'00000',
            records:data
        })
    })
})

module.exports=router