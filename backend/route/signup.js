import express from 'express'
import signupuser from '../models/signupschema.js'
import Loginuser from '../models/loginschema.js'
import bcrypt from 'bcrypt';


const SignupRouter = express.Router()

SignupRouter.use(express.json())

SignupRouter.post('/', async (req, res) => {
    const {username, password, mobile, email} = req.body

    try {
       
       const existinguser =  await signupuser.findOne({
        $or : [
            {username : username},
            
            {email : email}
        ]
       }).count()
console.log("existinguser value ", existinguser)

        
   if (existinguser) {
    return res.status(400).json({message : 'username or mobile or email already exist. Use different credentials',
status : 400})
   }
   else {
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new signupuser({
        username, password : hashedPassword, mobile, email
    })

    await user.save().then(() => console.log("user registered successfully" , user))
    const loginUser = new Loginuser({
        username, password : hashedPassword
    })

    await loginUser.save().then(() => console.log('user registered in login schema'))

    return res.status(200).json({message:'user registered successfully', status : 200})
   }

    }

    catch(err) {
        console.log("err in registering the user", err)

    }




})


export default SignupRouter;