import "../SearchForm/SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import React, {useEffect, useState} from "react";

function SearchForm({handleSearch, handleFilterChange, currentSearchString, filterEnabled}) {
    const [searchString, setSearchString] = useState('');
    const [error, setError] = useState('');

    /* Если сверху "передали" поисковую строку, ставим в ввод */
    useEffect(() => {
        if (currentSearchString) setSearchString(currentSearchString);
    }, [currentSearchString]);

    function handleChange(e) {
        setSearchString(e.target.value);
        setError('');
    }

    /*Очистка формы*/
    const resetForms = (filmName = {}) => {
        setError('');
    };

    function handleClick() {
        if (!searchString) {
            setError('Нужно ввести ключевое слово');
        } else {
            resetForms();
            handleSearch(searchString);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        handleClick();
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
                        onChange={handleChange}
                        value={searchString || ""}
                    />
                </form>
                <button className="searchForm__button" type="button" onClick={handleClick}>
                    Найти
                </button>
            </div>
            <FilterCheckbox handleFilterChange={handleFilterChange} filterEnabled={filterEnabled}/>
            <span className="searchForm__error">{error}</span>

        </section>
    );
}

export default SearchForm;
