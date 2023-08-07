import "../Heading/Heading.css";
import logo from "../../../images/logo__COLOR_main-1.svg";
import manikin from "../../../images/icon__login.svg";
import {Link} from "react-router-dom";
import {useState} from "react";
import {AiOutlineClose, AiOutlineMenu} from "react-icons/ai";

function Heading( ) {
    const [nav, setNav] = useState(false);

    const getMoviesUrl = window.location.pathname;

    return (
        <header className="heading">
            <Link to="/" className="heading__logo_link">
                <img src={logo} alt="Логотип" className="heading__logo-burger"/>
            </Link>
            <div onClick={() => setNav(!nav)} className="heading__burger">
                {nav ? <AiOutlineClose sise={45}/> : <AiOutlineMenu size={25}/>}
            </div>
            <nav
                className={nav ? ["heading__menu"].join("") : ["heading__menu_activ"]}
            >
                <div className="heading__movies">
                    <Link to="/" className="heading__logo_link">
                        <img src={logo} alt="Логотип" className="heading__logo"/>
                        <p className="heading__logo_text">Главная</p>
                    </Link>
                    <Link className={`heading__link${getMoviesUrl === "/movies" ? "_activ" : ""}`} to="/movies">
                        {" "}
                        Фильмы{" "}
                    </Link>
                    <Link className={`heading__regicter${getMoviesUrl === "/saved-movies" ? "_activ" : ""}`} to="/saved-movies">
                    {" "}
                    Сохранённые фильмы{" "}
                        
                    </Link>
                </div>

                <div className="heading__login">
                    <p  className={`heading__account${getMoviesUrl === "/profile" ? "_activ" : ""}`}>Аккаунт</p>
                    <Link to="/profile">
                        <button className="heading__button" type="submit">
                            <img src={manikin} alt="Логотип" className="heading__manikin"/>
                        </button>
                    </Link>
                </div>
            </nav>
        </header>
    );
}

export default Heading;
