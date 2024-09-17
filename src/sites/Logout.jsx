import {useState, useEffect, useRef} from 'react'
import { useNavigate } from "react-router-dom";

function Logout() {
    const [logoutComplete, setLogoutComplete] = useState(false)
    const timerRef = useRef(null);
    const navigate = useNavigate()


  useEffect(() => {
    const token = localStorage.getItem("token")
    const response = fetch('https://davihanblogapi.adaptable.app/auth/refresh',{
      mode: "cors",
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }).then(response => {if(response.ok){
      localStorage.removeItem("token")
      setLogoutComplete(true)
    }
    else{
      localStorage.removeItem("token")
      throw new Error("Error logging out")
    }})
  });

  useEffect(() => {
    if(logoutComplete){
      timerRef.current = setTimeout(() => {
        navigate('/')
      }, 3000)
    }
  }, [logoutComplete, navigate]);

    if(!logoutComplete){
      return <>
        <div>
          <h1>Logging out, please wait</h1>
        </div>
      </>
    }

    return (
        <>
          <div>
            <h1>Logged out successfully</h1>
          </div>
        </>
    )
}

export default Logout
