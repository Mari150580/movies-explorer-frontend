import "../Movies/Heading/Heading";
import logo from "../../images/logo__COLOR_main-1.svg";
import "../Register/Register.css";
import "../Login/Login.css";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { type } from "@testing-library/user-event/dist/type";

function Login({ handleLogin }) {
  const [isActive, setIsActive] = useState("register__form_button_disabled");
  const [userData, setUserData] = useState({});
  const [error, setError] = useState({ email: "", password: "" });
  const [formValid, setFormValid] = useState(false);

 function Button() {
    if (formValid === false) {
      setIsActive("register__form_button_disabled");
    } else {
      setIsActive("register__form-button");
    }
    return;
  }

/*const submitButton = `register__form-button ${!formValid && 'register__form_button_disabled'}`*/

  function handleChange(e) {
    const { name, value } = e.target;
    const errorTarget = e.target.validationMessage;
    setUserData((userData) => ({ ...userData, [name]: value }));
    setError((errors) => ({ ...errors, [name]: errorTarget }));
    Button();
    const formValid = Object.values(error).every((error) => error === "");
    setFormValid(formValid);
   
  }

  const resetValidation = (userData = {}) => {
    setUserData(userData);
  };

  function handleSubmit(e) {
    e.preventDefault();
    resetValidation();

    handleLogin(userData, error).then(() => {});
  }

  return (
    <div className="register">
      <header className="register__heading">
        <Link to="/" className="register__heading-link">
          <img src={logo} alt="Логотип" className="register__heading_logo" />
        </Link>
        <h1 className="register__title">Рады видеть!</h1>
      </header>
      <form className="register__form" onSubmit={handleSubmit}>
        <h3 className="register__form-title">email</h3>
        <input
          type="email"
          className="login__form-name"
          name="email"
          placeholder="E-mail"
          minLength={2}
          maxLength={30}
          id="email"
          required
          value={userData.email || ""}
          onChange={handleChange}
        />
        <span>{}</span>
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
          required
          value={userData.password || ""}
          onChange={handleChange}
        />
        <span>{}</span>
        <hr className="login__form-email_line"></hr>
        <button className={/*submitButton*/isActive} type="submit">
          <h2 className="register__form-button_text"> Войти</h2>
        </button>
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
