import "../Profile/Profile.css";
import Heading from "../Movies/Heading/Heading";
import React, {useEffect, useState} from "react";
import {CurrentUserContext} from "../../contexts/CurrentUserContext/CurrentUserContext";

function Profile({handleUpdateUser, onSignOut}) {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [errors, setErrors] = useState({name: "", email: ""});
    const [formValid, setFormValid] = useState(false);
    const [okStatus, setOkStatus] = React.useState(true);
    const [message, setMessage] = React.useState("");

    // Подписка на контекст
    const currentUser = React.useContext(CurrentUserContext);

    // Подставляем данные пользователя в форму. После загрузки текущего пользователя из API
    // его данные будут использованы в управляемых компонентах.
    React.useEffect(() => {
        if(currentUser.data){

            setName(currentUser.data.name);
            setEmail(currentUser.data.email);
        } else{
            console.log(111)
        }
        

    }, [currentUser]);

    /* Общий принцип работы валидатора и ограничения нажатий см. в Login.js */
    useEffect(() => {
        const formValid = Object.values(errors).every((error) => error === "");
        setFormValid(formValid);
    }, [errors]);


    function handleName(e) {
        setName(e.target.value);
        const errorMessage = e.target.validationMessage;
        setErrors({...errors, name: errorMessage});
    }

    function handleEmail(e) {
        setEmail(e.target.value);
        const errorTarget = e.target.validationMessage;
        setErrors({...errors, email: errorTarget});
    }

    /*Выход*/

    function exitButton() {
        onSignOut();
    }

    /* Особенность: для отображения результата запроса к серверу
    * (который происходит в компоненте-родителе) необходима
    * колл-бек функция. */
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


    return (
        <section className="profile">
            <Heading/>
            <section className="profileForm">
                <h1 className="profileForm__title">Привет, {name}!</h1>
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
                    <span className={`profileForm__request-result${okStatus ? "" : "_error"}`}>{message}</span>
                    <button type="submit" className={`profileForm__edit${formValid ? '' : '_disabled'}`}>
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