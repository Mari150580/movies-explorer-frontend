import "../Profile/Profile.css";
import Heading from "../Movies/Heading/Heading";
import React, { useEffect, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext/CurrentUserContext";
import validator from "validator";

function Profile({ handleUpdateUser, onSignOut, nameError }) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [okStatus, setOkStatus] = React.useState(true);
  const [message, setMessage] = React.useState("");

  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);

  const [isValid, setIsValid] = useState(false);
  const [isBtnActive, setIsBtnActive] = useState(false);
  const [isInputChanged, setIsInputChanged] = useState(false);
  const [errorMessageName, setErrorMessageName] = useState("");
  const [errorMessageEmail, setErrorMessageEmail] = useState("");

  // Подставляем данные пользователя в форму. После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.data.name);
    setEmail(currentUser.data.email);
  }, [currentUser]);

  function validationForm(e) {
    setIsValid(e.target.closest("form").checkValidity());
  }

  //активация кнопки если все правильно
  useEffect(() => {
    if (isValid && isInputChanged) {
      setIsBtnActive(true);
    } else {
      setIsBtnActive(false);
    }
  }, [isInputChanged, isValid]);

  //Сравнение для email
  useEffect(() => {
    if (email) {
      if (validator.isEmail(email)) {
        setErrorMessageEmail("");
      } else {
        setIsValid(false);
        setIsBtnActive(false);
        setErrorMessageEmail("Введите корректный email");
      }
    } else {
      setErrorMessageEmail("");
    }
  }, [email, isBtnActive]);

  function handleName(e) {
    setName(e.target.value);
    setErrorMessageName(e.target.validationMessage);
    //Сравнение для имени
    if (e.target.value !== currentUser.data.name) {
      setIsInputChanged(true);
    } else {
      setIsInputChanged(false);
    }
  }

  function handleEmail(e) {
    setEmail(e.target.value);
    setErrorMessageEmail(e.target.validationMessage);
    //Сравнение для email
    if (e.target.value !== currentUser.data.email) {
      setIsInputChanged(true);
    } else {
      setIsInputChanged(false);
    }
  }

  function callbackMessage(message, okStatus) {
    setMessage(message);
    setOkStatus(okStatus);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов и коллбек-функцию во внешний обработчик
    handleUpdateUser({
      name,
      email,
      callbackError: callbackMessage,
    });
  }

  /*Выход*/

  function exitButton() {
    onSignOut();
  }

  return (
    <section className="profile">
      <Heading />
      <section className="profileForm">
        <h1 className="profileForm__title">Привет, {name}!</h1>
        <form className="profileForm__form" onChange={validationForm}>
          <div className="profileForm__form-bloks">
            <p className="profileForm__form_text">Имя</p>
            <input
              value={name || ""}
              onChange={handleName}
              type="text"
              className="profileForm__form-title"
              name="name"
              placeholder="Имя"
              minLength={4}
              maxLength={30}
              id="mame"
              required
              pattern="^[A-Za-zА-Яа-яЁё\-\s]+$"
            />
          </div>
          <span className="profileForm__text-error">{errorMessageName}</span>
          <hr
            className="profileForm__line"
            width="89%"
            size="1"
            align="center"
          ></hr>
          <div className="profileForm__form-bloks">
            <p className="profileForm__form_text">Email</p>
            <input
              value={email || ""}
              onChange={handleEmail}
              type="email"
              className="profileForm__form-email"
              name="email"
              placeholder="Email"
              minLength={2}
              maxLength={30}
              id="email"
              required
            />
          </div>
          <span className="profileForm__text-error">{errorMessageEmail}</span>
          <span className="register__form-error">{nameError}</span>
          <span
            className={`profileForm__request-result${okStatus ? "" : "_error"}`}
          >
            {message}
          </span>
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={!isBtnActive}
            className={`profileForm__edit${isBtnActive ? "" : "_disabled"}`}
          >
            Редактировать
          </button>
        </form>
        <button
          type="submit"
          className="profileForm__exit"
          onClick={exitButton}
        >
          Выйти из аккаунта
        </button>
      </section>
    </section>
  );
}

export default Profile;
