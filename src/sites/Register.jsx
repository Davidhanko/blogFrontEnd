import {useEffect, useState} from 'react';
import Navbar from "../components/Navbar.jsx";
import checkAuth from "../components/checkAuth.jsx";
import {useNavigate} from "react-router-dom";

function Form() {
    const [error, setError] = useState("");
    const [responseJson, setResponseJson] = useState(null);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirm_password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData, [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const urlEncodedData = new URLSearchParams(formData).toString();
        try {
            const response = await fetch('https://davihanblogapi.adaptable.app/auth/register', {
                mode: 'cors',
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: urlEncodedData
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            const token = result.token;
            localStorage.setItem('token', token);
            setResponseJson(result); // Set response JSON on success
            setError(""); // Clear error message on success
        } catch (e) {
            console.error("Error submitting form: ", e);
            setError(`Error submitting form: ${e}`);
            setResponseJson(null); // Clear response JSON on error
        }
    };

    if(!AuthCheck){
        return null;
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:<input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    /></label>
                </div>
                <div>
                    <label>E-mail:<input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    /></label>
                </div>
                <div>
                    <label>Password:<input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    /></label>
                </div>
                <div>
                    <label>Confirm Password:<input
                        type="password"
                        id="confirm_password"
                        name="confirm_password"
                        value={formData.confirm_password}
                        onChange={handleChange}
                    /></label>
                </div>
                <button type="submit">Submit</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {responseJson && <pre>{JSON.stringify(responseJson, null, 2)}</pre>}
        </>
    );
}

function Register() {
    const [AuthCheck, setAuthCheck] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if(checkAuth){
            navigate('/')
        }
        setAuthCheck(true)
    }, [navigate]);

    if(!AuthCheck){
        return null
    }

    return (
        <>
            <Navbar calledFrom={1} />
            <Form />
        </>
    );
}

export default Register;