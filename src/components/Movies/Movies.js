import "../Movies/Movies.css";
import Heading from "./Heading/Heading";
import SearchForm from "./SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import Addition from "./Addition/Addition";
import React, { useEffect, useState } from "react";
import apiMovies from "../../utils/MoviesApi";
import CardList from "./CardList/CardList";
import Preloader from "../Preloader/Preloader";

function Movies({ savedMovies, setSavedMovies }) {
  const [moviesCount, setMoviesCount] = useState(0);
  const [moreMoviesCount, setMoreMoviesCount] = useState(0);
  const [shownMovies, setShownMovies] = useState([]);
  const [remainingMovies, setRemainingMovies] = useState([]);
  const [preloader, setPreloader] = useState(false);
  const [filterEnabled, setFilterEnabled] = useState(false);
  const [currentSearchString, setCurrentSearchString] = useState("");
  const [searchErrorMessage, setSearchErrorMessage] = useState(false);

  /* Каждый раз, когда меняется размер окна -
   * надо заново решить, по сколько карточек за
   * раз показывать */
  useEffect(() => {
    function handleResize() {
      let [cardsCount, moreCardsCount] = minMoviesCount();
      setMoviesCount(cardsCount);
      setMoreMoviesCount(moreCardsCount);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* Подгружаем из хранилища поисковый запрос, если он есть,
   * то и фильтр следом. Записываем для использования при подгрузке результатов. */
  useEffect(() => {
    let searchString = localStorage.getItem("currentSearchString");

    if (searchString) {
      setFilterEnabled(JSON.parse(localStorage.getItem("filterEnabled")));
      setCurrentSearchString(searchString);
    }
  }, []);

  useEffect(() => {
    if (shownMovies.length < moviesCount && currentSearchString)
      handleSearch(currentSearchString).then(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moviesCount]);

  async function ToggleMovieLike(movie, isLiked) {
    if (!isLiked) {
      try {
        const jwt = localStorage.getItem("jwt");
        if (jwt) {
          apiMovies.getToken(jwt);
          await apiMovies.deleteSavedMovie(movie._id);
          const newSaved = savedMovies.filter((deletedMovie) => {
            return deletedMovie._id !== movie._id;
          });
          setSavedMovies(newSaved);
        }
      } catch (err) {
        console.log("Ошибка удаления фильма", err);
      }
    } else {
      const Movie = {
        image: apiMovies._IMGurl + movie.image.url,
        trailerLink: movie.trailerLink,
        thumbnail: apiMovies._IMGurl + movie.image.url,
        movieId: movie.id,
        country: movie.country || "",
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      };

      try {
        const jwt = localStorage.getItem("jwt");
        if (jwt) {
          apiMovies.addSavedMovie(Movie).then((Movie) => {
            setSavedMovies([Movie, ...savedMovies]);
          });
        }
      } catch (err) {
        console.log("Ошибка сохранения фильма", err);
      }
    }
  }

  /* Корректировка, делает фильтрацию, согласно критериям, лучше */
  useEffect(() => {
    // Пытаемся достать карточки из localStorage (получали с сервера)
    let cards = JSON.parse(localStorage.getItem("cards"));
    if (cards) {
      localStorage.setItem("filterEnabled", JSON.stringify(filterEnabled));
      handleSearch(currentSearchString).then(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterEnabled]);

  async function handleSearch(inputString) {
    // запускаем крутилку!
    setPreloader(true);

    // Пытаемся достать карточки из localStorage (получали с сервера)
    let cards = JSON.parse(localStorage.getItem("cards"));

    // Если не получилось, необходимо сделать запрос к серверу
    if (!cards) {
      /* И если промис разрешился в нашу пользу,
       * то флаг "ошибка при поиске" выключается */
      try {
        cards = await apiMovies.getAllMovies();
        localStorage.setItem("cards", JSON.stringify(cards));
        setSearchErrorMessage(false);
      } catch (error) {
        /* А вот если не получилось, необходимо не только сообщить об ошибке,
         * Крутилку тоже выключить, в фильмы нужно поместить пустые массивы
         * для избежания ошибок с методами массивов и прекращаемся */
        setSearchErrorMessage(true);
        setCurrentSearchString(inputString);
        localStorage.setItem("currentSearchString", inputString);
        localStorage.setItem("filterEnabled", JSON.stringify(filterEnabled));
        setShownMovies([]);
        setRemainingMovies([]);
        setPreloader(false);
        return;
      }
    }

    localStorage.setItem("currentSearchString", inputString);
    localStorage.setItem("filterEnabled", JSON.stringify(filterEnabled));

    let filteredMovies = cards.filter(
      ({ nameRU, nameEN, description }) =>
        nameRU.toLowerCase().includes(inputString.toLowerCase()) ||
        nameEN.toLowerCase().includes(inputString.toLowerCase())
      // || description.toLowerCase().includes(inputString.toLowerCase())
    );

    if (filterEnabled) {
      filteredMovies = filteredMovies.filter(({ duration }) => duration <= 40);
    }

    setCurrentSearchString(inputString);
    setShownMovies([...filteredMovies.slice(0, moviesCount)]);
    setRemainingMovies([...filteredMovies.slice(moviesCount)]);
    setPreloader(false);
  }

  /* Обработчик переключения фильтра. Если переданное значение не
   * совпадает с состоянием информации о фильтре, это надо исправить. */
  function handleFilterChange(isFiltered) {
    if (isFiltered !== filterEnabled) {
      setFilterEnabled(isFiltered);
    }
  }

  function handleMore() {
    let moviesToAdd =
      shownMovies.length % moreMoviesCount
        ? moreMoviesCount * 1.5 - (shownMovies.length % moreMoviesCount)
        : moreMoviesCount;

    setShownMovies(shownMovies.concat(remainingMovies.slice(0, moviesToAdd)));
    setRemainingMovies(remainingMovies.slice(moviesToAdd));
  }

  function minMoviesCount() {
    let cardsCount = 0,
      moreCardsCount = 0;
    const windowWidth = window.innerWidth;
    const countConfig = {
      Phone: [0, 5, 2],
      Tablet: [560, 8, 2],
      SmallPC: [850, 12, 3],
      PC: [1138, 16, 4],
    };

    Object.keys(countConfig)
      .sort((a, b) => countConfig[a] - countConfig[b])
      .forEach((key) => {
        if (windowWidth > countConfig[key][0]) {
          cardsCount = countConfig[key][1];
          moreCardsCount = countConfig[key][2];
        }
      });
    return [cardsCount, moreCardsCount];
  }

  return (
    <div className="bgr">
      <section className="movies">
        <Heading />
        <SearchForm
          handleSearch={handleSearch}
          handleFilterChange={handleFilterChange}
          currentSearchString={currentSearchString}
          filterEnabled={filterEnabled}
        />
        {preloader && <Preloader />}
        {!preloader && currentSearchString && (
          <CardList
            shownMovies={shownMovies}
            ToggleMovieLike={ToggleMovieLike}
            savedMovies={savedMovies}
            isSavedMovies={false}
            searchErrorMessage={searchErrorMessage}
          />
        )}
        {!preloader && currentSearchString && remainingMovies.length > 0 && (
          <Addition handleMore={handleMore} />
        )}
        <Footer />
      </section>
    </div>
  );
}

export default Movies;
