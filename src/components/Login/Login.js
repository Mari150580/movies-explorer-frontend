import "../Movies/Heading/Heading";
import logo from "../../images/logo__COLOR_main-1.svg";
import "../Register/Register.css";
import "../Login/Login.css";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="register">
      <header className="register__heading">
        <Link to="/">
          <img src={logo} alt="Логотип" className="register__heading_logo" />
        </Link>
        <h1 className="register__title">Рады видеть!</h1>
      </header>
      <form className="register__form">
        <h3 className="register__form-title">email</h3>
        <input
          type="email"
          className="login__form-name"
          name="email"
          placeholder="E-mail"
          minLength={2}
          maxLength={30}
          id="email"
          required=""
        />
        <hr className="login__form-email_line"></hr>
        <h3 className="register__form-title">Пароль</h3>
        <input
          type="password"
          className="login__form-name"
          name="password"
          placeholder="Пароль"
          minLength={4}
          maxLength={30}
          id="password"
          required=""
        />
        <hr className="login__form-email_line"></hr>
        <Link className="register__form-button_nav" to="/movies">
          <button className="register__form-button" type="submit">
            Войти
          </button>
        </Link>
        <div className="register__form-entrance">
          <p className="register__form-entrance_title">
            Ещё не зарегистрированы?
          </p>
          <button className="register__form-entrance_button" type="button">
            <Link className="register__form-entrance_button-text" to="/signup">
              Регистрация
            </Link>
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
