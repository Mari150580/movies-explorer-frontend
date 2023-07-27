import "../ProjectMy/ProjectMy.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import Heading from "../Movies/Heading/Heading";

function ProjectMy({ loggedIn }) {
 
  return (
    <section className="projectMy">
      {loggedIn ? (<Heading />) : (<Header />)}
      <Main />
      <Footer />
    </section>
  );
}

export default ProjectMy;

