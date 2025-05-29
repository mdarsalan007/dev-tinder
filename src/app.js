const express = require("express");
const app = express();
require("./config/database")
const connectDB = require("./config/database")
const User = require("./models/user");               


app.post("/signup",async (req,res)=>{
    const userObj= {
        firstName:"Mohd",
        lastName:"Arsalan",
        emailId:"arsalan@dummy.com",
        password:"Arsalan@123"

    }

    const user = new User(userObj);
    try{
        
        await user.save();
        res.send("User added successfully.")
    }
    catch(err){
        res.status(400).send("error in adding the data"+err.message)
    }
})

connectDB()
    .then(()=>{
        console.log("connected to the database successfully");

        app.listen(3000, () => {
        console.log("server is successfully listening on port:3000");
        });
        
    })
    .catch((err)=>{
        console.error("database is not connected");
        
    })



