import "../App/App.css";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import {CurrentUserContext} from "../../contexts/CurrentUserContext/CurrentUserContext";
import ErrorForm from "../ErrorForm/ErrorForm";
import ProjectMy from "../ProjectMy/ProjectMy";
import React, {useEffect, useState} from "react";
import {Route, Routes, useNavigate} from "react-router-dom";
import * as auth from "../../utils/auth";
import apiMain from "../../utils/MainApi";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import apiMovies from "../../utils/MoviesApi";


function App(resetValidation) {
    const [loggedIn, setLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [nameError, setNameError] = useState('')
    const [savedMovies, setSavedMovies] = useState([]);
    const [currentUser, setCurrentUser] = useState({});

    /* Стоит отметить, что на данном этапе переменная не используется, но задается в стр.38 (App.js) */
    // const [emailReg, setEmailReg] = useState("");

    /* Установка навигации */
    const navigate = useNavigate();

    /* Логин, установка jwt токена, флага loggedIn для ProtectedRoute
    * и переадресация на movies*/
    function handleLogin({email, password}) {
        return auth.authorize(email, password)
            .then((data) => {
                if (data.jwt) {
                    setLoggedIn(true);
                    // setEmailReg(email);
                    localStorage.setItem("jwt", data.jwt);
                    navigate("/movies", {replace: true});
                }

            })
            .catch((error) => {
                console.log(`Что то пошло не так ${error}`);
            })
    }

    /* Регистрация */
    function handleRegister({name, email, password}) {
        return auth.register(name, email, password)
            .then((res) => {
                navigate("/signin");
                setNameError('');
            })
            .catch((error) => {
                setNameError('Что то пошло не так');
            })

    }

    /*Заход данных с сервера:
    * --Информация о пользователе
    * --Сохраненные пользователем фильмы
    * повторная установка флага loggedIn необходима для красоты,
    * иначе, если пользователь загружает сайт будучи уже авторизлованным,
    * то его сначала перешлет на signin, а потом тут же на movies
    * Обновлять их нужно, конечно, если пользователь логинится.
    * По пути происходит первичная установка всех токенов.*/
    useEffect(() => {
        const jwt = localStorage.getItem("jwt");
        if (jwt) {
            apiMain.getToken(jwt);
            apiMovies.getToken(jwt);
            Promise.all([apiMain.getAllProfile(), apiMovies.getSavedMovies()])
                .then(([data, movies]) => {
                    setCurrentUser(data);
                    setLoggedIn(true);
                    setSavedMovies(movies);
                })
                .catch(function (err) {
                    console.log("Данные не получены", err);
                });
        } else {
            console.log("нет токена");
            setIsLoading(false);
        }
    }, [loggedIn]);

    /* проверка токена при загрузки страницы */
    useEffect(() => {
        const jwt = localStorage.getItem("jwt");
        if (jwt) {
            apiMain.getToken(jwt);
            apiMain.getAllProfile()
                .then((data) => {
                    setLoggedIn(true);
                    setCurrentUser(data);
                    // setEmailReg(data.email);
                    // navigate("/movies");
                    setIsLoading(false);
                })
                .catch(function (err) {
                    console.log("Ошибка", err);
                    setIsLoading(false);
                });
        }
        /* Так как нам всё-же необходимо пользоваться навигацией
        * единоразово при загрузке страницы, попросим линтер молчать. */
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /* Смена данных профиля:
    * Обновление токена не требуется, так как
    * единственный валидный способ его получения - вход через signin.
    * Вызывается callback функция для
    * отображения сообщения на странице пользователя */
    function handleUpdateUser({name, email, callbackError}) {
        let message = "";
        let okStatus = true;

        apiMain
            .addNewProfile({
                "name": name,
                "email": email,
            })
            .then((res) => {
                setCurrentUser({data: res});
                message = "Информация успешно обновлена!";
                okStatus = true;
                callbackError(message, okStatus);
            })
            .catch(function (err) {
                message = "Ошибка обновления пользователя " + err;
                okStatus = false;
                callbackError(message, okStatus);
            });
    }

    /*выход из системы с удалением localStorage*/
    function onSignOut() {
        setLoggedIn(false);
        localStorage.removeItem("jwt");
        localStorage.removeItem("cards");
        localStorage.removeItem("currentSearchString");
        localStorage.removeItem("filterEnabled");
        navigate("/");
    }

    return (
        <div className="App">
            <div className="page">
                <CurrentUserContext.Provider value={currentUser}>
                    <Routes>
                        <Route path="/" element={<ProjectMy/>}/>
                        <Route path="/signup"
                               element={
                                   <Register
                                       handleRegister={handleRegister}
                                       nameError={nameError}

                                   />

                               }
                        />
                        <Route
                            path="/signin"
                            element=
                                {<Login
                                    handleLogin={handleLogin}
                                />}
                        />
                        <Route
                            path="/movies"
                            element=
                                {<ProtectedRoute
                                    component={Movies}
                                    loggedIn={loggedIn}
                                    isLoading={isLoading}
                                    savedMovies={savedMovies}
                                    setSavedMovies={setSavedMovies}
                                />}

                        />
                        <Route
                            path="/saved-movies"
                            element={
                                <ProtectedRoute
                                    component={SavedMovies}
                                    loggedIn={loggedIn}
                                    isLoading={isLoading}
                                    savedMovies={savedMovies}
                                    setSavedMovies={setSavedMovies}
                                />
                            }
                        />

                        <Route
                            path="/profile"
                            element={
                                <ProtectedRoute
                                    component={Profile}
                                    loggedIn={loggedIn}
                                    isLoading={isLoading}
                                    onSignOut={onSignOut}
                                    handleUpdateUser={handleUpdateUser}
                                />
                            }
                        />


                        <Route path="*" element={<ErrorForm/>}/>

                    </Routes>
                </CurrentUserContext.Provider>
            </div>
        </div>
    );
}

export default App;