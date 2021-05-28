const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
categoryName : {
    type:String
},
subCategory:[{
    name:{type:String}
}],
user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
        }

},
{
    timestamps:true
})

const Category = mongoose.model('Category', categorySchema);
  
module.exports = Category;