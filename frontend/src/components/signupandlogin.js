import { useState } from "react";
import Cookie from 'js-cookie'
import './singleproduct.css'

import { Navigate, useNavigate } from "react-router-dom";
import { useAuthContext } from "./context";


import { Link } from "react-router-dom";
function SignupAndLogin() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const { setLoggedIn} = useAuthContext()
  const navigate = useNavigate()
  const jwtToken = Cookie.get('jwt-token')
  if (jwtToken !== undefined) {
    return <Navigate to = '/home'/>
  }

  
  const onLogin = async () => {
    const userDetails = {username : username, password:password}
    const url = 'http://localhost:8080/login'
    const options = {
    method : 'POST',
    headers : {
        'Content-Type' : 'application/json'
       // 'Authorization' :  `Bearer ${jwtToken}`

    },
    body : JSON.stringify(userDetails)
}

try {
  const data = await fetch(url, options)
console.log('data from the backend', data)

const res = await data.json()

console.log('res from the backend', res)


if (res.status === 200) {
    navigate('/home')
    Cookie.set('jwt-token', res.jwt_token)
    setLoggedIn(true)

}

if (res.status === 401) {
    alert('Invalid credentials. Use valid username and password')
}

else {
   alert(res.message) 

}
}

catch(err) {
  console.log('Error during login:', err);
  alert('An error occurred during login. Please try again.');
}



}



  return (
    <center>
    <div>
      <label>Username</label> <br/> 
      <input type = "text" placeholder = "Enter your username" onChange={(event) => setUsername(event.target.value)}/> <br/> <br/>
      <label>Password</label> <br/>
      <input type = "password" placeholder = "Enter valid password" onChange={(event) => setPassword(event.target.value)}/> <br/> <br/>
      <button onClick={onLogin}>Login</button> <br/><br/>
      
        <label>If you don't have an account, <Link to = '/signup'>Signup</Link></label>
        
        
    </div>
    </center>
  )
}

export default SignupAndLogin;