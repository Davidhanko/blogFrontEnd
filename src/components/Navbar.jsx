import styled from "styled-components";
import {Link} from "react-router-dom";
import checkAuth from "./checkAuth.jsx";
import {createContext, useContext, useEffect, useState} from "react";
import Center from "./Center.jsx";

function PresetNav({children}){

    const Nav = styled.nav`
        position: sticky;
        top: 0;
        display: flex;
        flex-direction: row;
        justify-content: center;
        gap: 10vw;
        width: 100vw;
    `
    return (
        <Nav>
            <Link to="/">Home</Link>
            <Link to="/blogs">Blogs</Link>
            {children}
        </Nav>
    )
}



function Navbar({ calledFrom = 0}) { //Also responsible for deleting the token, "logout", from local storage if it is expired
    //the number corresponds to what where it is called from
    // 0 = home page, 1 = register, 2 = login, 3 = signed in
    const [authChecked, setAuthChecked] = useState(false);
    const [isAuth, setIsAuth] = useState(false)

    useEffect(() => {
        async function check(){
        const auth = await checkAuth()
        setIsAuth(auth)
        setAuthChecked(true)}
        check()
    }, []);

    if(authChecked && !isAuth){
        localStorage.removeItem("token")
    }

    if(isAuth){
        calledFrom = 3
    }

    switch (calledFrom){
        case 0: return <PresetNav><Link to="/register">Sign in</Link></PresetNav>
        case 1: return <PresetNav><Link to="/login">Log in</Link></PresetNav>
        case 2: return <PresetNav><Link to="/register">Sign in</Link></PresetNav>
        case 3: return <PresetNav><Link to="/logout">Logout</Link></PresetNav>
        default: return <PresetNav><Link to="/register">Sign in</Link></PresetNav>
    }
}

export default Navbar