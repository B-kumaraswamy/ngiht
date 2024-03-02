import SignupAndLogin from "./components/signupandlogin";

import OnSignUpComponent from "./components/signup";

import {BrowserRouter, Routes, Route} from 'react-router-dom';
import NotFound from "./components/notfound";

import HomeComponent from "./components/home";
import ProductComponent from "./components/products";
import Admin from "./components/admin";
import { Authprovider } from "./components/context.js";
import ProtectedRoute from "./components/protectedroute.js";
import AddressComponent from "./components/address.js";
// import { useAuthContext } from "./components/context.js";
// import Cookie from "js-cookie";
// import { useEffect } from "react";




function OnApp() {
  // const { setLoggedIn } = useAuthContext();

  // useEffect(() => {
  //   const token = Cookie.get('jwt-token');
  //   if (token) {
  //     // Check token validity (e.g., expiration) here if needed
  //     setLoggedIn(true);
  //   }
  // }, [setLoggedIn]);

  return (

      <Authprovider>
     <BrowserRouter>
    <Routes>
    
      <Route exact path = '/' element = {<SignupAndLogin/>}/>
      <Route  exact  path = '/signup' element = {<OnSignUpComponent/>}/>
      <Route exact  path = '/home' element = {<ProtectedRoute component = {HomeComponent}/>}/>
      <Route  exact  path = '/products' element = {<ProtectedRoute component = {ProductComponent}/>}/>
      <Route  exact  path = '/admin' element = {<ProtectedRoute component = {Admin}/>}/>
      <Route exact path = '/address' element = {<AddressComponent/>}/>
     
      <Route path = '*' element = {<NotFound/>}/>
      
    </Routes>
    </BrowserRouter>
    </Authprovider>
   
    
  )
}


export default OnApp;




