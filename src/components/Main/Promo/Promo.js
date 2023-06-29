import "./Promo.css";
import logos from "../../../images/pic__COLOR_landing-log.svg";

function Promo() {
  return (
    <section className="promo">
      <h1 className="promo__text">
        Учебный&nbsp;проект студента факультета Веб-разработки.
      </h1>
      <img src={logos} alt="Логотип" className="promo__logos" />
    </section>
  );
}

export default Promo;
