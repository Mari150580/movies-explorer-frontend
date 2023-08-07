import "../Movies/Heading/Heading";
import logo from "../../images/logo__COLOR_main-1.svg";
import "../Register/Register.css";
import "../Login/Login.css";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";


function Login({ handleLogin, nameError }) {
  const [userData, setUserData] = useState({});
  const [errors, setErrors] = useState({email: "initial", password: "initial"});
  const [formValid, setFormValid] = useState(false);


  /* Как только ошибки(ниже) меняются, необходимо валидировать форму */
  useEffect(() => {
    const formValid = Object.values(errors).every((error) => error === "");
    setFormValid(formValid);
  }, [errors]);

  /* При изменении значений генерируем ошибки, срабатывает хук выше */
  function handleChange(e) {
    const { name, value } = e.target;
    const errorTarget = e.target.validationMessage;
    setUserData((userData) => ({ ...userData, [name]: value }));
    setErrors((errors) => ({ ...errors, [name]: errorTarget }));
  }

  /*const resetValidation = (userData = {}) => {
        setUserData(userData);
    };*/

  function handleSubmit(e) {
    e.preventDefault();
    //resetValidation();
    handleLogin(userData, errors).then(() => {});
  }

  return (
    <div className="register">
      <header className="register__heading">
        <Link to="/" className="register__heading-link">
          <img src={logo} alt="Логотип" className="register__heading_logo" />
        </Link>
        <h1 className="register__title">Рады видеть!</h1>
      </header>
      <form className="register__form" onSubmit={handleSubmit} noValidate={true}>
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
        <span className="profileForm__text-error">{errors.email}</span>
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
        <span className="profileForm__text-error">{errors.password}</span>
        <hr className="login__form-email_line"></hr>
        <span className="register__form-error">{nameError}</span>
        <button
          className={`register__form-button${formValid ? "" : "_disabled"}`}
          type="submit"
        >
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
