import { motion } from "framer-motion";
import "../../assets/serviceBox.css";

interface IpropsService {
  title: string;
  description: string;
  image: string;
}

const ServiceBox = ({ title, description, image }: IpropsService) => {
  return (
    <motion.div
      className="service-box"
      initial={{
        opacity: 0,
        y: -5,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 1,
        ease: "easeIn",
      }}
      viewport={{ once: true }}
    >
      <div className="div-for-content">
        <h2 className="title-box-service">{title}</h2>
        <p className="text-box-service">{description}</p>
      </div>
      <div className="image-card-service-box">
        <img
          src={image}
          alt="service image"
          loading="lazy"
          className="img-box-service"
        />
      </div>
    </motion.div>
  );
};

export default ServiceBox;
