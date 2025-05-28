const express = require("express");
const app = express();
const  {adminAuth,userAuth} = require("./middlewares/auth")

app.use("/admin", adminAuth);

app.get("/user/login",(req,res,next)=>{
    res.send("you can login now")
})
app.get("/admin/data",(req,res,next)=>{
    res.send("all admin data send")
}
)
app.get("/admin/delete",(req,res,next)=>{
    res.send("admin data deleted")
}
)
app.use("/user", userAuth);
app.get("/user/data",(req,res,next)=>{
    res.send("all user data send")
})

app.use("/test", (req, res) => {
  res.send("Testing the server!");
});
app.listen(3000, () => {
  console.log("server is successfully listening on port:3000");
});
