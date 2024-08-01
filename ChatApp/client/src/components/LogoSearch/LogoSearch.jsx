import React from "react";
import Logo from "../../img/logo.png";
import './LogoSearch.css'
import { UilSearch } from '@iconscout/react-unicons'
import { useDispatch } from "react-redux";
import { logout } from "../../actions/AuthActions";
const LogoSearch = () => {
  const dispatch = useDispatch()

  const handleLogOut = () => {
    dispatch(logout())
  }
  return (
    <div className="LogoSearch">
      {/* <img src={Logo} alt="" /> */}
      <button className="button logout-button" onClick={handleLogOut}>Log Out</button>

    </div>
  );
};

export default LogoSearch;
