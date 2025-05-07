
import React from "react";
import "../Style/index.scss"; // si tu veux ajouter des styles
import logo from '../assets/img/argentBankLogo.png';
const Navbar = () => {
  return (
    <nav className="main-nav">
      <a className="main-nav-logo" href="/">
      <img
  className="main-nav-logo-image"
  src={logo}
  alt="Argent Bank Logo"
/>
        <h1 className="sr-only">Argent Bank</h1>
      </a>
      <div>
        <a className="main-nav-item" href="/sign-in">
          <i className="fa fa-user-circle" id ="icon-spacing"></i> 
         Sign In
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
