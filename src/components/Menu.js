import '../styles/Menu.css';
//import { NavLink } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import { useAuth } from '../utils/useAuth';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import ResTonStud from '../assets/ResTonStud.svg';

export default function Menu() {
    const {isLoggedIn, setIsLoggedIn} = useAuth();
    const logout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('jwt');
    }
    return (
        <>
        <Navbar bg="dark" variant="dark">
        <Container className = 'header'>
               <Navbar.Brand href='/'> <img className = 'lmj-logo' src={ResTonStud} alt="logo"/> </Navbar.Brand>
                {isLoggedIn ? (
                    <button className='pageSwitcherItem' onClick={logout}>Se déconnecter</button>
                ) : (
                <div className = 'header-right'>
                <Stack direction="row" spacing={2}>
                <Nav.Link href='/seconnecter'>
                <Button className='pageSwitcherItem'>Se connecter</Button>
                </Nav.Link>
                <Nav.Link href='/sinscrire'>
                <Button className='pageSwitcherItem'>S'inscrire</Button>
                </Nav.Link>
               </Stack>
               </div>
                )}
                <div className='header-center'>
                <Nav.Link href ='/'><button className ="lmj-button">Accueil</button></Nav.Link>
                <Nav.Link href ='/beatmaker'><button className='lmj-button'>Les beatmakers</button></Nav.Link>
                </div>
        </Container>
        </Navbar>
        </>
    )
}