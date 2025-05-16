import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/img/argentBankLogo.png";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    localStorage.removeItem("authToken"); // attention à la casse ici
    navigate("/");
  };

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>

      <div>
        {token && user ? (
          <>
            <Link className="main-nav-item" to="/UserProfile">
              <i className="fa fa-user-circle" /> Hello, {user.userName || user.firstName}
            </Link>
            <Link className="main-nav-item" to="#" onClick={handleLogout}>
              <i className="fa fa-sign-out" /> Sign Out
            </Link>
          </>
        ) : (
          <Link className="main-nav-item" to="/sign-in">
            <i className="fa fa-user-circle" /> Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
