import "../Card/Card.css";
import React, {useEffect, useState} from "react";
import Removal from "../../Removal/Removal";

function Card({card, savedMovies, ToggleMovieLike, isSavedMovies}) {
    const [like, setLike] = useState(false);

    useEffect(() => {
        const likedMovie = savedMovies.filter((movie) => {
            return movie.movieId === card.id;
        });
        setLike(likedMovie.length > 0 ? true : false);
    }, [savedMovies, card.id]);

    function countDuration(number) {
        const hours = Math.floor(number / 60);
        const minutes = number % 60;
        const formatTime = hours + "ч" + minutes + "м";
        return formatTime;
    }

    function handleLikeToggle() {
        // Получаем из всех сохраненных фильмов фильм с таким же id (если есть)
        const likedMovie = savedMovies.filter((movie) => {
            return movie.movieId === card.id;
        });
        /* Если в списке что-то есть, значит он нашелся - лайк снимаем,
        * иначе ставим (и тогда передавать _id необходимости нет) */
        ToggleMovieLike({...card, _id: likedMovie.length > 0 ? likedMovie[0]._id : null}, !like);
    }

    /* Эта функция обрабатывает страницу сохраненных фильмов,
    * соответственно ToggleMovieLike может работать только как false*/
    function handleLikeRemoval() {
        ToggleMovieLike(card);
    }

    return (
        <article className="element">
            <a href={card.trailerLink} target="_blank" rel="noopener noreferrer" className="">
                {isSavedMovies ? (
                    <img className="element__image" src={card.image} alt="карточка фильма"/>
                ) : (
                    <img className="element__image" src={`https://api.nomoreparties.co${card.image.url}`}
                         alt="карточка фильма"/>
                )}

            </a>
            <div className="element__point">
                <h2 className="element__title">{card.nameRU}</h2>
                <div className="element__btns">
                    {isSavedMovies ? (
                        <Removal handleLikeRemoval={handleLikeRemoval} />
                    ) : (
                        <button type="button" className={`element__like${like ? '_active' : ''}`}
                                onClick={handleLikeToggle}/>
                    )}
                </div>
            </div>
            <span className="element__duration"> {countDuration(card.duration)} </span>
        </article>
    );
}

export default Card;
