import "./NavTab.css";

function NavTab() {
  return (
    <section className="navtab">
      <a href="#h2_project" className="navtab__progect">
        {" "}
        О проекте
      </a>
      <a href="#h2_techs" className="navtab__technology">
        {" "}
        Технологии
      </a>
      <a href="#h2_aboutMe" className="navtab__student">
        {" "}
        Студент
      </a>
    </section>
  );
}

export default NavTab;

