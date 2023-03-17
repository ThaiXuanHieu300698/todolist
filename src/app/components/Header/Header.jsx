import React, { useState } from "react";
import { Redirect } from "react-router";
import { useDispatch } from "react-redux";
import { logout } from "../../actions/userAction";
import "./style.css";
import { Link } from "react-router-dom";
import * as taskAction from "../../actions/taskAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = (props) => {
  const [searchString, setSearchString] = useState("");

  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    return <Redirect to="/login" />;
  }

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(taskAction.search(user.id, searchString));
  };

  return (
    <div className="header d-flex align-items-center justify-content-between">
      <div className="brand-name">
        <h6 className="m-0">
          <FontAwesomeIcon icon="th" style={{ marginRight: "15px" }} />
          <Link to="/task">To Do</Link>
        </h6>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-group m-0">
            <FontAwesomeIcon
              icon="search"
              style={{ position: "absolute", margin: "9px", color: "#3e69e4" }}
            />

            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="input-search"
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
            />
          </div>
        </form>
      </div>
      <div>
        <Link to={"/profile"}>{user.fullName}</Link>
        <a href="/login" className="ml-5" onClick={handleLogout}>
          Đăng xuất <span>&#8627;</span>
        </a>
      </div>
    </div>
  );
};

export default Header;
