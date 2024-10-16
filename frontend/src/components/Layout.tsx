import { Outlet, Link } from "react-router-dom";
import mainLogo from "../assets/logo.png";

export default function Layout() {
  return (
    <>
      <Link to="/">
        <img className="logo" src={mainLogo} alt="logo" />
      </Link>
      <Outlet />
    </>
  );
}
