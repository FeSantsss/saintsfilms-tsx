import "../../assets/buttom.css";

interface propsBtn {
  text: string;
}

const Buttom = ({ text }: propsBtn) => {
  return <button className="button-box-design">{text}</button>;
};

export default Buttom;
