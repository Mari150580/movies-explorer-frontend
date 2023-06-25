import "../AboutProject/AboutProject.css";

function AboutProject() {
  return (
    <section className="project">
      <h2 className="project__text" id="h2_project">
        О проекте
      </h2>
      <hr width="89%" size="2" align="center"></hr>
      <div className="project__heading">
        <div className="project__column-one">
          <h2 className="project__stage">Дипломный проект включал 5 этапов</h2>
          <h2 className="project__title-stage">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </h2>
        </div>
        <div className="project__column-two">
          <h2 className="project__term">На выполнение диплома ушло 5 недель</h2>
          <h2 className="project__title-term">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </h2>
        </div>
      </div>
      <div className="project__line">
        <h3 className="project__line-1">
          <p className="line-1">1 неделя</p>
        </h3>
        <h3 className="project__line-2">
          <p className="line-1">4 недели</p>
        </h3>
        <h3 className="project__line-3">Back-end</h3>
        <h3 className="project__line-3">Front-end</h3>
      </div>
    </section>
  );
}

export default AboutProject;
