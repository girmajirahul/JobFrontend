import { useCallback, useMemo, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";


const MENU_ITEMS = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "For Candidates",
    path: "/candidates",
  },
  {
    name: "For Employers",
    path: "/employers",
  },
];

const ROLE_DASHBOARD = {
  jobseeker: "/dashboard/student",
  employer: "/dashboard/employer",
  admin: "/dashboard/admin",
};

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const dashboardPath = useMemo(
    () => ROLE_DASHBOARD[user?.role],
    [user]
  );

  const closeSidebar = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  const handleNavigate = useCallback(
    (path) => {
      navigate(path);
      closeSidebar();
    },
    [navigate, closeSidebar]
  );

  const handleLogout = useCallback(() => {
    logout();
    navigate("/login");
  }, [logout, navigate]);

  const NavigationLinks = () => (
    <>
      {MENU_ITEMS.map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          className={({ isActive }) =>
            `hover:text-purple-600 transition ${
              isActive ? "text-purple-600" : ""
            }`
          }
          onClick={closeSidebar}
        >
          {item.name}
        </NavLink>
      ))}
    </>
  );

  const AuthButtons = () => {
    if (!user) {
      return (
        <>
          <button
            onClick={() => handleNavigate("/signup")}
            className="px-4 py-2 rounded-lg border border-purple-600 text-purple-600 hover:bg-purple-50"
          >
            Sign Up
          </button>

          <button
            onClick={() => handleNavigate("/login")}
            className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700"
          >
            Login
          </button>
        </>
      );
    }

    return (
      <>
        <button
          onClick={() => handleNavigate(dashboardPath)}
          className="px-4 py-2 rounded-lg border border-purple-600 text-purple-600 hover:bg-purple-50"
        >
          Dashboard
        </button>

        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700"
        >
          Logout
        </button>
      </>
    );
  };

  return (
    <>
      <nav className="fixed top-0 left-0 z-50 w-full bg-white shadow">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <Link to="/">
            <img
              src="/images/logo.png"
              alt="Job Portal"
              className="w-40"
            />
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <NavigationLinks />
          </div>

          <div className="hidden gap-3 md:flex">
            <AuthButtons />
          </div>

          <button
            aria-label="Open Menu"
            onClick={() => setSidebarOpen(true)}
            className="text-2xl md:hidden"
          >
            ☰
          </button>
        </div>
      </nav>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40"
          onClick={closeSidebar}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-lg transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-xl font-bold text-purple-600">
            Menu
          </h2>

          <button
            aria-label="Close Menu"
            onClick={closeSidebar}
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col gap-5 p-4">
          <NavigationLinks />
        </div>

        <div className="space-y-3 border-t p-4">
          <AuthButtons />
        </div>
      </aside>
    </>
  );
};

export default Navbar