import "../../assets/hero.css";

import { motion } from "framer-motion";

const Hero = () => {
  return (
    <>
      <section className="hero-container">
        <motion.h1
          className="slogan-text"
          initial={{
            opacity: 0,
            x: -20,
            filter: "blur(10px)",
          }}
          whileInView={{
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
          }}
          transition={{
            duration: 1,
            ease: "easeInOut",
          }}
          viewport={{ once: true }}
        >
          imagem, <br />
          presença & <br />
          posicionamento.
        </motion.h1>

        <div className="dicionary-design">
          <p className="saints-dicionary-name">saints.</p>

          <div className="dicionary">
            <p>/seints/ s. f.</p>
            <br />
            <ol>
              <li>construção estratégica de imagem;</li>
              <li>definição intencional de presença;</li>
              <li>narrativa aplicada ao posicionamento.</li>
            </ol>

            <p>sinônimos: estratégia, autoridade e percepção.</p>

            <p>não foi apenas um vídeo. foi Saints.</p>

            <p>Saints Films</p>

            <p>
              onde marcas deixam de aparecer <br /> e começam a ser percebidas.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
