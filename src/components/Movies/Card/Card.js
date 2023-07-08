import "../Card/Card.css";

import React, { useEffect, useState } from "react";

function Card(card,  savedMovies,) {
  const [like, setLike] = useState(false);

 

 /*const cardd = cards.cards.cards;

console.log(cardd)
const { path } = useRouteMatch();

const card =cardd.map((cards) => {
  console.log(cards.id)
  return cards
  })*/

  function toggleLike() {
    if (!like) {
      setLike(true);
    } else {
      setLike(false);
    }
  }

  


  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token)
      if (token) {
      savedMovies.some((item) => {
        if (item.movieId === card.id) {
          setLike(true);
          document.getElementById(card.id).checked = true
        }
      })
    }
  }, [])

 /* const changeSrcImg = (
    `${(path !== '/saved-movies') ? `https://api.nomoreparties.co${card.image.url}` : card.image}`
  );*/

  function countDuration(number) {
    const hours = Math.floor(number / 60);
    const minutes = number % 60;
    const formatTime = hours + "ч" + minutes + "м";
    return formatTime;
  }

  return (
    <section className="elements">
    <article className="element">

    <a href={card.trailerLink} target="_blank" rel="noopener noreferrer" className="">
    <img className="element__image"  alt="карточка фильма" />
      </a>
      
      <div className="element__point">
        <h2 className="element__title">{card.nameRU}</h2>
       {/* <div
          onClick={() => setLike(!like)}
          className={
            like ? ["element__like_active"].join("") : "element__like"
          }
        ></div> */}
      </div>
      <span className="element__duration"> {countDuration(card.duration)} </span>
    </article>
  
        </section>
  
   
  );
}

export default Card;
