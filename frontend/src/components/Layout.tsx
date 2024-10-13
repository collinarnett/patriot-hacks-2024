import { Outlet, Link } from "react-router-dom";
import mainLogo from "../assets/logo.png";

export default function Layout() {
  return (
    <div>
      <header>
        <nav>
          <Link to="/">
            <img src={mainLogo} alt="logo" />
          </Link>
        </nav>
      </header>
      <div>
        <main>
          <Outlet />
        </main>
      </div>
      <footer></footer>
    </div>
  );
}
