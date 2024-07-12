import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { useNavigate } from 'react-router-dom';
import { faBolt } from '@fortawesome/free-solid-svg-icons';

library.add(fab);



const Splash = () => {
    const navigate = useNavigate();

const handleGetStarted = () => {
  navigate('/signup');
};

const handleLogin = () => {
  navigate('/login');
};
    return (
      <div className="splash-container">
        <div className="splash-logo"><FontAwesomeIcon icon={faBolt} /> Blog BLAST</div>
         <p className='splash-text'>Join our community in just a few clicks</p>
        <div className="splash-buttons">
        <button onClick={handleGetStarted}>Get Started</button>
        <button onClick={handleLogin}>LOGIN</button>
        </div>
        <div className="splash-social-links">
          <a href="#" target="_blank">
            <FontAwesomeIcon icon={['fab', 'twitter']} />
          </a>
          <a href="#" target="_blank">
            <FontAwesomeIcon icon={['fab', 'facebook-f']} />
          </a>
          <a href="#" target="_blank">
            <FontAwesomeIcon icon={['fab', 'instagram']} />
          </a>
        </div>
        <div>
          <p className="splash-copyright">&copy; 2024 Blog BLAST. All rights reserved.</p>
        </div>
      </div>
    );
  };

export default Splash;