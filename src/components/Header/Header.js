import "../Header/Header.css";
import logo from "../../images/logo__COLOR_main-1.svg";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <img src={logo} alt="Логотип" className="header__logo" />
      <div className="header__navigator">
        <Link className="header__navigator_regicter" to="/signup">
          Регистрация
        </Link>
        <button className="header__navigator_button" type="button">
          <Link className="header__navigator_text" to="/signin">
            Войти
          </Link>
        </button> 
      </div>
    </header>
  );
}

export default Header;
