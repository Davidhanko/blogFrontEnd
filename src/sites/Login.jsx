import {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from "../components/Navbar.jsx";
import checkAuth from "../components/checkAuth.jsx";


function Form() {
    const [error, setError] = useState("")
    const [responseJson, setResponseJson] = useState(null)
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData, [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const urlEncodedData = new URLSearchParams(formData).toString()
        try {
            const response = await fetch("https://davihanblogapi.adaptable.app/auth/login", {
                mode: 'cors',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: urlEncodedData
            })
            if (!response.ok) {
                throw new Error("Network response was not ok")
            }
            const result = await response.json()
            const token = result.token
            localStorage.setItem('token', token)
            setResponseJson(result)
            setError("")
        } catch (e) {
            console.error("Error submitting form: ", e)
            setError(`Error submitting form: ${e}`)
            setResponseJson(null)
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div>
                    <label>Password:
                        <input
                            type="text"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <button type="submit">Submit</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {responseJson && <pre>{JSON.stringify(responseJson, null, 2)}</pre>}
        </>
    )
}


function Login() {
    const [AuthCheck, setAuthCheck] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if(checkAuth){
            navigate('/')
        }
        setAuthCheck(true)
    }, [navigate]);

    if(!AuthCheck){
        return null;
    }

    return (
        <>
        <Navbar calledFrom={2}></Navbar>
        <Form />
        </>
    )
}

export default Login
