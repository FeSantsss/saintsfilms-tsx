import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProjectBoxSkeleton = () => {
  return (
    <div
      style={{
        width: 300, // define o tamanho do card
        padding: 16,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        borderRadius: 12,
        backgroundColor: "#fff",
      }}
    >
      {/* imagem */}
      <Skeleton height={350} width="100%" />

      {/* título */}
      <Skeleton height={20} width="70%" style={{ marginTop: 10 }} />

      {/* descrição */}
      <Skeleton count={1} height={10} width="15%" style={{ marginTop: 6 }} />
    </div>
  );
};

export default ProjectBoxSkeleton;
