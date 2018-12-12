/**
 * Created by CY on 2018/8/7.
 */
let express = require("express");
let mongoose = require("mongoose");
let goods = require("../modules/goods");
let router = express.Router();


router.get("/",function(req,res, next){
    goods.find({},(err,doc)=>{
        if(err){
            res.json({
                status:1,
                message:err.message
            })
        }else{
            res.json({
                status:0,
                message:"",
                result:{
                    length:doc.length,
                    list:doc
                }
            })
        }
    })
});
module.exports = router;