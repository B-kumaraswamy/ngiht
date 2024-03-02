import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import LoginRouter from './route/login.js';
import SignupRouter from './route/signup.js';
import ProductRouter from './route/products.js';
import AddressRoute from './route/address.js';

const Login = express()

Login.use(cors())

Login.use(express.json())

Login.use('/login', LoginRouter)

Login.use('/signup', SignupRouter)

Login.use('/products', ProductRouter)

Login.use('/address', AddressRoute)

const port = 8080;

Login.listen(port, () => {
    console.log('connected to ', port)
})

mongoose.connect('mongodb+srv://kumaraswamy491:Kumar%40123@cluster0.sqt5uzn.mongodb.net/signup')
.then(() => console.log('connected to db'))

