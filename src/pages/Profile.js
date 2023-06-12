import { useParams } from "react-router-dom"; 
import styled from "styled-components";
import { useFetch } from "../utils/useFetch";
import ReactPlayer from "react-player";
const BmProfileWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 2rem;
    padding: 2rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    `;

export default function Profile() {
    const {id: queryId} = useParams()
    const {data, isLoading, error} = useFetch('https://restonstud-backend.onrender.com/api/stuff/')
    const profileData = data
    if(error){
        return(<span>Une erreur est survenue</span>)
    }
    return(
        <div>
            {isLoading ? (
                <span>Chargement en cours...</span>
            ) : (
            <BmProfileWrapper>
                {profileData !== null && profileData !== undefined ? (profileData.map((bm) => (bm._id === queryId)? (
                    
                    <div key = {`beatmaker-${bm._id}`}>
                        <img src = {bm.cover} alt = {bm.name} height={80} width={80} />
                        <h1>{bm.name}</h1>
                        <h2>{bm.ville}</h2>
                        <h3>A travaillé pour : {bm.ArtisteCollab.name}</h3>
                        <ReactPlayer url={bm.ArtisteCollab.url} />
                        
                    </div>
                ) : (
    
                        <span></span>
                )
                ))
            : <></>
            }
            </BmProfileWrapper>
    )}
    </div>
    )
}