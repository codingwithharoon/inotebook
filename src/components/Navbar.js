import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Navbar = () => {
  let navigate = useNavigate();
  let location = useLocation();
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login'); // Redirect to login page after logout
  };

  // Effect to handle automatic logout when the component unmounts or the page is refreshed
  useEffect(() => {
    const handleRefresh = () => {
      localStorage.removeItem('token');
      navigate('/login'); // Redirect to login page after removing token
    };

    window.addEventListener('beforeunload', handleRefresh);

    return () => {
      window.removeEventListener('beforeunload', handleRefresh);
    };
  }, [navigate]);


  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link
          className="navbar-brand"
          to={isLoggedIn ? `/` : "/login"}
        >
          iNotebook
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === "/home" ? "active" : ""
                  }`}
                aria-current="page"
                to={!isLoggedIn ? "/login" : "/"}
              >
                Home
              </Link>
            </li>
            {/* Other nav items */}
          </ul>
          {isLoggedIn ? (
            <div className="d-flex">
              <button onClick={handleLogout} className="btn btn-warning">
                Log Out
              </button>
            </div>
          ) : (
            <form className="d-flex">
              <Link className="btn btn-primary mx-1" to="/login" role="button">
                Login
              </Link>
              <Link className="btn btn-primary mx-1" to="/signup" role="button">
                Sign Up
              </Link>
            </form>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
