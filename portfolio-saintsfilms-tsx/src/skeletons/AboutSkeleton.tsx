import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AboutSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#e0e0e0" highlightColor="#c7c7c7">
      <Skeleton height={250} width="100%" /> {/* imagem */}
    </SkeletonTheme>
  );
};
export default AboutSkeleton;
