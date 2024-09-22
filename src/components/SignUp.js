import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
    const navigate = useNavigate();
    const host = "http://localhost:5000";

    const [credentials, setCredentials] = useState({username: "", email: "", password: "", cpassword: ""});
    const handleChange = (e) => {
        setCredentials({...credentials, [e.target.id]: e.target.value});
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        const {username, email, password} = credentials;
        console.log("Submitting the form", (credentials));
        try {
            const apiUrl = `${host}/api/auth/create`;
            const headers = {
                "Content-Type": "application/json",
            }
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: headers,
                body: JSON.stringify({username, email, password})
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
  <div className="container">
    <h1>SignUp</h1>
    <form onSubmit={onSubmit}>
    <div className="mb-3">
    <label htmlFor="username" className="form-label">Username</label>
        <input type="username" className="form-control" onChange={handleChange} id="username" aria-describedby="username"/>
    </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email address</label>
        <input type="email" className="form-control" onChange={handleChange} id="email" aria-describedby="email"/>
        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input type="password" className="form-control" onChange={handleChange} id="password" minLength={5}/>
      </div>
      <div className="mb-3">
        <label htmlFor="cpassword" className="form-label">Confirm Password</label>
        <input type="password" className="form-control" onChange={handleChange} id="cpassword" minLength={5}/>
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  </div>
  )
}
