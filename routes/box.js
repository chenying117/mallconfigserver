/**
 * Created by CY on 2018/8/7.
 */
let express = require("express");
let mongoose = require("mongoose");
let box = require("../modules/box");
let router = express.Router();
router.get("/",function(req,res, next){
    box.find({},(err,doc)=>{
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
router.post("/getXY",function(req, res, next){

    console.dir(JSON.parse(req.body.keys));
    box.find({ key: {$in: JSON.parse(req.body.keys)} }, (err,doc)=>{
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
    }  );
});
router.post("/getLines",function(req, res, next){

    console.dir(JSON.parse(req.body.keys));
    box.find({ key: {$in: JSON.parse(req.body.keys)} }, (err,doc)=>{
        if(err){
            res.json({
                status:1,
                message:err.message
            })
        }else{
            var data =[];
            for(var i =0;i < doc.length;i++){
                var obj  = {},lens =[];
                obj.key = doc[i].key;
                obj.name = doc[i].name;

                for(var j = 0; j < 5 ;j++){
                    lens.push({
                        x: Math.random()*5 , y: Math.random()*8
                    });
                }
                obj.lens = lens;
                data.push(obj);
            }
            res.json({
                status:0,
                message:"",
                result:{
                    length:doc.length,
                    list: data
                }
            })
        }
    }  );
})
module.exports = router;