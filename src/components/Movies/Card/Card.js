import "../Card/Card.css";
import enot from "../../../images/Enot.jpeg";
import { useState } from "react";

function Card() {
  const [like, setLike] = useState(false);

  return (
    <section class="elements">
      <article className="element">
        <img className="element__image" src={enot} alt="Памятное место" />
        <div className="element__point">
          <h2 className="element__title">фильм</h2>
          <div
            onClick={() => setLike(!like)}
            className={
              like ? ["element__like_active"].join("") : "element__like"
            }
          ></div>
        </div>
        <p class="element__duration"> 1111111 </p>
      </article>
      <article className="element">
        <img className="element__image" src={enot} alt="Памятное место" />
        <div className="element__point">
          <h2 className="element__title">фильм</h2>
          <div
            onClick={() => setLike(!like)}
            className={
              like ? ["element__like_active"].join("") : "element__like"
            }
          ></div>
        </div>
        <p class="element__duration"> 1111111 </p>
      </article>
      <article className="element">
        <img className="element__image" src={enot} alt="Памятное место" />
        <div className="element__point">
          <h2 className="element__title">фильм</h2>
          <div
            onClick={() => setLike(!like)}
            className={
              like ? ["element__like_active"].join("") : "element__like"
            }
          ></div>
        </div>
        <p class="element__duration"> 1111111 </p>
      </article>
      <article className="element">
        <img className="element__image" src={enot} alt="Памятное место" />
        <div className="element__point">
          <h2 className="element__title">фильм</h2>
          <div
            onClick={() => setLike(!like)}
            className={
              like ? ["element__like_active"].join("") : "element__like"
            }
          ></div>
        </div>
        <p class="element__duration"> 1111111 </p>
      </article>
      <article className="element">
        <img className="element__image" src={enot} alt="Памятное место" />
        <div className="element__point">
          <h2 className="element__title">фильм</h2>
          <div
            onClick={() => setLike(!like)}
            className={
              like ? ["element__like_active"].join("") : "element__like"
            }
          ></div>
        </div>
        <p class="element__duration"> 1111111 </p>
      </article>
      <article className="element">
        <img className="element__image" src={enot} alt="Памятное место" />
        <div className="element__point">
          <h2 className="element__title">фильм</h2>
          <div
            onClick={() => setLike(!like)}
            className={
              like ? ["element__like_active"].join("") : "element__like"
            }
          ></div>
        </div>
        <p class="element__duration"> 1111111 </p>
      </article>
    </section>
  );
}

export default Card;
