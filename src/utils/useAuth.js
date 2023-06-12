import { useState, useEffect, createContext, useContext } from "react";
//import { useFetch } from "./useFetch";
//import Cookies from "js-cookie";

const AuthContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  idUser: "",
  setIdUser: () => {},
  admin: false,
  setAdmin: () => {},
});


const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [idUser, setIdUser] = useState("");
  const [admin, setAdmin] = useState(false);
  

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token === null) {
        setIsLoggedIn(false);
        setIdUser("");
        setAdmin(false);
        return;
    }
     fetch("http://localhost:3000/api/auth/userInfo", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    }).then(async (response) => {
        if (response.status === 200) {
            const text = await response.text();
            if (text === "Unauthorized") {
                setIsLoggedIn(false);
                setIdUser("");
                setAdmin(false);
                return;
            }
            const data = JSON.parse(text);
            const userID = data.userId;
            const admin = data.isAdmin;
            setIsLoggedIn(true);
            setIdUser(userID);
            setAdmin(admin);
        }

    }).catch((err) => {
        console.log(err);
    
    })

}, []);



  useEffect(() => {
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
    localStorage.setItem("idUser", JSON.stringify(idUser));
    localStorage.setItem("admin", JSON.stringify(admin));
  }, [isLoggedIn, idUser, admin]);

  const value = { isLoggedIn, setIsLoggedIn, idUser, setIdUser, admin, setAdmin };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
