import "../assets/header.css";
import saintslogo from "../images/saints-logo.png";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink, Link } from "react-router-dom";

const Header = () => {
  const [isOpen, setOpen] = useState<Boolean>(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  const toggleMenu = () => {
    setOpen((prev) => !prev);
  };

  return (
    <header>
      <section className="container-header">
        <Link to="/">
          <img
            className="logo-icon-saints"
            alt="logo saints"
            loading="lazy"
            src={saintslogo}
          />
        </Link>

        <div className="burguer-menu" onClick={toggleMenu}>
          <div className={isOpen ? "first-line active" : "first-line"}></div>
          <div className={isOpen ? "second-line active" : "second-line"}></div>
        </div>

        <AnimatePresence>
          <motion.nav
            className={isOpen ? "nav-header-menu is-open" : "nav-header-menu"}
            initial={{ opacity: 0, filter: "blur(20px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 0.5, ease: "easeIn" }}
          >
            <NavLink
              className={({ isActive }) =>
                isActive ? "link-interno" : "link-interno"
              }
              to="/"
              end
              onClick={() => setOpen(false)}
            >
              início
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? "link-interno" : "link-interno"
              }
              to="/serviços"
              onClick={() => setOpen(false)}
            >
              serviços
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? "link-interno" : "link-interno"
              }
              to="/projetos"
              onClick={() => setOpen(false)}
            >
              projetos
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? "link-interno" : "link-interno"
              }
              to="/sobre"
              onClick={() => setOpen(false)}
            >
              sobre
            </NavLink>
          </motion.nav>
        </AnimatePresence>
      </section>
    </header>
  );
};

export default Header;
