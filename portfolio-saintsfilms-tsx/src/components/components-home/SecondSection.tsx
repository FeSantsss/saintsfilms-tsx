import "../../assets/secondSection.css";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import SecondSecSkeleton from "../../skeletons/SecondSecSkeleton";

interface IpropsImage {
  id: number;
  image: string;
  class: string;
}

const SecondSection = () => {
  const [images, setImages] = useState<IpropsImage[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("/ImagesSecondSection.json")
      .then((res) => res.json())
      .then((data) => {
        setImages(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("images not found: " + error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <section className="container-about">
        <motion.h3
          className="about-text-h3"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: false }}
        >
          <p>
            <strong>na Saints,</strong> <br />
            atuamos na construção intencional de imagem porque entendemos <br />
            que todo projeto nasce de posicionamento e clareza.
          </p>

          <p>
            trabalhamos próximos aos nossos clientes para definir o que precisa
            ser <br /> consolidado: autoridade, presença, relevância.
          </p>
        </motion.h3>

        <div className="images-review">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <SecondSecSkeleton key={i} />
              ))
            : images.map((image) => (
                <motion.img
                  src={image.image}
                  key={image.id}
                  className={image.class}
                  alt="image for review section"
                  initial={{
                    opacity: 0,
                    y: -50,
                    filter: "blur(20px)",
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                  }}
                  transition={{
                    duration: 1,
                    ease: "easeOut",
                  }}
                  viewport={{ once: false }}
                  loading="lazy"
                />
              ))}
        </div>
      </section>
    </>
  );
};

export default SecondSection;
