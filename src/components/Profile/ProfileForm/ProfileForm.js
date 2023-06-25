import { Link } from "react-router-dom";
import "../ProfileForm/ProfileForm.css";

function ProfileForm() {
  return (
    <section className="profileForm">
      <h1 className="profileForm__title">Привет, Мария!</h1>
      <form className="profileForm__form">
        <div className="profileForm__form-bloks">
          <p className="profileForm__form_text">Имя</p>
          <input
            type="text"
            className="profileForm__form-title"
            name="name"
            placeholder="Имя"
            minLength={4}
            maxLength={30}
            id="mame"
            required=""
          />
        </div>
        <hr
          className="profileForm__line"
          width="89%"
          size="1"
          align="center"
        ></hr>
        <div className="profileForm__form-bloks">
          <p className="profileForm__form_text">Email</p>
          <input
            type="email"
            className="profileForm__form-email"
            name="email"
            placeholder="Email"
            minLength={2}
            maxLength={30}
            id="email"
            required=""
          />
        </div>
      </form>

      <a href="#mame" className="profileForm__link">
        <p className="profileForm__edit">Редактировать</p>
      </a>

      <Link className="profileForm__link" to="/signup">
        <p className="profileForm__exit">Выйти из аккаунта</p>
      </Link>
    </section>
  );
}

export default ProfileForm;
