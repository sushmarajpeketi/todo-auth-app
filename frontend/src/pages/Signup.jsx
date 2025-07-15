import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Signup.css';
import axios from '../axiosInstance';

const Signup = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const validateForm = () => {
  const { name, email, password } = form;

  if (!name || !email || !password) {
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
      const res = await axios.post('/api/signup', form);
      toast.success(res.data.message);
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <h2>Signup</h2>
        <input name="name" type="text" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
