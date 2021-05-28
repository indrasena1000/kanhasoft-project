const express = require("express");
const bodyParser = require("body-parser");
var cors = require('cors')
const cookieParser = require('cookie-parser');
var morgan = require('morgan')
const db = require("./models/index");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.json())
app.use(cors())
app.use(cookieParser());
app.use(express.static(`public/`))
app.set('view engine','ejs');

const PORT = process.env.PORT ;

require('dotenv').config();

//routes
const authRoute = require("./routes/authRoute")
const dashboardRouter = require("./routes/dashboardRoute")
const { protect } = require('./middleware/auth');

app.get('/register', (req,res)=>{
    res.render('register');
 })

 app.get('/login', (req,res)=>{
    res.render('login');
 })


 //routes
 app.use(`/admin`,protect, dashboardRouter);

 app.use("/auth",authRoute)


 app.listen(PORT, (req, res) => {
    console.log(`Server Started at PORT ${PORT}`);
 });