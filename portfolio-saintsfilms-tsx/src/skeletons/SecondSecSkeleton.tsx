import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SecondSecSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#e0e0e0aa" highlightColor="#c7c7c79e">
      <Skeleton height={200} width="100%" style={{ marginBottom: 20 }} />
    </SkeletonTheme>
  );
};

export default SecondSecSkeleton;
