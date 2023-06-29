import "../Movies/Movies.css";
import Heading from "./Heading/Heading";
import SearchForm from "./SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import Card from "./Card/Card";
import Addition from "./Addition/Addition";

function Movies() {
  return (
    <section className="movies">
      <Heading />
      <SearchForm />
      <Card />
      <Addition />
      <Footer />
    </section>
  );
}

export default Movies;
