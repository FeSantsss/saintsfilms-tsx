import ProjectBox from "./ProjectBox";

import "../../assets/primarySection.css";
import { useState, useEffect } from "react";
import SvgCircle from "./SvgCircle";

const PrimarySection = () => {
  interface Image {
    id: number;
    image: string;
    content: string;
  }

  const [projects, setProjects] = useState<Image[]>([]);

  useEffect(() => {
    fetch("/ImagesPrimarySection.json")
      .then((res) => res.json())
      .then((data) => setProjects(data));
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
          {projects.map((project) => (
            <ProjectBox
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
