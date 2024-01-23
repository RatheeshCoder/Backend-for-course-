// Navbar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import img from '../../assets/profile.png'

const Navbar = ({ searchTerm, onSearchTermChange }) => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
      <NavLink to="/" className="btn btn-ghost text-xl">
                Couese App
               
              </NavLink>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
            value={searchTerm}
  onChange={(e) => onSearchTermChange(e.target.value)}
          />
        </div>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src={img}
              />
            </div>
          </div>
          <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
            <li>
              <NavLink to="/dashboard" className="justify-between">
                My Course
                <span className="badge">New</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
