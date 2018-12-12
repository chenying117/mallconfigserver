/**
 * Created by CY on 2018/10/16.
 */
let mongose = require("mongoose");
let Schema = mongose.Schema;
let  goodsSchema = new Schema({
    "key" : String,
    "name" : String,
    "x" : Number,
    "y" : Number
});
module.exports = mongose.model("Boxs",goodsSchema);