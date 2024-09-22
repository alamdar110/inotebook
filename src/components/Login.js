import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [credentials, setCredentials] = useState({useroremail: "", password: ""});
    const handleInputChange = (e) => {
        setCredentials({...credentials, [e.target.id]: e.target.value});
    }
    const navigate = useNavigate();

    const host = "http://localhost:5000";
    const onSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting the form", (credentials));
        try {
            const apiUrl = `${host}/api/auth/login`;
            const headers = {
                "Content-Type": "application/json",
            }
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(credentials)
            });
            let json = await response.json();
            if(json.token) {
                    localStorage.setItem('token', json.token);
                    navigate("/");

            } else {
                    alert("Invalid credentials");
            }
        } catch (error) {
           alert("Invalid credentials");
        }
        
    }
    return ( 
        <form className="container my-3" onSubmit={onSubmit}>
        <h2>Login</h2>
        <div className="mb-3">
          <label htmlFor="useroremail" className="form-label">Email address</label>
          <input onChange={handleInputChange} type="text" className="form-control" id="useroremail" aria-describedby="email"/>
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input onChange={handleInputChange} type="password" className="form-control" id="password"/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}