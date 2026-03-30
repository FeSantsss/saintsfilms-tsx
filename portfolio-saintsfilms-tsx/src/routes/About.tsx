import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import "../assets/about-page.css";

interface IpropsImage {
  image: string;
  className: string;
}

const About = () => {
  const [teamImage, setTeamImage] = useState<IpropsImage[]>([]);

  useEffect(() => {
    fetch("/imageAbout.json")
      .then((res) => res.json())
      .then((data) => setTeamImage(data));
  }, []);

  return (
    <>
      <title>Saints Films | Sobre</title>
      <motion.div
        className="section-about"
        initial={{ opacity: 0, filter: "blur(10px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2>
          <p className="title-about-page">somos a saints.</p>
          <p className="text-about-page">
            A Saints é uma produtora audiovisual orientada a posicionamento.
          </p>
          <p className="text-about-page">
            Atuamos na construção estratégica de imagem para marcas, empresas e
            profissionais que precisam consolidar presença com clareza e
            direção.
          </p>
          <p className="text-about-page">
            Com abordagem estética intencional, desenvolvemos filmes, coberturas
            e narrativas visuais alinhadas a objetivos de percepção e
            autoridade.
          </p>
          <p className="text-about-page">
            Cada projeto é estruturado com consistência e propósito, para
            transformar imagem em presença.
          </p>
        </h2>

        {teamImage.map((image, index) => (
          <img
            key={index}
            src={image.image}
            className={image.className}
            alt="saints team image"
          />
        ))}
      </motion.div>
    </>
  );
};

export default About;
