import { useState } from "react";
import { useNavigate } from "react-router-dom";


function OnSignUpComponent() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [mobile, setMobile] = useState("")
    const [email, setEmail] = useState("")

    const navigate = useNavigate()

const onSignUp = async () => {
    const userDetails = {username : username, password : password, mobile : mobile, email : email}

    const url = 'http://localhost:8080/signup'

    const options = {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(userDetails)
    }

    console.log(options)

    const data = await fetch(url, options)
    const res = await data.json()
    console.log(res)
    if (res.status === 400) {
        alert('user already exist')
    }

    if (res.status === 200) {
        alert('user created successfully')
        navigate('/')

    }

}
    return (
    <center>
            <div>
        <label>Username</label> <br/> 
      <input type = "text" placeholder = "Enter your username" onChange={(event) => setUsername(event.target.value)}/> <br/> <br/>
      <label>Password</label> <br/>
      <input type = "password" placeholder = "Enter valid password" onChange={(event) => setPassword(event.target.value)}/> <br/> <br/>
      <label>Mobile</label> <br/> 
      <input type = "text" placeholder = "Enter your mobile" onChange={(event) => setMobile(event.target.value)}/> <br/> <br/>
      <label>EmailId</label> <br/> 
      <input type = "text" placeholder = "Enter your EmailId" onChange={(event) => setEmail(event.target.value)}/> <br/> <br/>
        <button type = "submit" onClick = {onSignUp}>Submit</button>
        </div>
    </center>
    )

    

}

export default OnSignUpComponent;

