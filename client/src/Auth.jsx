import React, { useState } from 'react';
import axios from 'axios';

function Auth({ onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
        localStorage.setItem('token', response.data.token);
        setMessage("Login successful!");
        onLoginSuccess();
      } else {
        await axios.post('http://localhost:5000/api/auth/signup', { name, email, password });
        setMessage("Signup successful! Please login.");
        setIsLogin(true);
      }
    } catch (err) {
      setMessage(err.response?.data?.error || "An error occurred");
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
      <h2>{isLogin ? 'Login' : 'Signup'}</h2>
      {message && <p style={{ color: 'red' }}>{message}</p>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {!isLogin && (
          <input 
            type="text" 
            placeholder="Name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
            style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        )}
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button type="submit" style={{ padding: '10px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          {isLogin ? 'Login' : 'Signup'}
        </button>
      </form>
      <p style={{ marginTop: '15px', textAlign: 'center', cursor: 'pointer', color: '#007bff' }} onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Don't have an account? Signup" : "Already have an account? Login"}
      </p>
    </div>
  );
}

export default Auth;