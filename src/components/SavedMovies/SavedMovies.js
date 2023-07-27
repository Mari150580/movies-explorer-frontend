import "../SavedMovies/SavedMovies.css";
import Heading from "../Movies/Heading/Heading";
import SearchForm from "../Movies/SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import CardList from "../Movies/CardList/CardList";
import apiMovies from "../../utils/MoviesApi";
import {useEffect, useState} from "react";

function SavedMovies({savedMovies, setSavedMovies}) {
    const [filterEnabled, setFilterEnabled] = useState(false);
    const [currentSearchString, setCurrentSearchString] = useState('');
    const [shownMovies, setShownMovies] = useState([savedMovies]);

    useEffect(() => {
        handleSearch(currentSearchString);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [savedMovies, filterEnabled]);

    function handleSearch(inputString) {
        let filteredMovies = savedMovies.filter(({nameRU, nameEN, description}) =>
                nameRU.toLowerCase().includes(inputString.toLowerCase())
                || nameEN.toLowerCase().includes(inputString.toLowerCase())
        );
        if (filterEnabled) {
            filteredMovies = filteredMovies.filter(({duration}) => duration <= 40);
        }
        setCurrentSearchString(inputString)
        setShownMovies([...filteredMovies]);
    }

    function handleFilterChange(isFiltered) {
        if (isFiltered !== filterEnabled) {
            setFilterEnabled(isFiltered);
        }
    }

    function RemoveMovieLike(movie) {
        try {
            const jwt = localStorage.getItem("jwt");
            if (jwt) {
                apiMovies.getToken(jwt);
                apiMovies.deleteSavedMovie(movie._id).then(() => {
                    const newSaved = savedMovies.filter((deletedMovie) => { 
                        console.log(deletedMovie._id)
                        return deletedMovie._id !== movie._id })
                    console.log(movie._id)
                    setSavedMovies(newSaved);
                });
            }
        } catch (err) {
            console.log('Ошибка удаления фильма', err);
        }
    }

    return (
        <div className="bgr">
            <section className="movies">
                <Heading/>
                <SearchForm
                    handleSearch={handleSearch}
                    handleFilterChange={handleFilterChange}
                    currentSearchString={currentSearchString}
                    filterEnabled={filterEnabled}
                />
                <CardList
                    shownMovies={shownMovies}
                    savedMovies={savedMovies}
                    isSavedMovies={true}
                    ToggleMovieLike={RemoveMovieLike}
                />
                <Footer/>
            </section>
        </div>
    );
}

export default SavedMovies;
