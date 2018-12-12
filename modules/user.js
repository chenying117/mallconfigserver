/**
 * Created by CY on 2018/9/26.
 */
let mongose = require("mongoose");
let Schema = mongose.Schema;
let  userSchema = new Schema({
    "userId" : Number,
    "userName" : String,
    "name" : String,
    "status" : Number,
    "tel" : String,
    "email" : String,
    "class" : String,
    "className": String
});

module.exports = mongose.model("User",userSchema);