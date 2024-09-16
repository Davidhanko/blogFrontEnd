import {useState} from 'react'
import styled from "styled-components";
import {Link} from "react-router-dom";

function PresetNav({children}){
    const Nav = styled.nav`
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

function Navbar({ calledFrom = 0 }) {
    //the number corresponds to what where it is called from
    // 0 = home page, 1 = register, 2 = login, 3 = signed in

    switch (calledFrom){
        case 0: return <PresetNav><Link to="/register">Login/Register</Link></PresetNav>
        case 1: return <PresetNav><Link to="/login">Login</Link></PresetNav>
        case 2: return <PresetNav><Link to="/register">Register</Link></PresetNav>
        case 3: return <PresetNav><Link to="/logout">Logout</Link></PresetNav>
        default: return <PresetNav><Link to="/register">Login/Register</Link></PresetNav>
    }
}

export default Navbar