import { NavLink } from "react-router-dom";

const NAV = [
  { to: "/", label: "Beranda", end: true },
  { to: "/kategori/5", label: "Politik" },
  { to: "/kategori/2", label: "Ekonomi" },
  { to: "/kategori/1", label: "Teknologi" },
  { to: "/kategori/3", label: "Olahraga" },
  { to: "/kategori/4", label: "Hiburan" },
];

export default function Header() {
  return (
    <header className="site-header">
      <div className="masthead">
        <p className="masthead-kicker">Portal berita independen</p>
        <NavLink to="/" className="brand">
          Nusantara News
        </NavLink>
        <p className="masthead-date">
          {new Intl.DateTimeFormat("id-ID", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          }).format(new Date())}
        </p>
      </div>
      <nav className="site-nav" aria-label="Kategori berita">
        {NAV.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
