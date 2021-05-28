const db = require("../models/index")
require('dotenv').config();
const jwt = require('jsonwebtoken');

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });
  };
  
  const createSendToken = (user, statusCode, req, res) => {
    const token = signToken(user._id);
  
    res.cookie('jwt', token, {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
    });
    user.token = token
    user.save()
    return res.redirect(`/admin/dashboard`);
  };
exports.signup = async (req,res)=>{
    console.log(req.body)
  
    await db.User.create(req.body).then((response)=>{
        if (response){
            //req.flash('success_msg','You have now registered!')
            return res.redirect('/login')
        }
    }).catch((err)=>{
console.log(err)
return res.redirect('/register')
    })
   
}
 exports.signin = async (req,res,next)=>{
   console.log("innnn",req.body)
    const { phone, password } = req.body;
    if (!phone || !password) {
        //req.flash('error_msg', 'Please provide username and password!');
        // return next(new AppError('Please provide username and password!', 400));
        return res.redirect('/auth/signin');
      }
      const user = await db.User.findOne({
          phone:phone
 }).select('+password')

 if (!user || !(await user.correctPassword(password, user.password))) {
    //req.flash('error', 'Incorrect email or password');
    return res.redirect('/login');
  }
  console.log("user",user)
  createSendToken(user, 200, req, res);
}

exports.logout = (async (req, res, next) => {
    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
      });
      console.log("sss",req.user)
    // req.user.token = ""
    // req.user.save()
      return res.redirect('/login')
})