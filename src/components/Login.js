
// Login.js:
import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import './Login.css'; 
import { Auth } from '../Auth.jsx'; // Import the login function from your API file
import axios from 'axios'; // Import axios for making HTTP requests

const API_URL = 'http://localhost:5000/api/login'; // Replace with your actual backend URL

export const handleLogin = async (email, password) => {
    try {
        const response = await axios.post('${API_URL}/user', { email, password });
        return response.data;
    } catch (error) {
        throw error;
    }
};


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState('');
  const { login } = useAuth(); // Assuming you have a useAuth hook for authentication context
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    return newErrors;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
        setErrors(formErrors);
    } else {
        setErrors({});
        try {
            const userData = await handleLogin(email, password);
            navigate('/profile'); // Redirect to profile page after successful login
            console.log('Login successful:', userData);
            // Handle successful login (e.g., redirect, store token, etc.)
        } catch (error) {
            setErrors({ form: 'Login failed. Please try again.' });
        }
    }
};

  return (
   <div className="login-wrapper">
      <div className="login-form-container">
        <h2 className="login-title">Login</h2>
        <Form onSubmit={handleSubmit} className="login-form">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>


            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit" className="login-button">
            Login
          </Button>
        </Form>
      </div>
    </div>
            
  );
} 


export default Login;