import { Link } from 'react-router-dom';
import { getCurrentUser, logout } from '../../utils/authentic';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

const currentUser = getCurrentUser();
console.log(currentUser)





const Navbar = () => {
  return (
    <nav className="navbar">
    
      <div className="nav-links">
        {currentUser ? (
          <>
            <Link to="/newblog">
              <div className="tooltip" title="Create a new post">
                <FontAwesomeIcon icon={faPlus} style={{ fontSize: "24px" }} />
              </div>
            </Link>
            <Link to="/">{currentUser.username}</Link>
            <Link to="/splash" onClick={logout}>
            <FontAwesomeIcon icon={faSignOutAlt} />
            </Link>
          </>
        ) : (
          <>

            <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
