/**
 * Created by CY on 2018/8/7.
 */
let mongose = require("mongoose");
let Schema = mongose.Schema;
let  goodsSchema = new Schema({
    "produceId" : Number,
    "produceName" : String,
    "salePrice" : Number,
    "produceImage" : String
});
module.exports = mongose.model("Good",goodsSchema);