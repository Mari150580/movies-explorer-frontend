import "../SearchForm/SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import  apiMovies from "../../../utils/MoviesApi";
import React, { useEffect, useState } from "react";


function SearchForm() {
  const [filmName, setFilmName] = useState('');
  const [error, setError] = useState('');
  const [cards, setCards] = useState([]);

  function handleChange(e) {
    setFilmName(e.target.value);
    setError('')
   
  }

  /*Очистка формы*/
  const resetForms = (filmName = {}) => {
    setFilmName('');
    setError('');
  };

 
    
  


  function handleSubmit(e) {
    e.preventDefault();
   
  }


  function handleClick(){
    if (filmName) {
          resetForms();
        }
    setError('Нужно ввести ключевое слово')
  }

  

  return (
    <section className="searchForm">
      <div className="searchForm__form">
        <form className="searchForm__film" onSubmit={handleSubmit}>
          <input
            type="name"
            className="searchForm__form-film"
            name="film"
            placeholder="Фильм"
            id="film"
            required
            onChange={handleChange}
            value={filmName || ""}
          />
        </form>
        <button className="searchForm__button" type="button"  onClick={handleClick}>
          Найти
        </button> 
      </div>
      <FilterCheckbox />
      <span className="searchForm__error">{error}</span>
      
    </section>
  );
}

export default SearchForm;
