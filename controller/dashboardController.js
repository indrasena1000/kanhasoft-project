require('dotenv').config();
const db = require("../models/index")

exports.getDashboard = (async (req, res, next) => { 
 var categorys =  await db.User.findOne({_id:req.user._id}).populate("categorys")
 console.log(categorys)   
 return res.render("dashboard",{
        user:categorys
    })
})

exports.addCategory = (async (req, res, next) => { 
var category =  await db.Category.create({categoryName:req.body.categoryName,user:req.params.userId})
 req.user.categorys.push(category._id)
 req.user.save()
return res.redirect("/admin/dashboard")
})

exports.addSubCategory = async(req,res)=>{
    console.log("innnnnn")
    var category =  await db.Category.findOne({_id:req.params.categoryId})
    category.subCategory.push({name:req.body.subCategoryName})
    category.save()
    return res.redirect("/admin/dashboard")
}

exports.deleteCategory = async(req,res)=>{
   await db.Category.findOneAndDelete({_id:req.params.categoryId})
   return res.redirect("/admin/dashboard")

}