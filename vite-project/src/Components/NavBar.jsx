import React from 'react';
import {Link} from "react-router-dom";
function NavBar(){
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className='container-fluid'>
        <a className="navbar-brand" href="#">QuickCart</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <Link className="nav-link" to="/Signup">Signup</Link>
      </li>
      <li className="nav-item active">
        <Link className="nav-link" to="/Login">Login</Link>
      </li>
      <li className="nav-item active">
        <Link className="nav-link" to="/AdminForm">AdminForm</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/admin/products">Products</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/admin/SignupUsers">See Users</Link>
      </li>

      
      
    </ul>
    <form className="d-flex">
       <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
       <button className="btn btn-outline-success" type="submit">Search</button>
    </form>

    

        </div>
  
  </div>
</nav>


    );
}
export default NavBar;