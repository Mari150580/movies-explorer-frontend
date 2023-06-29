import "../Profile/Profile.css";
import Heading from "../Movies/Heading/Heading";
import ProfileForm from "./ProfileForm/ProfileForm";

function Profile() {
  return (
    <section className="profile">
      <Heading />
      <ProfileForm />
    </section>
  );
}

export default Profile;
