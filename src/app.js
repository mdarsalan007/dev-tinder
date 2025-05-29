const express = require("express");
const app = express();
require("./config/database")
const connectDB = require("./config/database")
const User = require("./models/user");   


// below should work for all the routes automatically.
app.use(express.json());


app.post("/signup",async (req,res)=>{

    // dynamic to recieve data from end user (here postman)
    const user = new User(req.body);
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



