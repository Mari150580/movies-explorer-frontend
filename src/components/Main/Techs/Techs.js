import "./Techs.css";

function Techs() {
  return (
    <section className="techs">
      <h2 className="techs__text" id="h2_techs">
        Технологии
      </h2>
      <hr width="89%" size="2" align="center"></hr>

      <div className="techs__heading">
        <h1 className="techs__stage">7 технологий</h1>
        <h2 className="techs__title-stage">
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </h2>
      </div>
      <div className="techs__icons">
        <button className="techs__icon">HTML</button>
        <button className="techs__icon">CSS</button>
        <button className="techs__icon">JS</button>
        <button className="techs__icon">React</button>
        <button className="techs__icon">Git</button>
        <button className="techs__icon">Express.js</button>
        <button className="techs__icon">mongoDB</button>
      </div>
    </section>
  );
}

export default Techs;
