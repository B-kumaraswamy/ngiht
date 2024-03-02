import mongoose from "mongoose";

const Products = new mongoose.Schema({
    id : {
        type : String, 
        required : true
    },

    title : {
        type : String, 
        required : true

    },
    price : {
        type : String, 
        required : true

    },
    vendor : {
        type : String, 
        required : true

    }, 
    imageUrl : {
        type : String, 
        required : true

    }
})


const product = new mongoose.model('product', Products)

export default product;