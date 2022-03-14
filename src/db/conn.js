const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://devansh_14:Devansh123@devansh.4v7ft.mongodb.net/Register",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    
}).then(()=> {
    console.log(`connection successful`);
 }).catch((e) => {
console.log(`no connection`);
})