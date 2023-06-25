import "../SavedMovies/SavedMovies.css";
import Heading from "../Movies/Heading/Heading";
import SearchForm from "../Movies/SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import enot from "../../images/Enot.jpeg";
import Removal from "../Removal/Removal";

function SavedMovies() {
  return (
    <section className="movies">
      <Heading />
      <SearchForm />
      <section class="elements">
        <article className="element">
          <img className="element__image" src={enot} alt="Памятное место" />

          <div className="element__point">
            <h2 className="element__title">фильм</h2>
            <Removal />
          </div>
          <p class="element__duration"> 1111111 </p>
        </article>
        <article className="element">
          <img className="element__image" src={enot} alt="Памятное место" />

          <div className="element__point">
            <h2 className="element__title">фильм</h2>
            <Removal />
          </div>
          <p class="element__duration"> 1111111 </p>
        </article>
        <article className="element">
          <img className="element__image" src={enot} alt="Памятное место" />

          <div className="element__point">
            <h2 className="element__title">фильм</h2>
            <Removal />
          </div>
          <p class="element__duration"> 1111111 </p>
        </article>
      </section>
      <Footer />
    </section>
  );
}

export default SavedMovies;
