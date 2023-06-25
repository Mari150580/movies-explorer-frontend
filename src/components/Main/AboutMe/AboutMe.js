import "../AboutMe/AboutMe.css";
import foto from "../../../images/me_avtor.jpg";
import arrow from "../../../images/arrow.svg";

function AboutMe() {
  return (
    <section className="aboutMe">
      <h2 className="aboutMe__text" id="h2_aboutMe">
        Студент
      </h2>
      <hr width="89%" size="2" align="center"></hr>
      <div className="aboutMe__block">
        <div className="aboutMe__heading">
          <h1 className="aboutMe__name">Мария</h1>
          <h2 className="aboutMe__title-profession">
            Фронтенд-разработчик, 43 года
          </h2>
          <h3 className="aboutMe__title-biography">
            Я родилась и живу в Москве, закончил МГУПБ. У меня есть муж и
            четверо детей. Год назад я приняла решение сменить сферу
            деятельности и начала обучение в Практикуме.
          </h3>
          <h4 className="aboutMe__title-github">Github</h4>
        </div>
        <div className="aboutMe__foto">
          <img src={foto} alt="Логотип" className="aboutMe__img" />
        </div>
      </div>
      <h3 className="aboutMe__description">Портфолио</h3>
      <div className="aboutMe__type">
        <h2 className="aboutMe__type-title">Статичный сайт</h2>
        <img src={arrow} alt="Стрелка" className="aboutMe__arrow" />
      </div>
      <hr width="89%" size="2" align="center"></hr>
      <div className="aboutMe__type">
        <h2 className="aboutMe__type-title">Адаптивный сайт</h2>
        <img src={arrow} alt="Стрелка" className="aboutMe__arrow" />
      </div>
      <hr width="89%" size="2" align="center"></hr>
      <div className="aboutMe__type">
        <h2 className="aboutMe__type-title">Одностраничное приложение</h2>
        <img src={arrow} alt="Стрелка" className="aboutMe__arrow" />
      </div>
    </section>
  );
}

export default AboutMe;
