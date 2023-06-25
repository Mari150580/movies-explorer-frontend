import "../FilterCheckbox/FilterCheckbox.css";

function FilterCheckbox() {
  return (
    <section className="filterCheckbox">
      <div className="filterCheckbox__checkbox">
        <label className="switch">
          <input type="checkbox" className="switch__input" />
          <span className="switch__slider"></span>
        </label>
        <h2 className="filterCheckbox__films">Короткометражки</h2>
      </div>
    </section>
  );
}

export default FilterCheckbox;
