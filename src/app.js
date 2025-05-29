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

app.get("/feed", async (req,res)=>{
    try{
        const users = await User.find({});
        res.send(users);
    }
    catch{
        res.status(400).send("something wnet wrong!")
    }
})


app.get("/user",async (req,res)=>{
    try{
        const user = await User.findOne({emailId:"arsalan@dummy.com"});
        res.send(user);
    }
    catch (err){
        res.status(400).send("something went wrong!");
    }
})

app.delete("/user",async (req,res)=>{
    try{
        const id=req.body.id;
        await User.findByIdAndDelete(id);
        res.send("deleted user of matching id successfully")
    }
    catch{
        res.status(400).send("something went wrong while deleting the user")
    }
   
})

app.patch("/user/:id",async (req,res)=>{
        const id = req.params?.id;
        const data = req.body;

    try {
        const allowedUpadtes = ["photoUrl","about","skills"];
        const isAllowed = Object.keys(data).every((k)=>
            allowedUpadtes.includes(k)
        )
        if(!isAllowed){
            throw new Error("Update not allowed");
        }
        await User.findByIdAndUpdate(id,data,{runValidators:true,});
        res.send("data updated successfully")
    }
    catch(err){
        res.status(400).send("Update failed"+err.message)
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



