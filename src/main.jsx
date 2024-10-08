import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BlogProvider } from './components/context/blogcontext';

ReactDOM.render(
  <React.StrictMode>
     <BlogProvider>
        <App />
     </BlogProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
