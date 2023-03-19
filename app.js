//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");
const app = express();

app.use(express.static("public"));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
// connect with mongoose
mongoose.connect('mongodb://127.0.0.1:27017/userDBalaji',{useNewUrlParser:true});
//simple java script object.
// const userSchema = {
// email : String,
// password : String
// };

//no longer simple js object but actually an obj that created from mongoose schema class.
const userSchema = new mongoose.Schema( {
    email : String,
    password : String
    });

const secret = "thisisoursecret";
userSchema.plugin(encrypt,{secret:secret,encryptedFields: ['password'] });
// must plugin before model creation..
const User = new mongoose.model("User",userSchema);


// access pages.
app.get("/",function(req,res){
  res.render("home");
});
app.get("/register",function(req,res){
    res.render("register");
  });
  app.get("/login",function(req,res){
    res.render("login");
  });

app.post("/register",function(req,res){
 console.log(req.body.username);
  console.log(req.body.password);
  const user = new User({
    email:req.body.username,
    password:req.body.password
  });
  user.save().then(function(){
    console.log("registration successfull!");
    res.render("secrets");
  }).catch(function(err){
    console.log(err)
  });
});

  app.post("/login",function(req,res){
        User.findOne({email:req.body.username})
           .then(function(foundUser){
          if(foundUser.password===req.body.password){
              // console.log("secrets");
               res.render("secrets");
          } 
          console.log("errorrrrr"+err);

            }).catch(function(err){
                console.log("errorrrrr"+err);
                
            });
  });





app.listen(3000,function(){
 console.log("Server started on port : 3000");
});
