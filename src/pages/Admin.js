import { CréerBmProfile,GetOneBmProfile, DelBmProfile, UpdateBmProfile } from "../components/CRUD";
//import Profile from "./Profile";
//import { Link } from "react-router-dom"; 
import { useNavigate } from "react-router-dom";




export default function AdminPage(){
    const navigate = useNavigate();
const token = localStorage.getItem('jwt');
 function handleSend(){
    const name = document.getElementById('name').value;
    if(name === '' || name === undefined || name === null){
        return null;
    }
    const ville = document.getElementById('ville').value;
    if(ville === '' || ville === undefined || ville === null){
        return null;
    }
    const cover = document.getElementById('cover').value;
    if(cover === '' || cover === undefined || cover === null){
        return null;
    }
    const nomArtiste = document.getElementById('nomArtiste').value;
    if(nomArtiste === '' || nomArtiste === undefined || nomArtiste === null){
        return null;
    }
    const urlArtiste= document.getElementById('urlArtiste').value;
    if(urlArtiste === '' || urlArtiste === undefined || urlArtiste === null){
        return null;
    }
    
    console.log({name,ville,cover,nomArtiste,urlArtiste});
    return CréerBmProfile(name,ville,cover,nomArtiste,urlArtiste,token);
 }
async function handleGet(){
    const name = document.getElementById('nameGet').value;
    if(name === '' || name === undefined || name === null){
        return null;
    }
    const profile = await GetOneBmProfile(name,token);
    if(profile === '' || profile === undefined || profile === null){
        return null;
    }
    return navigate(`/beatmaker/${profile._id}`);
}
function handleDel(){
    const nameDel = document.getElementById('nameDel').value;
    if(nameDel === '' || nameDel === undefined || nameDel === null){
        return null;
    }
    return DelBmProfile(nameDel,token);
}
function handleUpdate(){
    const name = document.getElementById('nameUpdate').value;
    if(name === '' || name === undefined || name === null){
        return null;
    }
    const ville = document.getElementById('villeUpdate').value;
    if(ville === '' || ville === undefined || ville === null){
        return null;
    }
    const cover = document.getElementById('coverUpdate').value;
    if(cover === '' || cover === undefined || cover === null){
        return null;
    }
    const nomArtiste = document.getElementById('nomArtisteUpdate').value;
    if(nomArtiste === '' || nomArtiste === undefined || nomArtiste === null){
        return null;
    }
    const urlArtiste= document.getElementById('urlArtisteUpdate').value;
    if(urlArtiste === '' || urlArtiste === undefined || urlArtiste === null){
        return null;
    }
    return UpdateBmProfile(name,ville,cover,nomArtiste,urlArtiste,token);
}

        

return(
    <div className="">
        <h4>Créer un profile Beatmaker :</h4>
        <form className='lmj-app'>
            <label htmlFor="name">Nom du Beatmaker :</label>
            <input type="text" className="input"
            id="name" 
            name="name"
            placeholder="entrez votre nom d'artiste" 
            />
            <label htmlFor="ville">Ville :</label>
            <input type="text" className="input"
            id="ville"
            name="ville"
            placeholder="entrez votre ville"
            />
            <label>Une image de vous </label>
            <input type="file"
            id="cover"
            name="cover"
            />
            <label htmlFor="ArtisteCollab">Artiste(s) avec qui vous avez collaboré :</label>
            <input type="text" className="input"
            id="nomArtiste"
            name="nomArtiste"
            placeholder="entrez le nom de l'artiste"
            />
            <input type="url"
            id="urlArtiste"
            name="urlArtiste"
            placeholder="entrez l'url d'une de vos créations"
            />
        </form>
        <button onClick={handleSend}>Créer votre profile</button>
         <form>
            <label htmlFor="nameGet">Nom du Beatmaker :</label>
            <input type="text" className="input"
            id="nameGet"
            name="nameGet"
            placeholder="entrez le nom de l'artiste"
            />
         </form>
        <button onClick ={handleGet && navigate('/beatmaker/:id')}>Voir le profile de l'artiste</button>
        <form>
            <label htmlFor="nameDel">Nom du Beatmaker à supprimer :</label>
            <input type="text" className="input"
            id="namDel"
            name="nameDel"
            placeholder="entrez le nom de l'artiste à supprimer"
            />
        </form>
        <button className='lmj-button' onClick={handleDel }>Supprimer votre profile</button>
        <button className='lmj-button' onClick={handleUpdate }>Modifier votre profile</button>
    </div>
)
}