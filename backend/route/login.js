import express from 'express';
import Loginuser from '../models/loginschema.js';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';

const LoginRouter = express.Router()

LoginRouter.use(express.json())

LoginRouter.post('/', async (req, res) => {
    const {username, password} = req.body 

    console.log('user details from the frontend', req.body)
   // console.log(req.headers)
    // const token = req.headers["authorization"].split(" ")[1]
    const jwt_secret = 'abcdefg'

    /* jwt.verify(token, jwt_secret, (err, decoded) => {

    })*/


   

    try {
       
        const existinguser = await Loginuser.findOne({username : username })
        const userHashedPassword = await bcrypt.compare(password, existinguser.password)

        

        console.log("existinguser credentials are", existinguser)

        if (existinguser && userHashedPassword) {
            const token = jwt.sign({username : username},jwt_secret)

            return res.status(200).json({status : 200, message : 'Logged-in successfully', jwt_token : token})

        }
    
        else {
            return res.status(401).json({status : 401, message : "Invalid credentials"})
        }
    
    }

    catch(err) {
        console.log('error while logging in', err)
        return res.json({message : err})
    }

   

    

})


export default LoginRouter; 