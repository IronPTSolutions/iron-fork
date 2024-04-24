import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import AuthContext from "../../../contexts/auth.context";

import './navbar.css';

const renderNavLinkActive = ({ isActive }) => isActive ? 'nav-link active' : 'nav-link'

function Navbar() {
  const { user, doLogout } = useContext(AuthContext);

  return (
    <nav className="main-navbar navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <Link className="navbar-brand" to="/">Iron Fork | {user?.name}</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main-navbar" aria-controls="main-navbar" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="main-navbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><NavLink className={renderNavLinkActive} to="/">Restaurants</NavLink></li>
          </ul>
          <ul className="navbar-nav mb-2 mb-lg-0">
            {!user && (
              <>
                <li className="nav-item"><NavLink className={renderNavLinkActive} to="/register">Register</NavLink></li>
                <li className="nav-item"><NavLink className={renderNavLinkActive} to="/Login">Login</NavLink></li>
              </>
            )}
            {user && (
              <>
                <li className="nav-item"><button className="nav-link" onClick={doLogout}>Logout</button></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
