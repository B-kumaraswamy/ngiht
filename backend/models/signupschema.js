import mongoose from "mongoose";

const signupSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true
      
    },

    password : {
        type : String, 
        required : true
       
    },

    mobile : {
        type : String,
        required : true
      
    },

    email : {
        type : String,
        required : true
    

    }


})

const signupuser = mongoose.model('signupuser', signupSchema);

export default signupuser;