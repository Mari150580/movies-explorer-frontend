import "../App/App.css";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext/CurrentUserContext";
import { Route, Routes } from "react-router-dom";
import ErrorForm from "../ErrorForm/ErrorForm";
import ProjectMy from "../ProjectMy/ProjectMy";

function App() {
  return (
    <div className="App">
      <div className="page">
        <CurrentUserContext.Provider>
          <Routes>
            <Route path="/signup" element={<Register />} />
            <Route path="/singin" element={<Login />} />
            <Route path="/" element={<ProjectMy />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/saved-movies" element={<SavedMovies />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<ErrorForm />} />
          </Routes>
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
