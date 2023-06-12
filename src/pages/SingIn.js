import { Link } from "react-router-dom";
import {useAuth} from "../utils/useAuth";
import { useNavigate } from "react-router-dom";
//import Cookies from "js-cookie";



export default function SignInForm () {
    const { setIsLoggedIn} = useAuth();
    const navigate = useNavigate();

    const auth = async () => {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
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
            if(data.token){
                localStorage.setItem('jwt',data.token);
                //localStorage.setItem(`tokenExpiryTime=${Date.now() + 3600 * 1000}; path=/; max-age=3600`);
                //localStorage.setItem(`idUser=${data.id}; path=/; max-age=3600`);
                //localStorage.setItem(`admin=${data.admin}; path=/; max-age=3600`);
            }
            setIsLoggedIn(true);
            //setIdUser(data.id);
            //setAdmin(data.admin);
            navigate("/");
        } else { 
            console.log(data.message);
        }
    } catch (err) {
        console.log(err);
    }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
    };
        return (
            <div className="formCenter">
                <form className="formFields" onSubmit={handleSubmit}>
                    <div className="formField">
                        <label className="formFieldLabel" htmlFor="email">
                            Adresse E-Mail
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="formFieldInput"
                            placeholder="Entrez votre adresse mail"
                            name="email"
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
                            placeholder="Entrez votre mot de passe"
                            name="password"
                        />
                    </div>

                    <div className="formField">
                        <button className="formFieldButton"onClick={() => {auth()}}>Se connecter</button>
                        <Link to="/sinscrire" className="formFieldLink">
                            Créer un compte
                        </Link>
                    </div>
                </form>
            </div>
        );
} 
