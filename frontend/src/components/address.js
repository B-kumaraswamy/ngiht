import Cookie from "js-cookie";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Headers from "./header";
import axios from 'axios';

function AddressComponent() {
    const [loading, setLoading] = useState(true)
    const [flag, setFlag] = useState(0)
    const token = Cookie.get('jwt-token')
    const url = 'http://localhost:8080/address'
    /*const options = {
        method : 'GET',
        headers : {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${token}`
        }
       
    } */
   

    const headers = {
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${token}`

    }

    useEffect(() => {
        
        const fetchData = async () => {
           try {
               /* const data = await fetch(url, options)
                const res = await data.json() */
                console.log('going inside axios try')
                const response = await axios.get(url, headers)
                console.log('axios response', response)
                const res =  response.data
                console.log('axios res', res)
        
                if(res.status === 200) {
                    setLoading(false)
                }
               else if (res.status === 401) {
                    setFlag(1)                   
                }     
            }
            catch(err) {
               
               // alert ('unauthorised user because of', err)
                setFlag(1)
                //return <Navigate to = '/'/>
            }
        }
        fetchData()
    }
    //() => {} removes the sideEffect mentioned in the useEffect
    )

   

     if (flag === 1){
        return <Navigate to = '/'/>
    }
    else if (loading && flag === 0) {
        return <center>Loading....</center>
    }
    return (
        <center>
            <Headers/>
            <h1>
                Street name 
            </h1>

            <p> Town</p>
        </center>
    )
} 

export default AddressComponent;