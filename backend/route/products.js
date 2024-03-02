import express  from "express";
import product from "../models/productschema.js";
import multer from 'multer'

const upload = multer()
const  ProductRouter = express.Router()

ProductRouter.use(express.json())


ProductRouter.post('/', async (req, res) => {
    

    try {
        console.log('req received as',  req.body)
    const {id, title, price, vendor, imageUrl} = req.body
    console.log('product id is', id)
        const existingProduct = await product.findOne({id : id})
        if(!existingProduct) {
            const details = new product({id : id, title : title, price : price, vendor : vendor, imageUrl : imageUrl})
    
            await details.save().then(() => console.log('product added to db successfully'))
    
            return res.status(200).json({status : 200, message : 'product added to db successfully'})
    
        }
    
        else {
            return res.status(400).json({status : 400, message : 'product already exist in the db'})
        }
    
    }

    catch(err) {
        console.log('error while adding to the db', err)

        return res.json({message : err})
    }

    
})

ProductRouter.put('/', async(req, res) => {
    try {
        const {id, title, price, vendor, imageUrl} = req.body
    const existingProduct = await product.findOne({id : id})

    if(existingProduct) {
       await product.updateOne({id : id}, {$set : {
            title : title, price : price, vendor : vendor, imageUrl : imageUrl
            
        }})
        return res.status(200).json({status : 200, message : 'product updated successfully'})
    }

    else {
        return res.status(400).json({status : 400, message : 'Error in updating the product'})
    }
    }

    catch(err) {
        return res.status(400).json({status : 400, message : 'Error in updating the product'})
    }
})

ProductRouter.delete('/', async(req, res) => {
    try {
        console.log('inside delete axios try',  req)
       // const data = JSON.parse(req.body.body)
       const {id} = req.query 
       //console.log(id, title, price, vendor, imageUrl)
    const existingProduct = await product.findOne({id : id})

    if(existingProduct) {
        await product.deleteOne({id : id})
        return res.status(200).json({status : 200, message : 'product deleted successfully'})
    }

    else {
        return res.status(400).json({status : 400, message : 'Error in deleting the product'})
    }
    }

    catch(err) {
        return res.status(400).json({status : 400, message : 'Error in deleting the product', err})
    }
})

ProductRouter.get('/', async(req, res) => {
    try {
        const products = await product.find({})
    console.log("products in the db", products)
    return res.status(200).json({status : 200, data : products})
    }

    catch(err) {
        console.log('error in displaying products', err)
        return res.status(404).json({status : 404, message : err})
    }
})

ProductRouter.post('/bulk', upload.single('file'), async(req, res) => {
   try {
    const file = req.file 
    const fileContent = file.buffer.toString()
    /*console.log('Received file:', {
        id: file.id,
        price: file.price,
        title: file.title,
        imageUrl: file.imageUrl,
        vendor: file.vendor,
        content: fileContent  // Display file content as a string
    }); */

    const rows = fileContent.split("\r\n")

    console.log('rows length in the database', rows.length)
    console.log('rows in the csv file', rows)
    let flag = [];
    for(let i=1; i<(rows.length-1); i++) {
        const eachId = rows[i].split(",")[0]
       const duplicates =  await product.findOne({id : eachId})
       console.log('today duplicates in the database', duplicates)
       if(duplicates) {
        console.log('entering duplicates if today')
        flag.push(eachId)
       
       }
    }

    if(flag.length > 0) {
        return res.status(400).json({status : 400, message : "Product with id 1 already exist in the database",
         duplicateList : flag})
    }


    for(let i = 1; i < (rows.length -1); i++) {
        const eachRow = rows[i].split(",")
        const productInstance = new product({
            id : eachRow[0].trim(),
            price : eachRow[1].trim(),
            
            vendor : eachRow[2].trim(),
            title : eachRow[3].trim(),
            imageUrl : eachRow[4].trim(),
        }) 
        await productInstance.save()
    }

    console.log('reached 130th line')
   
    return res.status(200).json({status : 200, message : 'successfully uploaded the file to the database'})
   }

   catch(err) {
    return res.status(500).json({status : 500, message : err})
   }
    
})



export default  ProductRouter;