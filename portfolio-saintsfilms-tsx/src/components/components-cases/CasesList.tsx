import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ProjectBoxSkeleton from "../../skeletons/ProjectBoxSkeleton";
import "../../assets/caseslist.css";
import { Link } from "react-router-dom";
interface Iproject {
  id: number;
  image: string;
  content: string;
  slug: string;
}

const CasesList = () => {
  const [projects, setProjects] = useState<Iproject[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("/ImagesPrimarySection.json")
      .then((res) => res.json())
      .then((image) => {
        setProjects(image);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <title>Saints Films | Projetos</title>
      <motion.section
        className="container-project"
        initial={{ opacity: 0, filter: "blur(10px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className="title-project">
          nossos <br /> projetos
        </h1>
      </motion.section>

      <section className="container-list-cards">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => (
              <ProjectBoxSkeleton key={i} />
            ))
          : projects.map((image) => (
              <Link to={`/projetos/${image.slug}`}>
                <motion.div
                  initial={{
                    opacity: 0,
                    y: -10,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 1,
                    ease: "easeIn",
                  }}
                  viewport={{ once: false }}
                  key={image.id}
                  className="div-case-card-list"
                >
                  <img
                    src={image.image}
                    alt="image case"
                    className="image-case-list"
                  />
                  <p className="content-case-list"> {image.content} </p>
                </motion.div>
              </Link>
            ))}
      </section>
    </>
  );
};

export default CasesList;
