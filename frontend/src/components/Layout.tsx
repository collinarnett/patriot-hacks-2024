import { Outlet, Link } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <header>
        <nav>
        </nav>
      </header>
        <main>
          <Outlet />
        </main>
      <footer></footer>
    </div>
  );
}
