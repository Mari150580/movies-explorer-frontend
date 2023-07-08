import "../App/App.css";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import { CurrentUserContext } from "../../contexts/CurrentUserContext/CurrentUserContext";
import ErrorForm from "../ErrorForm/ErrorForm";
import ProjectMy from "../ProjectMy/ProjectMy";
import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import * as auth from "../../utils/auth";
import apiMain from "../../utils/MainApi";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
//import * as apiMovies from "../../utils/MoviesApi";
import apiMovies from "../../utils/MoviesApi";




function App(resetValidation) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [emailReg, setEmailReg] = useState("");
  const[nameError, setNameError]=useState('')
  const [card, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  
  /*информация об успешной или нет авторизации*/
  const navigate = useNavigate();

  /*Логин*/

  function handleLogin({ email, password }) {
    return auth.authorize(email, password)
    .then((data) => {
      if (data.jwt) {
        setLoggedIn(true);
        setEmailReg(email);
        localStorage.setItem("jwt", data.jwt);
        navigate("/movies", { replace: true });
      }
      
    })
    .catch((error) => {
      console.log(`Что то пошло не так ${error}`);
    })
  }

  /*Регистрация*/

  function handleRegister({ name, email, password }) {
    return auth.register(name, email, password)
    .then((res) => {
      navigate("/signin");
      setNameError('');
    })
    .catch((error) => {
      setNameError('Что то пошло не так');
    })
    
  }

  /*Заход данных ссервера*/

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    console.log(jwt)
      if (jwt) {
        apiMain.getToken(jwt);
      Promise.all([apiMain.getAllProfile(), apiMovies.getAllTasks()])
      .then(([data, cards]) => {
          setCurrentUser(data);
          setCards(cards);
          setLoggedIn(true);
          console.log(data)
        })
        .catch(function (err) {
          console.log("Данные не получены", err);
        });
    }
    else {
      console.log("нет токена")
    }
  }, []);


  /*проверка токена при загрузки страницы*/
   useEffect(() => {
    tokenCheck();
  }, []);

  /*проверка токена*/

  function tokenCheck() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      apiMain.getToken(jwt);
      auth
        .getContent(jwt)
        .then((data) => {
          setLoggedIn(true);
          setEmailReg(data.email);
          navigate("/movies");
          console.log(3)
        })
        .catch(function (err) {
          console.log("Ошибка", err);
        });
    }
  }


  /*Смена данных профиля на сервер*/

  function handleUpdateUser({data}) {
    console.log(data)
    apiMain
      .addNewProfile({data})
      .then((res) => {
        setCurrentUser(res);
      })
      .catch(function (err) {
        console.log("Ошибка", err);
      });
  }


  /*выход из системы*/
  function logout() {
    setLoggedIn(false);
    localStorage.removeItem("jwt");
    navigate("/signup");
  }


  return (
    <div className="App">
      <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
          <Routes>
          <Route path="/" element={<ProjectMy />} />
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
            {<Movies 
              card={card}
             />} 
             
            />
            <Route 
            path="/saved-movies" 
            element={
              <ProtectedRoute element={SavedMovies} 
              />
            }
              />
           
            <Route 
            path="/profile" 
            element={
              <Profile
              logout={logout}
              handleUpdateUser={handleUpdateUser}
              />
            }
            />
           
            

            <Route path="*" element={<ErrorForm />} />
            
          </Routes>
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
