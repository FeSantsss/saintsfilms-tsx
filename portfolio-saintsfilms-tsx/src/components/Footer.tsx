import { Link } from "react-router-dom";
import "../assets/footer-base.css";
import instagramIcon from "../images/instagram.png";
import telephoneIcon from "../images/telephone-call.png";

const Footer = () => {
  const whatsappBtn = () => {
    const numero: string = "558799742168";

    const texto: string = "Olá! Quero contratar um serviço Saints";

    // Redirecionamento externo
    window.open(`https://wa.me/${numero}?text=${texto}`, "_blank");
  };

  return (
    <footer id="sobre">
      <div className="container-division"></div>

      <section className="container-footer" aria-labelledby="footer-contact">
        <div className="footer-contact-menu-center">
          <Link className="link-interno-footer" to="/">
            início
          </Link>
          <Link className="link-interno-footer" to="/serviços">
            serviços
          </Link>
          <Link className="link-interno-footer" to="/projetos">
            projetos
          </Link>
          <Link className="link-interno-footer" to="/sobre">
            sobre
          </Link>

          <div className="container-contact-footer">
            <div className="div-for-img">
              <a
                href="https://www.instagram.com/saintsfilmsbr?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                className="link-externo"
              >
                <img
                  src={instagramIcon}
                  aria-label="Fale conosco pelo instagram!"
                  alt=""
                  className="icon-contact"
                />
              </a>
              <img
                src={telephoneIcon}
                onClick={whatsappBtn}
                aria-label="Fale conosco pelo whatsapp!"
                alt=""
                className="icon-contact"
              />
            </div>

            <div className="div-for-mail-and-location">
              <p className="mail-p">saintsfilmsbr@gmail.com</p>
              <p className="location-p">Custódia, PE</p>
            </div>
          </div>
        </div>

        <div className="container-division"></div>

        <p id="p-direitosreserv">
          Copyright © 2024-2026 Saints Films Digital (All Right Reserved) CNPJ:
          XX.XXX.XXX/XXXX-XX - Brasil
        </p>
      </section>
    </footer>
  );
};

export default Footer;
