import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Login.css';
import axios from '../axiosInstance';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const validateForm = () => {
  const { email, password } = form;

  if (!email || !password) {
    toast.error("All fields are required");
    return false;
  }

  if (!email.includes("@") || !email.includes(".")) {
    toast.error("Please enter a valid email");
    return false;
  }

  if (password.length < 4) {
    toast.error("Password must be at least 6 characters");
    return false;
  }

  return true;
};


  const handleSubmit = async e => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const res = await axios.post('/api/login', form);
      localStorage.setItem('token', res.data.token);
      toast.success('Login successful');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="login-page-container">
      <form onSubmit={handleSubmit} className="login-box">
        <h2 className="login-title">Login</h2>
        <input name="email" type="email" onChange={handleChange} placeholder="Email" required className="login-input" />
        <input name="password" type="password" onChange={handleChange} placeholder="Password" required className="login-input" />
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
};

export default Login;
