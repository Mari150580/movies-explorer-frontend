import "../Profile/Profile.css";
import Heading from "../Movies/Heading/Heading";
import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext/CurrentUserContext";
import { Link } from "react-router-dom";

function Profile({handleUpdateUser, logout}) {


  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");

  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);

  // Подставляем данные пользователя в форму. После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.data.name);
    setEmail(currentUser.data.email);
  }, [currentUser]);


  function handleName(e) {
    setName(e.target.value);
  }

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  /*Выход*/

  function exitButton() {
    logout();
  }


  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    console.log(111);
    handleUpdateUser({
      name,
      email,
    })
   
  }


  return (
    <section className="profile">
      <Heading />
      <section className="profileForm">
      <h1 className="profileForm__title">Привет, Мария!</h1>
      <form className="profileForm__form" onSubmit={handleSubmit}>
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
          />
        </div>
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
      <button type="submit" className="profileForm__edit" >
      Редактировать
      </button>
      </form>
      <button type="submit" className="profileForm__exit" onClick={exitButton}>
      Выйти из аккаунта
      </button>
    </section>
    </section>
  );
} 

export default Profile;
