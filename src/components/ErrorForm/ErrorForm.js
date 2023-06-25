import "../ErrorForm/ErrorForm.css";
import { Link } from "react-router-dom";

function ErrorForm() {
  return (
    <section className="errorForm">
      <h1 className="errorForm__title">404</h1>
      <p className="errorForm__text">Страница не найдена</p>
      <Link className="errorForm__return" to="/">
        Назад
      </Link>
    </section>
  );
}

export default ErrorForm;
