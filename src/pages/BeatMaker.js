import { useFetch } from '../utils/useFetch';
import '../styles/Beatmaker.css';
import Bm from '../components/Bm';
import {Link} from 'react-router-dom';
import {useAuth} from '../utils/useAuth';


export default function BeatMaker() {
    const {admin} = useAuth();
    const {data, isLoading, error}= useFetch('https://restonstud-backend.onrender.com/api/stuff');
    console.log(data);
    const bmList = data;
    if(error){
        return(<span>Une erreur est survenue</span>)
    }
    return(
        <div>
        <h1 className = 'lmj-bm-title'>Beatmaker</h1>
        {isLoading ? (
            <span>Chargement en cours...</span>
        ) : (
        <ul className = 'lmj-bm-list'>
                 {bmList !== null && bmList !== undefined ?(bmList.map((bm) => (
                    <Link key = {`beatmeker-${bm._id}`} to = {`/beatmaker/${bm._id}`}>
                    <Bm 
                        className = 'lmj'
                        name={bm.name}
                        ville={bm.ville}
                        cover={bm.cover}
                    />
                    </Link>
                )))
                : <></>
                }
        </ul>
        )}
        {admin ? (
            <Link to = '/admin'> <button className = 'lmj-bm-button'>Coin admin</button></Link>
        ) : (
            <></>
        )}
        
    </div>
)
}
