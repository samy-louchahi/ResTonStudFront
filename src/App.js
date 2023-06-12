import './App.css';
import Menu from './components/Menu';
import BeatMaker from './pages/BeatMaker';
import Home from './pages/Home';
import SignInForm from './pages/SingIn';
import SignUpForm from './pages/SignUp';
import Profile from './pages/Profile';
import Error from './components/Error';
import Admin from './pages/Admin';
import {Routes, Route} from 'react-router-dom';
import {AuthProvider} from './utils/useAuth';
//import {useState, useEffect} from 'react';
//import { useParams } from "react-router-dom";

function App() {
 /* const {id: queryId} = useParams()
    const [profileData, setProfileData] = useState({})
    useEffect(() => {
        fetch(`http://localhost:3000/api/stuff/:${queryId}`)
        .then((response) => response.json())
        .then((jsonResponse) => {setProfileData(jsonResponse?.bmData)})
    }, [queryId])
    const{
       _id,
    } = profileData*/
  return (
    <AuthProvider>
    <div className='lmj-app'>
      <Menu/>
      <Routes>
        <Route path = '/' element = {<Home />} />
        <Route path = '/beatmaker' element = {<BeatMaker />} />
        <Route path = '/beatmaker/:id' element = {<Profile />} />
        <Route path = '/seconnecter' element = {<SignInForm />} />
        <Route path = '/sinscrire' element = {<SignUpForm />} />
        <Route path = '/admin' element = {<Admin />} />
        <Route path = '*' element = {<Error />} />
      </Routes>
    </div>
    </AuthProvider>
  );
}

export default App;
