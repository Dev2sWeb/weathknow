const express = require('express');
const app = new express();
const hbs = require('hbs');
const path = require('path');
const temppath= path.join(__dirname,"../templates/views")
const partpath = path.join(__dirname,"../templates/partials")

console.log(path.join(__dirname,"../templates/views"))
app.use(express.static(path.join(__dirname,"../public")))

app.set("view engine","hbs")
app.set("views",temppath)
hbs.registerPartials(partpath)

app.get("",(req,res)=>{
    // res.send("hello there today i am going to build an express.js project along with html,css,js")
    res.render("index")
})

app.get("/about",(req,res)=>{
    // res.send("Welcome, know more about us")
    res.render('about')
})

app.get("/weather",(req,res)=>{
    // res.send("this is the weather page");
    res.render('weather')
})

app.get("*",(req,res)=>{
    // res.send("404 Error! Can't find the requested page")
    res.render('error')
})

app.listen(8002,()=>{
    console.log("the system is running at port no 8002")
})