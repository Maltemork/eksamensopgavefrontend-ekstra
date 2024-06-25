import { useState } from "react";
import "./Sidebar.css";
import { Link, NavLink, useLocation } from "react-router-dom";
import React from "react";
import { SidebarData } from "./SidebarData";
import RunCircleIcon from "@mui/icons-material/RunCircle";

function Sidebar() {
  const location = useLocation();
  //Close sidebar on load
  const [isOpen, setIsOpen] = useState(() => {
    return false;
  });
  //Swap open state based on previous value.
  const toggle = () => {
    setIsOpen((prevIsOpen: unknown) => !prevIsOpen);
  };

  // Sidebar list and HTML.
  const sidebarList = SidebarData.map((item, key) => {
    return (
      <li
        key={key}
        id={item.title}
        className={
          location.pathname.startsWith(item.route) ? "row active" : "row"
        }
      >
        <Link to={item.route}>
          <div className="row-icon" key={key}>
            {item.icon}
          </div>
          <div
            className="row-title"
            style={{ display: isOpen ? "block" : "none" }}
          >
            <p>{item.title}</p>
          </div>
        </Link>
      </li>
    );
  });

  // Render HTML.
  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  return (
    <div>
      <div
        className="Sidebar"
        style={{ width: isOpen ? "250px" : "75px" }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={toggle}
      >
        <ul className="SidebarList">
          <li
            id="sidebar-logo"
            className={location.pathname === "/" ? "row active" : "row"}
          >
            <NavLink to="/">
              <RunCircleIcon className="row-icon" id="running-logo-thing" />
              <div
                className="row-title"
                style={{ display: isOpen ? "block" : "none" }}
              >
                <p>Athletics Tracker</p>
              </div>
            </NavLink>
          </li>

          {sidebarList}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
