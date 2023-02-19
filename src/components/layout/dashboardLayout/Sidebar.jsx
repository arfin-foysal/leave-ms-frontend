import React from "react";
import { Link } from "react-router-dom";

function Sidebar({ item }) {
  if (item.children) {
    return (
      <li className="nav-item">
        <Link
          className="nav-link collapsed nav-hover"
          to="#"
          data-toggle="collapse"
          data-target={`#${item.UID}`}
          aria-expanded="true"
          aria-controls="collapseTwo"
        >
          {item.icon}
          <span className="font-style ms-1">{item.title}</span>
        </Link>
        <div
          id={item.UID}
          className="collapse"
          aria-labelledby="headingTwo"
          data-parent="#accordionSidebar"
        >
          <div className=" bg-primary sub-manu-bg py-2 collapse-inner rounded">
            {item.children.map((c, i) => (
              <Link key={i} className="sub-manu-style" to={`${c.link}`}>
                <span className="me-2">{c.icon}</span>

                {c.title}
              </Link>
            ))}
          </div>
        </div>
      </li>
    );
  } else {
    return (
      <li className="nav-item">
        <Link className="nav-link nav-hover" to={item.link}>
          {item.icon}
          <span className="font-style">{item.title}</span>
        </Link>
      </li>
    );
  }
}

export default Sidebar;
