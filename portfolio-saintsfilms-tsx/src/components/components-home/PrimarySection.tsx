import ProjectBox from "./ProjectBox";

import "../../assets/primarySection.css";
import { useState, useEffect } from "react";
import SvgCircle from "./SvgCircle";
import ProjectBoxSkeleton from "../../skeletons/ProjectBoxSkeleton";
import { Link } from "react-router-dom";

const PrimarySection = () => {
  interface Image {
    id: number;
    image: string;
    content: string;
    slug: string;
  }

  const [projects, setProjects] = useState<Image[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("/ImagesPrimarySection.json")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error on images: " + error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <section className="container-primary">
        <div className="div-title">
          <div className="title-wrapper">
            <SvgCircle />
            <h2 className="title-section-one">nossos projetos</h2>
          </div>
        </div>

        <div className="div-cards">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <ProjectBoxSkeleton key={i} />
              ))
            : projects.map((project) => (
                <ProjectBox
                  action={`/projetos/${project.slug}`}
                  key={project.id}
                  image={project.image}
                  content={project.content}
                />
              ))}
        </div>
      </section>
    </>
  );
};

export default PrimarySection;
