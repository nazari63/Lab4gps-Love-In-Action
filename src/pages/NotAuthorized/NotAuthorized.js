// src/pages/NotAuthorized/NotAuthorized.js

import React from 'react';
import { Link } from 'react-router-dom';
import '../../components/styles/NotAuthorized.css';

const NotAuthorized = () => {
  return (
    <div className="not-authorized">
      <h1>403 - Not Authorized</h1>
      <p>You do not have permission to access this page.</p>
      <Link to="/">Go to Home</Link>
    </div>
  );
};

export default NotAuthorized;
