import "../Removal/Removal.css";
import cross from "../../images/icon__delit.svg";

function Removal() {
  return (
    <button class="element__removal">
      <img src={cross} alt="Удаление" className="element__cross" />
    </button>
  );
}

export default Removal;
