
import { useAuthContext } from "./context"
import { Navigate } from "react-router-dom"
import Cookie from "js-cookie";
import { useEffect, useState} from "react";


function ProtectedRoute(props) {
    const [Loading, setLoading] = useState(true)
    
    const {loggedIn, setLoggedIn} = useAuthContext();
    
    const { component } = props;
    const Component = component;
    console.log('protected compo', Component)
   
    useEffect(() => {
        const token = Cookie.get('jwt-token');
        if (token) {
          // Check token validity (e.g., expiration) here if needed
          setLoggedIn(true);

        }
        
        else {
            setLoggedIn(false)
        }
        setLoading(false)
      }, [setLoggedIn]); 

    console.log("Logged in status from protectRoute ", loggedIn);

    if (Loading) {
        return <div>Loading....</div>
    }

    
    return loggedIn ? <Component/> : <Navigate to = '/'/>
    
      
}

export default ProtectedRoute;

