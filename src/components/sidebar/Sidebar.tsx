import { useState } from "react";
import "./Sidebar.css";
import { Link, NavLink, useLocation } from "react-router-dom";
import React from "react";
import { SidebarData } from "./SidebarData";

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
      <React.Fragment key={key}>
        {
          // Check item.role and if user is logged in, the item should be shown if the user has the role.
          <li
            key={key}
            id={item.title}
            className={
              location.pathname.includes(String(item.route))
                ? "row active"
                : "row"
            }
          >
            <Link to={String(item.route)}>
              <div className="row-icon" key={key}>
                {" "}
                {item.icon}{" "}
              </div>
              <div
                className="row-title"
                style={{ display: isOpen ? "block" : "none" }}
              >
                <p>{item.title}</p>
              </div>
            </Link>
          </li>
        }
      </React.Fragment>
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
              <img src="../../../public/Logo.png" alt="" className="row-icon" />
              <div
                className="row-title"
                style={{ display: isOpen ? "block" : "none" }}
              >
                <p>Kea Bowling</p>
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
