import React from "react";
import { ThemeConsumer } from "../context/theme";
import { NavLink } from "react-router-dom";
import { FaLightbulb } from "react-icons/fa";
import { GiFlashlight } from "react-icons/gi";

const activeStyle = {
  color: "rgb(187,46, 31)",
};

function Nav() {
  return (
    <ThemeConsumer>
      {({ theme, toggleTheme }) => (
        <nav className="row space-between">
          <ul className="row nav">
            <li>
              <NavLink
                to="/"
                exact
                activeStyle={activeStyle}
                className="nav-link"
              >
                Popular
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/battle"
                activeStyle={activeStyle}
                className="nav-link"
              >
                Battle
              </NavLink>
            </li>
          </ul>
          <button
            style={{ fontSize: 30 }}
            className="btn-clear"
            onClick={toggleTheme}
          >
            {theme === "light" ? (
              <GiFlashlight color="rgb(255, 191, 116" size={40} />
            ) : (
              <FaLightbulb color="rgb(255, 255, 0" size={40} />
            )}
          </button>
        </nav>
      )}
    </ThemeConsumer>
  );
}

export default Nav;
