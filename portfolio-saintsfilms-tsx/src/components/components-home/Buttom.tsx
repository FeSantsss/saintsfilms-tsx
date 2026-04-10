import { Link } from "react-router-dom";
import "../../assets/buttom.css";

interface propsBtn {
  action: string;
  text: string;
}

const Buttom = ({ action, text }: propsBtn) => {
  return (
    <Link to={action}>
      <button className="button-box-design">{text}</button>
    </Link>
  );
};

export default Buttom;
