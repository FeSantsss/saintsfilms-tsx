import { useEffect, useState } from "react";
import "../assets/service.css";
import ServiceBox from "../components/components-service/ServiceBox";
import ServiceSkeleton from "../skeletons/ServiceSkeleton"; // import skeleton
import { motion } from "framer-motion";

interface IpropsImageS {
  id: number;
  title: string;
  description: string;
  image: string;
}

const Service = () => {
  const [images, setImages] = useState<IpropsImageS[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("/imagesService.json")
      .then((res) => res.json())
      .then((data) => {
        setImages(data);
        setLoading(false); // dados carregaram
      });
  }, []);

  return (
    <>
      <title>Saints Films | Serviços</title>
      <motion.section
        className="container-service"
        initial={{ opacity: 0, filter: "blur(10px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className="title-service">
          nossos <br /> serviços
        </h1>
        <p className="text-service">
          não oferecemos “pacotes”. <br />
          estruturamos presença em diferentes níveis de profundidade.
        </p>
      </motion.section>

      <div className="services-section">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => <ServiceSkeleton key={i} />)
          : images.map((image) => (
              <ServiceBox
                key={image.id}
                title={image.title}
                description={image.description}
                image={image.image}
              />
            ))}
      </div>
    </>
  );
};

export default Service;
