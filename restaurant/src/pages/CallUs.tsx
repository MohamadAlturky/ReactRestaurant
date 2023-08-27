import "./callUs.css";
import NavBar from "../components/navBar/NavBar";

export default function CallUs() {
  return (
    <>
      <div className="d-flex justify-content-center ">
        <div className="hero new-background">
          <div className="filter"></div>
          <NavBar styles="top-nav-container" backgroundStyle=""></NavBar>
          <div className="notes">
            <div className="top-note"></div>
            <div className="down-note"></div>
          </div>
        </div>
      </div>
    </>
  );
}
