import express  from "express";
import jwt  from "jsonwebtoken";
import Loginuser from "../models/loginschema.js";

const AddressRoute = express.Router()

AddressRoute.use(express.json())

AddressRoute.get('/', async (req, res) => {
    console.log('address url req is', req)
    console.log('address headers from req is', req.headers)
    //const token = req.headers['authorization'].split(" ")[1]
    //const tokenLength = (req.headers['authorization'].split(" ")).length
    
    
   
    


    //console.log('axios tokenarray', tokenArray)
    //console.log('axios tokenlength', tokenLength)
    //const authorizationHeader = req.headers['authorization'];
/*if (!authorizationHeader) {
    return res.status(401).json({ status: 401, message: 'Authorization header is missing' });
}*/
   
   /* if (tokenArray[1] != 'undefined') {
        console.log('inside the axios if')
        token = req.headers['authorization'].split(" ")[1]
    }
    else {
        console.log('inside axios else')
        return res.status(401).json({status : 401, message : 'unauthorised user'})
    }*/



    //console.log('address url jwtToken', token)
    

   try {
    const authorizationHeader = req.headers['authorization']
    let tokenArray
    let token
    if(authorizationHeader != 'Bearer ') {
        tokenArray = req.headers['authorization'].split(" ")
        token = tokenArray[1]

    }

    else {
        return res.status(401).json({status : 401, message : 'unauthorised user'})
    }

    const jwt_secret = 'abcdefg'
    const user = jwt.verify(token, jwt_secret)
    console.log('username in the axios try', user)
    const existinguser = await Loginuser.findOne({username : user.username})
    if(existinguser) {
        return res.status(200).json({status : 200, message : 'valid jwt token'})
    }

    else {
        return res.status(401).json({status : 401, message : 'Invalid jwt token'})
    }

   }

   catch(err) {
    return res.status(401).json({status : 401, message : err})
   }
    //return res.status(200).json({status : 200, message : "successful"})

})

export default AddressRoute;

/* errors:
loggedIn : code working well 

unauthorized user (not loggedIn):

no bearer token... split(" ")/[1] gives empty 

try ---> exising user ie const user gives error... directly going to catch(err)

*/