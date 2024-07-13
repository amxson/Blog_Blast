import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faBars, faPalette, faBolt, faCarAlt, faRunning, faUtensils, faMusic, faQuestion, faHome } from '@fortawesome/free-solid-svg-icons';
import { BlogContext } from '../context/blogcontext';

const categories = [
  { id: 1, name: 'Art', icon: faPalette },
  { id: 2, name: 'Cars', icon: faCarAlt },
  { id: 3, name: 'Fitness', icon: faRunning },
  { id: 4, name: 'Food', icon: faUtensils },
  { id: 5, name: 'Music', icon: faMusic },
  { id: 6, name: 'sss', icon: faQuestion },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { selectedCategory, setSelectedCategory } = useContext(BlogContext);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleHome = () => {
    window.location.reload()
  }

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h1>
          
            <Link to="/"><FontAwesomeIcon icon={faBolt} /> BlogBLAST</Link>
          </h1>
          <button className="toggle-btn" onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
        <div className="homee">
        <FontAwesomeIcon icon={faHome} /> 
        <span onClick={() => handleHome()}> Home</span>
        </div>
      
          <p className='catee'>Discover categories</p>
        {categories.map((category) => (
          <Link
            key={category.id}
            to="/"
            onClick={() => handleCategoryClick(category)}
            className={selectedCategory?.name === category.name ? 'active' : ''}
          >
            <FontAwesomeIcon icon={category.icon} />
            <span>{category.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
