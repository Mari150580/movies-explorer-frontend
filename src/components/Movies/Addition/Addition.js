import "../Addition/Addition.css";

function Addition({handleMore}) {
    return (
        <section className="addition">
            <button className="addition__button" type="button" onClick={handleMore}>
                Еще
            </button>
        </section>
    );
}

export default Addition;
