/**
 * Created by CY on 2018/11/29.
 */
let express = require("express");
let mongoose = require("mongoose");
let log = require("../modules/log");
let router = express.Router();


router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get("/query",function(req,res,next){
    var limit = +req.param("limit",10);
    var page = +req.param("page",1);

    log.find({},(err,doc)=>{
        if(err){
            res.send(err);
        } else{
            var totalPage = Math.ceil(doc.length/limit);
            if(page > totalPage ){
                page =  totalPage;
            }
            var query =log.find({});
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
module.exports = router;