import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Search", path: "/search" },
    { name: "Tickets", path: "/tickets" },
  ];

  return (
    <nav
      className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 px-8 py-4 backdrop-blur-lg bg-white/50 border border-gray-200 rounded-xl shadow-lg transition-all duration-300 ${
        scrolled ? "scale-100 opacity-100 shadow-xl" : "scale-95 opacity-90"
      }`}
    >
      <ul className="flex items-center gap-10 text-lg font-semibold">
        {navItems.map((item) => (
          <li key={item.name}>
            <Link
              to={item.path}
              className={`px-6 py-2 rounded-lg text-gray-800 hover:text-blue-600 transition-colors duration-300 transform hover:scale-110 ${
                location.pathname === item.path
                  ? "bg-blue-600 text-white"
                  : "hover:bg-blue-100"
              }`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;