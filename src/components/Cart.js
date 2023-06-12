import '../styles/Cart.css';
import Bm from './Bm';
import { BmList } from '../data/BmList';
export default function Cart(){
    const price =  50;
    return(
        <div>
            <h1 className = 'lmj.title'>Panier</h1>
            {BmList.map((bm, index) => (
                <Bm 
                    key={`${bm.name} - ${index}`}
                    name={bm.name}
                    ville={bm.ville}
                    cover={bm.cover}
                />
            ))}
            
        </div>
    )

}