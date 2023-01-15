//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const crudFunc = require("./utils/crudFunc");


const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.set('strictQuery', false);
mongoose.connect("mongodb://localhost:27017/twistDB", {useNewUrlParser: true});

//Mongoose Schemas and model
const twistSchema =  {
    name: String,
    score: Number
}
const Twist = mongoose.model("Twist", twistSchema);

const userSchema = {
    name: String,
    list: [
    {
        name: String,
        score: Number
    },
    {
        name: String,
        score: Number
    },
    {
        name: String,
        score: Number
    }
]}
const User = mongoose.model("User", userSchema);


//Routes without params

app.route("/twists")

.get((req, res)=>{
    crudFunc.findAll(req, res, Twist);
})

.post((req, res)=>{
    crudFunc.postModel(req, res, Twist);
})

.delete((req, res)=>{
    crudFunc.deleteAll(req, res, Twist);
});

//User routes
app.route("/users")

.get((req, res)=>{
    crudFunc.findAll(req, res, User);
})

.post((req, res)=>{
        crudFunc.postModel(req, res, User);
    }
)

.delete((req, res)=>{
    crudFunc.deleteAll(req, res, User);
});





//////////////////////////////////////////////////////Requests spesific twists//////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.route("/twists/:twistName")

.get((req, res)=>{
    crudFunc.findOneDoc(req, res, Twist, {name: req.params.twistName});
})
.put((req, res)=>{
    crudFunc.putOne(req, res, Twist, {name: req.params.twistName});
})

.patch((req, res)=>{
   crudFunc.updateOneDoc(req, res, Twist, {name: req.params.twistName});
})

.delete((req, res)=>{
    crudFunc.deleteOneDoc(req, res, Twist, {name: req.params.twistName});
    
});

app.route("/users/:userName")

.get((req, res)=>{
    crudFunc.findOneDoc(req, res, User, {name: req.params.userName});
})
.put((req, res)=>{
    crudFunc.putOne(req, res, User, {name: req.params.userName});
})

.patch((req, res)=>{
   crudFunc.updateOneDoc(req, res, User, {name: req.params.userName});
})

.delete((req, res)=>{
    crudFunc.deleteOneDoc(req, res, User, {name: req.params.userName});
    
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});