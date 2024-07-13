import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../utils/authentic';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginUser(email, password)) {
      navigate('/');
      window.location.reload();
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-card_title">
          <h1>Login</h1>
          <span>Don't have an account? <Link to="/signup">Sign Up</Link></span>
        </div>
        <div className="auth-form">
          <form onSubmit={handleLogin}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="  Email"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="  Password"
              required
            />
            <button type="submit">Login</button>
          </form>
          
        </div>
        <div className="auth-form_footer">
        <Link to="/" className="">Go back to home</Link>
        </div>
      </div>
      
    </div>
    
  );
};

export default Login;