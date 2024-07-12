import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signupUser } from '../../utils/authentic';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    if (signupUser(userName, email, password)) {
      navigate('/login');
    } else {
      alert('Signup failed');
    }
  };

  return (
    <div className="auth-container">
    <div className="auth-card">
      <div className="auth-card_title">
        <h1>Create Account</h1>
        <span>Already have an account? <Link to="/login">Sign In</Link></span>
      </div>
      <div className="auth-form">
        <form onSubmit={handleSignup}>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="  UserName"
            required
          />
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
          <button type="submit">Signup</button>
         
        </form>
      
      </div>
      <div className="auth-form_footer">
        <Link to="/" className="">Go back to home</Link>
        </div>
    </div>
   
  </div>
  );
};

export default Signup;