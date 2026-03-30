import { Link, useRouteError } from "react-router-dom";
import "../assets/errorPage.css";
import catError from "../images/cat-error.jpg";

const ErrorPage = () => {
  const error = useRouteError();

  console.error(error);

  return (
    <div className="div-error-page">
      <img src={catError} alt="image of cat for error page" />
      <h1 className="title-error-page">Oops!</h1>
      <p className="about-error-page">404 - Page Not Found</p>
      <Link to={"/"}>
        <button className="error-page-btn">Voltar para o Início</button>
      </Link>
    </div>
  );
};

export default ErrorPage;
