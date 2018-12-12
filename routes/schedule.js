/**
 * Created by CY on 2018/10/16.
 */
var schedule = require('node-schedule');
let express = require("express");
let mongoose = require("mongoose");
let box = require("../modules/box");
let router = express.Router();
function scheduleRecurrenceRule(){
    var rule = new schedule.RecurrenceRule();
    var times = [];
    for(var i=1; i<60; i++){
        times.push(i);
    }
    rule.second = times;
    schedule.scheduleJob(rule, function(){
        box.find({},(err,doc)=>{
            if(err){
                res.json({
                    status:1,
                    message:err.message
                })
            }else{
               for(var i =0; i < doc.length; i++){
                   var q = box.where({ _id: mongoose.Types.ObjectId(doc[i]._id) });
                   q.update({ $set: { x: Math.random()*5 , y: Math.random()*8}}).exec();
               }

            }
        })
    });

}

scheduleRecurrenceRule();