import "../Removal/Removal.css";
import cross from "../../images/icon__delit.svg";

function Removal({handleLikeRemoval}) {

    function handleClick() {
        handleLikeRemoval();
    }

    return (
        <button className="element__removal">
            <img src={cross} alt="Удаление" onClick={handleClick} className="element__cross"/>
        </button>
    );
}

export default Removal;
