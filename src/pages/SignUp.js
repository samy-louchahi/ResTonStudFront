import { Link } from "react-router-dom";
import {  useState } from "react"; 
import {useAuth} from "../utils/useAuth";
import { useNavigate } from "react-router-dom";






export default function SignUpForm(){
    const navigate = useNavigate();
    const { setIdUser, setIsLoggedIn, setAdmin } = useAuth();
    const auth = async (email, password) => {   
        try{
            const response = await fetch("https://restonstud-backend.onrender.com/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                }, 
                body: JSON.stringify({email, password}),
        });
        const data = await response.json();
        if (response.status === 200) {
            console.log(data);
            if(data.Token){
                document.cookie = `jwt=${data.Token}; path = "/"; max-age = 3600`;
                document.cookie = `tokenExpiryTime=${Date.now() + 3600 * 1000}; path=/; max-age=3600`;
                document.cookie = `idUser=${data.id}; path=/; max-age=3600`;
                document.cookie = `admin=${data.admin}; path=/; max-age=3600`;
            }
            setIsLoggedIn(true);
            setIdUser(data.id);
            setAdmin(data.admin);
            navigate("/");
        } else { 
            console.log(data.message);
            return null;
        }
    } catch (err) {
        console.log(err);
    }
    };
    const [signUpOk, setSignUpOk] = useState(true);
    const accountCreated = async (pseudo, email, password) => {
        const user = {pseudo, email, password, admin : false};
        try{
            const response = await fetch("https://restonstud-backend.onrender.com/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                }, 
                body: JSON.stringify(user),
        });
        const data = await response.json();
        if (!response.ok) {
            if(response.status === 400){
                setSignUpOk(false);
            }
            throw new Error(`Error when creating user : ${response.status}`);   
        }
        console.log(data);
        return true;
    } catch (err) {
        console.log(err);
        setSignUpOk(false);
        return false
    }
};
const [pseudo, setPseudo] = useState("");
const handlePseudoChange = (e) => {
    setPseudo(e.target.value);
};
const [email, setEmail] = useState("");
const handleEmailChange = (e) => {
    setEmail(e.target.value);
};
const [password, setPassword] = useState("");
const handlePasswordChange = (e) => {
    setPassword(e.target.value);
};
const [passwordConfirm, setPasswordConfirm] = useState("");
const handlePasswordConfirmChange = (e) => {
    setPasswordConfirm(e.target.value);
};
const [passwordOk, setPasswordOk] = useState(true);

const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Pseudo : ${pseudo} \nEmail : ${email} \nBienvenue sur Restonstud ${pseudo} !`);
};
const handbleButtonClick = () => {
    if(password === passwordConfirm){
        setPasswordOk(true);
        accountCreated(pseudo, email, password).then((result) => {
            if(!result){
                setSignUpOk(false);
            }else{
                setSignUpOk(true);
                auth(email, password)
            }
        });
    }else{
        setPasswordOk(false);
    }
};
function handleBlur(){
    if(!email.includes('@')){
        alert('Email invalide');
    }
}
function handleEmpty(){
    if(pseudo.length === 0 || email.length === 0 || password.length === 0 || passwordConfirm.length === 0){
        alert('Veuillez remplir tous les champs');
    }
}

    return (
      <div className="formCenter">
        <form  className="formFields" onSubmit={handleSubmit}>
          <div className="formField">
            <label className="formFieldLabel" htmlFor="name">
              Pseudo
            </label>
            <input
              type="text"
              id="name"
              className="formFieldInput"
              placeholder="Entrez votre peusdo"
              name="name"
              value={pseudo}
              onChange={handlePseudoChange}
                onEmptied={handleEmpty}
            />
          </div>
          <div className="formField">
            <label className="formFieldLabel" htmlFor="password">
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              className="formFieldInput"
              placeholder="Choisissez un mot de passe"
              name="password"
              value={password}
              onChange={handlePasswordChange}
                onEmptied={handleEmpty}
            />
          </div>
          <div className="formField">
            <label className="formFieldLabel" htmlFor="password">
              Confirmer le mot de passe
            </label>
            <input
              type="password"
              id="password"
              className="formFieldInput"
              placeholder="Confirmez le mot de passe"
              name="password"
              value={passwordConfirm}
              onChange={handlePasswordConfirmChange}
              onEmptied={handleEmpty}
            />
          </div>
          <div className="formField">
            <label className="formFieldLabel" htmlFor="email">
                Addresse E-Mail 
            </label>
            <input
              type="email"
              id="email"
              className="formFieldInput"
              placeholder="Entrez votre adresse mail"
              name="email"
              value={email}
              onChange={handleEmailChange}
              onBlur={handleBlur}
              on={handleEmpty}
            />
          </div>

          <div className="formField">
            <button className="formFieldButton" onClick={handbleButtonClick} onEmptied={handleEmpty}>S'inscrire</button>{" "}
            {!passwordOk && (<span>❌ Les mots de passes ne correspondent pas ! ❌</span>)}
            {!signUpOk && (<span>❌ L'adresse mail est déjà utilisée ! ❌</span>)}
            <Link to="/seconnecter" className="formFieldLink">
              Je possède déjà un compte
            </Link>
          </div>
        </form>
      </div>
    );
  }
