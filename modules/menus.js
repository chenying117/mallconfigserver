/**
 * Created by CY on 2018/8/7.
 */
let mongoose = require("mongoose");
let schema = mongoose.Schema;
let menusSchema = new schema({
    "menuId" : String,
    "menuName" : String,
    "menuUrl" : String,
    "menuOrg" : Number,
    "menuIcon" : String,
    "menuChild" : Array
});
module.exports = mongoose.model("Menu",menusSchema);