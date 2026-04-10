import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../assets/caseDynamic.css";

type imagesUrl = {
  imageUrl: string;
  type: string;
};

interface Iproject {
  title: string;
  slug: string;
  description: string;
  images: imagesUrl[];
}

const CaseDynamic = () => {
  const { slug } = useParams();
  const [project, setProject] = useState<Iproject | null>(null);

  useEffect(() => {
    fetch("/json-cases/casesProject.json")
      .then((res) => res.json())
      .then((data) => {
        const foundProject = data.find((item: Iproject) => item.slug === slug);
        if (foundProject) {
          setProject(foundProject);
          document.title = `${foundProject.title} | Saints Films`;
        } else {
          window.location.href = "/";
        }
      });
  }, [slug]);

  return (
    <>
      <section className="title-dynamic-container">
        <h1 className="title-dynamic">{project?.title}</h1>
        <p className="description-dynamic">{project?.description}</p>
      </section>
      <section className="content-dynamic-container">
        {project?.images.map((image, index) => (
          <div key={index} className={`card ${image.type || "vertical"}`}>
            <div className="dynamic-image-box">
              <img
                src={image.imageUrl}
                className="image-dynamic"
                alt="project image"
              />
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default CaseDynamic;
