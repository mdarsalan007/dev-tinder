const adminAuth = (req,res,next)=>{
    const token  = "admin";
    const isAdminAuth = token === "admin";
    if(isAdminAuth){
        console.log("admin is authorized");
        next();
    }
    else{
        res.status(401).send("admin is not authorized");
    }
}

const userAuth = (req,res,next)=>{
    const token  = "user";
    const isUserAuth = token === "user";
    if(isUserAuth){
        console.log("user is authorized");
        next();
    }
    else{
        res.status(401).send("user is not authorized");
    }
}

module.exports = {adminAuth,userAuth};