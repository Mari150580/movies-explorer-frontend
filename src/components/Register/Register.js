import "../Movies/Heading/Heading";
import "../Register/Register.css";
import React from "react";
import logo from "../../images/logo__COLOR_main-1.svg";
import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="register">
      <header className="register__heading">
        <Link to="/" className="register__heading-link">
          <img src={logo} alt="Логотип" className="register__heading_logo" />
        </Link>
        <h1 className="register__title">Добро пожаловать!</h1>
      </header>

      <form className="register__form">
        <h3 className="register__form-title">Имя</h3>
        <input
          type="name"
          className="register__form-name"
          name="name"
          placeholder="Имя"
          minLength={2}
          maxLength={30}
          id="name"
          required=""
        />
        <h3 className="register__form-title">email</h3>
        <input
          type="email"
          className="register__form-name"
          name="email"
          placeholder="E-mail"
          minLength={2}
          maxLength={30}
          id="email"
          required=""
        />
        <h3 className="register__form-title">Пароль</h3>
        <input
          type="password"
          className="register__form-name"
          name="password"
          placeholder="Пароль"
          minLength={4}
          maxLength={30}
          id="password"
          required=""
        />
        <span className="register__form-error">Что-то пошло не так...</span>
        <Link className="register__form-button_nav" to="/singin">
          <button className="register__form-button" type="submit">
            Зарегистрироваться
          </button>
        </Link>
        <div className="register__form-entrance">
          <p className="register__form-entrance_title">Уже зарегистрированы?</p>
          <button className="register__form-entrance_button" type="button">
            <Link className="register__form-entrance_button-text" to="/singin">
              Войти
            </Link>
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
