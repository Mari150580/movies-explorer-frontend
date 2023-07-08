/*import { useEffect, useState } from "react";

export default function Validation() {
    const [isActive, setIsActive] = useState();
  const [userData, setUserData] = useState({});
  const[error, setError] = useState({email: "", password: ""});
  const[formValid, setFormValid] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    const errorP = e.target.validationMessage;
    setUserData((userData)=>({ ...userData, [name]: value }));
    setError((errors) =>({ ...errors, [name]: errorP }));
    Button()
    const formValid = Object.values(error).every((error)=> error==='');
    console.log(error)
    console.log(formValid)
    setFormValid(formValid);
  }
  function Button(){
    if(formValid===false){
    setIsActive('register__form-button_activ')
    } else{
      setIsActive('register__form-button')
    }
  }

  const resetValidation = (userData={}, error={})=>{
    setUserData(userData);
    setError(error)
};


return{
    userData,
    error,
    handleChange,
    resetValidation,
    formValid,
    isActive
}

}*/
