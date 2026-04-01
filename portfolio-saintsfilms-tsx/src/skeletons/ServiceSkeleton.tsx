import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ServiceSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#e0e0e0" highlightColor="#c7c7c7">
      <div className="service-box">
        <div className="div-for-content">
          <Skeleton height={30} width="60%" style={{ marginBottom: 8 }} />{" "}
          {/* título */}
          <Skeleton count={3} height={16} style={{ marginBottom: 6 }} />{" "}
          {/* texto */}
        </div>
        <div className="image-card-service-box">
          <Skeleton height={350} width="100%" /> {/* imagem */}
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default ServiceSkeleton;
