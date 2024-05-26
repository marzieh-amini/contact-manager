import { PURPLE, BACKGROUND } from "../helpers/colors";
import { Link, useLocation } from "react-router-dom";

import { SearchContact } from "./index";
const Navbar = () => {
  const location = useLocation();
  return (
    <nav
      className="navbar navbar-dark navbar-expand-sm shadow-lg"
      style={{ backgroundColor: BACKGROUND }}
    >
      <div className="container">
        <div className="row w-100">
          <div className="col">
            <div className="navbar-brand">
              <Link to="/">
                <i style={{ color: PURPLE }} className="fa fa-id-badge"></i>
                <span className="mx-2">
                  وب اپیکیشن مدیریت{" "}
                  <span style={{ color: PURPLE }}>مخاطبین</span>
                </span>
              </Link>
            </div>
          </div>
          {location.pathname === "/contacts" ? (
            <div className="col">
              <SearchContact />
            </div>
          ) : null}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
