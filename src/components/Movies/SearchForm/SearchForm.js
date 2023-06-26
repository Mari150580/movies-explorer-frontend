import "../SearchForm/SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm() {
  return (
    <section className="searchForm">
      <div className="searchForm__form">
        <form className="searchForm__film">
          <input
            type="film"
            className="searchForm__form-film"
            name="film"
            placeholder="Фильм"
            minLength={2}
            maxLength={30} 
            id="film"
            required=""
          />
        </form>
        <button className="searchForm__button" type="button">
          Найти
        </button> 
      </div>
      <FilterCheckbox />
      <hr className="line"></hr>
    </section>
  );
}

export default SearchForm;
