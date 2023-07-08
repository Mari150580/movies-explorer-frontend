import "../Movies/Heading/Heading";
import "../Register/Register.css";
import React from "react";
import logo from "../../images/logo__COLOR_main-1.svg";
import { Link } from "react-router-dom";
import { useState } from "react";

function Register({ handleRegister, nameError }) {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isActive, setIsActive] = useState("register__form_button_disabled");
  const [error, setError] = useState({ name: "", email: "", password: "" });
  const [formValid, setFormValid] = useState(false);
  

  function Button() {
    if (formValid === false) {
      setIsActive("register__form_button_disabled");
    } else {
      setIsActive("register__form-button");
    }
    return;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    const errorTarget = e.target.validationMessage;
    setUserData((userData) => ({ ...userData, [name]: value }));
    setError((errors) => ({ ...errors, [name]: errorTarget }));
    const formValid = Object.values(error).every((error) => error === "");
    setFormValid(formValid);
    Button();
  }

  function resetValidation (userData = {}) {
    setUserData(userData);
  };

  function handleSubmit(e) {
    e.preventDefault();
    resetValidation();

    if (userData) {
      handleRegister(userData);
    }
  }

  return (
    <div className="register">
      <header className="register__heading">
        <Link to="/" className="register__heading-link">
          <img src={logo} alt="Логотип" className="register__heading_logo" />
        </Link>
        <h1 className="register__title">Добро пожаловать!</h1>
      </header>

      <form className="register__form" onSubmit={handleSubmit}>
        <h3 className="register__form-title">Имя</h3>
        <input
          type="name"
          className="register__form-name"
          name="name"
          placeholder="Имя"
          minLength={2}
          maxLength={30}
          id="name"
          required
          pattern="^[A-Za-zА-Яа-яЁё\-\s]+$" 
          value={userData.name || ""}
          onChange={handleChange}
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
          required
          value={userData.email || ""}
          onChange={handleChange}
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
          required
          value={userData.password || ""}
          onChange={handleChange}
        />
        <span className="register__form-error">{nameError}</span>

{/*  <button className={`register__form_button_disabled ${formValid ? 'register__form-button' : ''}`} type="submit">*/}
        <button className={isActive} type="submit">
          <h2 className="register__form-button_text"> Зарегистрироваться</h2>
        </button>

        <div className="register__form-entrance">
          <p className="register__form-entrance_title">Уже зарегистрированы?</p>
          <button className="register__form-entrance_button" type="button">
            <Link className="register__form-entrance_button-text" to="/signin">
              Войти
            </Link>
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
