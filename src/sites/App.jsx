import Navbar from "../components/Navbar.jsx";
import {useEffect, useState} from "react";
import UserProfile from "../components/UserProfile.jsx";
import checkAuth from "../components/checkAuth.jsx";

function App() {
    const [logged, setLogged] = useState(false) // I guess I could use only one State, and check if it is empty or not
    const [loaded, setLoaded] = useState(false)

        useEffect(() => {
            async function check(){
                const auth = await checkAuth()
                setLogged(auth)
                setLoaded(true)}
            check()
        }, []);

    if(!loaded){
        return null
    }

    return (
        <>
        <Navbar/>
            {logged && <UserProfile/>}
            {!logged && <div><h1>NOT LOGGED IN</h1></div>}
        </>
    )
}

export default App
