const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
require("./db/conn");
const Register = require("./models/registers");
const { Script } = require("vm");

const port = process.env.PORT || 3000;

const static_path = path.join(__dirname,"../public");
const template_path = path.join(__dirname,"../templates/views");
const partial_path = path.join(__dirname,"../templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path));
app.set("view engine","hbs");
app.set("views",template_path);
hbs.registerPartials(partial_path);

const staticPath = path.join(__dirname, "../views");
app.set("view engine", "hbs");

app.get("/", (req, res) => {
    res.render("home");
});
// app.get("/login", (req, res) => {
//     res.render("login (1)");
// });
app.get("/cntct.html", (req, res) => {
    res.render("contactus");
});
app.get("/abtus.html", (req, res) => {
    res.render("aboutus");
});
app.get("/lgin.html", (req, res) => {
    res.render("login (1)");
});
app.get("/register.html", (req, res) => {
    res.render("signup_2");
});
app.get("/FB.html", (req, res) => {
    res.render('Flight-Booking');
});
app.get("/BB.html", (req, res) => {
    res.render('Train-Booking');
});
app.get("/TB.html", (req, res) => {
    res.render('Bus-Booking');
});
app.get("/HB.html", (req, res) => {
    res.redirect('https://makemytrip.com/hotels/');
});
app.get("/Trip.html", (req, res) => {
    res.render("Seemore");
});
//create a new user in our database
app.post("/register", async (req, res)=>{
    console.log("Into this register");
    try{
        const password = req.body.createpassword;
        const cpassword = req.body.confirmpassword;
     if(password === cpassword){
         const registerUser = new Register({
             firstname: req.body.firstname,
             lastname: req.body.lastname,
             email: req.body.email,
             createpassword: req.body.createpassword,
             confirmpassword: req.body.confirmpassword,
         })
         const registered = await registerUser.save();
         res.render("homeAfterLogin");
     }else{
        res.render("alert");
     }
    }catch(error){
        res.status(400).send(error);
    }
 })

app.post("/login", async (req,res)=> {
    console.log("Into the login");
    try{
        const email = req.body.email;
        const createpassword = req.body.password;

        const useremail = await Register.findOne({email:email});
        console.log(useremail.createpassword);
        if(useremail.createpassword === createpassword){
            res.status(201).render("homeAfterLogin");
        }else{
            console.log("Into Else block ");
            res.render("alert");
        }
    }catch(error){
        res.status(400).send("invalid Email");
    }
})


app.listen(port, () => {
    console.log(`server is running at port no ${port}`);
})