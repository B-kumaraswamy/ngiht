import Headers from "./header"
//import Cookie from "js-cookie";
import { useState } from "react";
import axios from 'axios';
import { Navigate } from "react-router-dom";
function Admin() {
    const [product, setProduct] = useState({id : "", title : "", price : "", vendor : "", imageUrl : ""})
    const [flag, setFlag] = useState(0)
    const [file, setFile] = useState(null)

    const onUpdatingState = (key, value) => {
        console.log('key in function', key, 'value is', value)
        setProduct((prevProduct) => ({
            ...prevProduct,
        [key] : value


        }))

    }


    const onSubmit = async() => {
        const url = 'http://localhost:8080/products'
        //const jwtToken  = Cookie.get('jwt-token')
        const options = {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(product)

        }

        const data = await fetch(url, options)
        const res = await data.json()
        console.log('res from backend is', res)

        if(res.status === 200) {
            alert('product added to db successfully')
        }
        else if (res.status === 400) {
            alert(res.message)
        }

        else {
            console.log('error', res.message)
        }

        setProduct({id : "", title : "", price : "", vendor : "", imageUrl : ""})
    }

    const onUpdate = async() => {
        const url = 'http://localhost:8080/products'
        const options = {
            method : 'PUT',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(product)
        }

        const data = await fetch(url, options)
        const res = await data.json()
        if(res.status === 200) {
            alert('product updated successfully')
        }
        else {
            alert('Error in updating the product')
        }
       setProduct({id : "", title : "", price : "", vendor : "", imageUrl : ""})
    }

    const onDelete = async() => {
        const inputId = prompt("Please enter the product id");
        try {
            const url = `http://localhost:8080/products?id=${inputId}`
            //Axios doesn't handle the request body for DELETE requests in the same way it does for POST and PUT requests. 
            //Instead, you should pass the parameters directly in the URL or as query parameters.
        const response = await axios.delete(url)
        const res = response.data 
        
        if(res.status === 200) {
            alert(res.message)
        } 
        else {
            alert(res.message)
        }
        }

        catch(err) {
            alert(err)
        }
    }

    const onUploadingFile = async() => {
        try {
            const url = 'http://localhost:8080/products/bulk'
        const formData = new FormData()
        formData.append("file", file )
        const headers = {
            'Content-Type' : 'multipart/form-data'
        }

        console.log(" formdata frontend is", formData)
        const response = await axios.post(url,  formData, {headers})
        console.log('response from the backend', response)
        const data = response.data
        console.log('today data from backend file', data)

        if(data.status === 200) {
            setFlag(1)
        }

        else if(data.status === 400) {
            console.log(data.message)
            alert(data.message)
        }
        else{
            alert(data.message)
        
        }

        }

        catch(err) {
            alert('error in receiving from backend', err)
        }

    }
    if (flag === 1) {
        
        return <Navigate to = '/products'/>
    }

    return (
        <center>
            <Headers/>
            <label>id  </label> 
            <input type="text" value = {product.id} onChange={(event) => onUpdatingState('id', event.target.value)}/> <br/> <br/>
            <label>title  </label>
            <input type="text" value = {product.title}onChange={(event) => onUpdatingState('title' ,event.target.value)}/> <br/> <br/>
            <label>price  </label>
            <input type="text" value = {product.price} onChange={(event) => onUpdatingState('price' , event.target.value)}/> <br/> <br/>
            <label>vendor  </label>
            <input type="text" value = {product.vendor} onChange={(event) => onUpdatingState('vendor' , event.target.value)}/> <br/> <br/>
            <label>imageUrl  </label>
            <input type="text" value = {product.imageUrl} onChange={(event) => onUpdatingState('imageUrl' , event.target.value)}/> <br/> <br/>
            <button onClick={onSubmit}>Submit</button> &nbsp; &nbsp;
            <button onClick={onUpdate}>Update</button> &nbsp; &nbsp;
            <button onClick={onDelete}>Delete</button> <br/> <br/>
            <a href= {`${process.env.PUBLIC_URL}/sampleFile.csv`} download="sampleFile.csv">  <button>Download sample file</button>  </a> <br/> <br/>

            <input type = "file" onChange = {event => setFile(event.target.files[0])} accept=".csv"/>  <br/> <br/>
            <button onClick={onUploadingFile}>Upload File</button>




        </center>
    )
}

export default Admin;

// Todi list:  error handling in the bulk api upon uploading a file with duplicate entries.