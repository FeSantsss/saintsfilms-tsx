import ProjectBox from "./ProjectBox";

import "../../assets/primarySection.css";
import { useState, useEffect } from "react";

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
            <h2 className="title-section-one">nossos projetos</h2>

            <svg viewBox="0 0 200 200" className="circle">
              <defs>
                <path
                  id="circlePath"
                  d="M 100, 100
                    m -75, 0
                    a 75,75 0 1,1 150,0
                    a 75,75 0 1,1 -150,0"
                />
              </defs>

              <text>
                <textPath href="#circlePath">
                  saints • saints • saints • saints • saints • saints •
                </textPath>
              </text>
            </svg>
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
