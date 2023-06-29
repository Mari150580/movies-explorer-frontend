import "../Footer/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <h3 className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h3>
      <hr width="89%" size="2" align="center"></hr>
      <div className="footer__icons">
        <h3 className="footer__year">&#169; 2023</h3>
        <div className="footer__inscription">
          <p className="footer__text">Яндекс.Практикум</p>
          <p className="footer__text">Github</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
