const validator = require("validator")


const validateSignUpData = (req)=>{
    const {firstName , lastName, emailId, password}= req.body;

    if(!firstName || !lastName){
        throw new Error("Name should have first and last Name")
    }
    else if(firstName.length<2 || firstName.length>26){
        throw new Error("First Name should have 2-26 characters")
    }
    else if(lastName.length<2 || lastName.length>26){
        throw new Error("Last Name should have 2-26 characters")
    }
    else if(!emailId){
        throw new Error("Email is required")
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Email is not Valid!")
    }
    else if(!password){
        throw new Error("Password is required")
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Please enter a strong password")
    }
    
}


module.exports = {validateSignUpData}
