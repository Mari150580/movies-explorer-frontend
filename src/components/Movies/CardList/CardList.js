import './CardList.css';
import Card from '../Card/Card';

const CardList = ({shownMovies, ToggleMovieLike, savedMovies, isSavedMovies, searchErrorMessage}) => {
    return (
        <section className="cards">
            {shownMovies.length > 0 ? (
                <ul className="cards__list">
                    {shownMovies.map((card) => (
                        <Card
                            key={card.id || -card.movieId}
                            card={card}
                            ToggleMovieLike={ToggleMovieLike}
                            savedMovies={savedMovies}
                            shownMovies={shownMovies}
                            isSavedMovies={isSavedMovies}
                        />
                    ))}
                </ul>
            ) : (
                <div className="cards__text">{searchErrorMessage ?
                    "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз" :
                    "Ничего не найдено"}</div>
            )}
        </section>
    );
};

export default CardList;