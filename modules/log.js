/**
 * Created by CY on 2018/11/29.
 */
let mongose = require("mongoose");
let Schema = mongose.Schema;
let logSchema = new Schema({
    "userName": String,
    "url" : String,
    "time" : Date
});
module.exports = mongose.model("Log", logSchema);
