import mongoose from "mongoose";

const loginSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },

    password : {
        type : String, 
        required : true 
    }
})

const Loginuser = mongoose.model('Loginuser', loginSchema);

export default Loginuser;