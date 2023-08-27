import toggler from "../../assets/toggler.svg";
import logo from "../../assets/logo.svg";
import smallLogo from "../../assets/smallLogosvg.svg";
import "./navbar.css";
import { useMediaQuery } from "@mui/material";
import { useContext } from "react";
import { ResourceContext } from "../../contexts/resource/ResourceContext";
import { Link, useNavigate } from "react-router-dom";
interface NavBarProps {
  styles: string;
  backgroundStyle: string;
}
function NavBar(props: NavBarProps) {
  const navigate = useNavigate();
  const resources = useContext(ResourceContext);
  const isSmallScreen = useMediaQuery("(max-width: 360px)");
  let classes =
    props.styles + " w-100 container-fluid " + props.backgroundStyle;
  let stylesForTheContainer =
    props.backgroundStyle + " navbar container p-0 top-nav-container";
  return (
    <>
      <div className={classes}>
        <div className="container p-0">
          <nav className={stylesForTheContainer}>
            <div className="container-fluid position-relative p-0">
              <a className="navbar-brand d-flex align-items-center" href="#">
                {isSmallScreen && (
                  <img className="ms-2" src={smallLogo} alt="gg" />
                )}
                {!isSmallScreen && <img src={logo} alt="" />}
              </a>

              <div className="ms-auto large-content">
                <span className="item">
                  <Link to={"/CallUs"} className="nav-link">
                    {resources.NavBar.callUs}
                  </Link>
                  {/* <a
                    className="nav-link"
                    onClick={() => {
                      navigate("/CallUs");
                    }}
                  >
                    {resources.NavBar.callUs}
                  </a> */}
                </span>
                <span className=" item">
                  <a className="nav-link" href="/">
                    {resources.NavBar.notificationsLink}
                  </a>
                </span>
                <span className=" item">
                  <a className="nav-link" href="/">
                    {resources.NavBar.notesLink}
                  </a>
                </span>
                <span className=" item">
                  <a className="nav-link" href="">
                    {resources.NavBar.mainPageLink}
                  </a>
                </span>
              </div>
              <button
                className="navbar-toggler p-0"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasNavbar"
                aria-controls="offcanvasNavbar"
                aria-label="Toggle navigation"
              >
                <span>
                  <img src={toggler} alt="" />
                </span>
              </button>
              <div
                className="offcanvas offcanvas-end"
                tabIndex={-1}
                id="offcanvasNavbar"
                aria-labelledby="offcanvasNavbarLabel"
              >
                <div className="offcanvas-header">
                  <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                    <div className="d-flex justify-content-center w-100">
                      <img src={logo} alt="" />
                    </div>
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="offcanvas-body">
                  <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                    <a className="nav-link ms-auto" href="/">
                      {resources.NavBar.mainPageLink}
                    </a>
                    <a
                      className="nav-link ms-auto"
                      onClick={() => {
                        navigate("/CallUs");
                      }}
                    >
                      {resources.NavBar.callUs}
                    </a>
                    <a className="nav-link ms-auto" href="/">
                      {resources.NavBar.notificationsLink}
                    </a>
                    <a className="nav-link ms-auto" href="/">
                      {resources.NavBar.notesLink}
                    </a>
                  </ul>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
      <div className="spacer-for-nav"></div>
    </>
  );
}
export default NavBar;
