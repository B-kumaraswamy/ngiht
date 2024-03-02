
import { Link, useNavigate } from "react-router-dom"
import Cookie from "js-cookie"
import { useAuthContext } from "./context"




function Headers() {
    const {setLoggedIn} = useAuthContext()
    const navigate = useNavigate()
    const onLogout = () => {
        Cookie.remove('jwt-token')
        navigate('/')
        setLoggedIn(false)


    
    }

    return(
        <center>
        <div >
            
            <Link to = '/home'>Home  </Link> &nbsp; &nbsp;
                
            
            <Link to = '/products'>Products</Link> &nbsp; &nbsp;
           

            
            <Link to = '/admin'>Admin</Link> &nbsp; &nbsp;

            <Link to = '/address'>Addresses</Link> &nbsp; &nbsp;
           

            
            <button onClick={onLogout}>Logout</button>
            
            
        </div>
        </center>
    )
}

export default Headers;