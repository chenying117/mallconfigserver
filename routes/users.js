/**
 * Created by CY on 2018/8/7.
 */
let express = require("express");
let mongoose = require("mongoose");
let user = require("../modules/user");
let router = express.Router();

router.get("/",function(req,res,next){
    var limit = +req.param("limit",10);
    var page = +req.param("page",1);

    user.find({},(err,doc)=>{
        if(err){
            res.send(err);
        } else{
            var totalPage = Math.ceil(doc.length/limit);
            if(page > totalPage ){
                page =  totalPage;
            }
            var query =user.find({});
            query.skip(  (page - 1) * limit );
            query.limit(limit);
            query.exec((err, rs)=>{
                 if(err){
                     res.send(err);
                 }else{
                     res.json({
                         status:0,
                         message:"",
                         result:{
                             length: doc.length,
                             list:rs
                         }
                     });
                 }

            })

        }
    });
});
router.get("/query",function(req, res, next){
    const keyword = req.param("key","");; //从URL中传来的 keyword参数
    const reg = new RegExp(keyword, 'i');
    var limit = +req.param("limit",10);
    var page = +req.param("page",1);

    var obj =[
        {userName : {$regex : reg}},
        {name : {$regex : reg}},
        {email : {$regex : reg}},
        {tel : {$regex : reg}},
        {class : {$regex : reg}},
        {className : {$regex : reg}}
    ]
    user.find(  {
        $or : obj
    },(err,doc)=>{
        if(err){
            res.send(err);
        } else{
            var totalPage = Math.ceil(doc.length/limit);
            if(page > totalPage ){
                page =  totalPage;
            }
            var query =user.find({  $or : obj });
            query.skip(  (page - 1) * limit );
            query.limit(limit);
            query.exec((err, rs)=>{
                if(err){
                    res.send(err);
                }else{
                    res.json({
                        status:0,
                        message:"",
                        result:{
                            length: doc.length,
                            list:rs
                        }
                    });
                }

            })
        }
    });
});
router.get("/delete",function(req,res,next){
    user.deleteMany({_id: mongoose.Types.ObjectId(req.query.id)},  (err, doc)=>{
        if(err){
            res.json({
                status:1,
                message:err.message
            });
        }else{
            res.json({
                status:0,
                message:"",
                result:{
                    doc: doc
                }

            });
        }

    });
});
router.post("/update",function(req, res, next){
   console.dir(req.body);
    var obj ={
        "userName" : req.body.userName,
        "name" : req.body.name,
        "email" : req.body.email,
        "tel" : req.body.tel,
        "class" : req.body.class,
        "className" : req.body.className
    }
    user.update({_id: mongoose.Types.ObjectId(req.body._id)}, obj, (err, doc)=>{
        if(err){
            res.json({
                status:1,
                message:err.message
            });
        }else{
            res.json({
                status:0,
                message:"",
                result:{
                    doc: doc
                }

            });
        }

    });
})
router.post("/add",function(req, res, next){

    user.insertMany(req.body, (err, doc)=>{
        if(err){
            res.json({
                status:1,
                message:err.message
            });
        }else{
            res.json({
                status:0,
                message:"",
                result:{
                    doc: doc
                }

            });
        }

    });
})
module.exports = router;
