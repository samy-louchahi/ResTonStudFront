

const CréerBmProfile = async (name,ville,cover,ArtisteCollabName,ArtisteCollabUrl,token) => {
     const XML = new XMLHttpRequest();
        XML.open("POST", "https://restonstud-backend.onrender.com/api/stuff/");
        XML.setRequestHeader("Content-Type" , "multipart/form-data");
        XML.setRequestHeader("Authorization", `Bearer ${token}`);
        XML.responseType = "json";
        XML.onload = () => {
            if (XML.status === 201) {
                console.log(XML.response);
            } 
        }
        XML.onerror = () => {
            console.log("Erreur 500");
        }
        const files = document.getElementById('cover').files;
        const formData = new FormData()
        formData.append('cover', files[0])
        formData.append('name', name)
        formData.append('ville', ville)
        formData.append('ArtisteCollabName', ArtisteCollabName)
        formData.append('ArtisteCollabUrl', ArtisteCollabUrl)
        

        XML.send(formData)
        //const data = {
      //      name: name,
       //     ville: ville,
     //       cover: cover,
   //         ArtisteCollab: ArtisteCollab,
 //       };
        //XML.send(JSON.stringify(data));
    }


const GetBmProfile = async (token) => {
    try{
         await fetch(`hhttps://restonstud-backend.onrender.com/api/stuff/`, {
            method: "GET",
            headers : {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
        .then(async (response) => {
            if (response.status === 200) {
                const text = await response.text();
                if (text === "Unauthorized") {
                    
                    return;
                }
                const data = JSON.parse(text);
                console.log(data);
                return data;
            }
    })
    }catch(err){
        console.error(err);
        return null;
    }


}

const DelBmProfile = async (name,token) => {
    const XML = new XMLHttpRequest();
    const data = GetBmProfile(token);
    for(const i in data){
        if(data[i].name === name){
            const id = data[i]._id;
    XML.open("DELETE", `https://restonstud-backend.onrender.com/api/stuff/${id}`);
    XML.setRequestHeader("Content-Type", "application/json");
    XML.setRequestHeader("Authorization", `Bearer ${token}`);
    XML.responseType = "json";
    XML.send();
        }else{
            console.log("Not found");
        }
    }
}

const GetOneBmProfile = async (name ,token) => {
    const profilePromise = new Promise((resolve, reject) => {
            
        const XML = new XMLHttpRequest();
        const data = GetBmProfile(token);
        for(const i in data){
            if(data[i].name === name){
                XML.open("GET", `https://restonstud-backend.onrender.com/api/stuff/${data[i]._id}`);
                XML.setRequestHeader("Content-Type", "application/json");
                XML.setRequestHeader("Authorization", `Bearer ${token}`);
                XML.responseType = "json";
                XML.onload = () => {
                if (XML.status === 200) {
                    console.log(XML.response);
                    const profile = XML.response;
                    resolve(JSON.stringify(profile));
                }else{
                    reject(XML.status);
                }
                }
            }else{
                reject("Not found");
            }
        } 
    })

    return profilePromise;
}

const UpdateBmProfile = async (name,ville,cover,ArtisteCollab,token) => {
    const XML = new XMLHttpRequest();
    const data = GetBmProfile(token);
    for(const i in data){
        if(data[i].name === name){
            XML.open("PUT", `https://restonstud-backend.onrender.com/api/stuff/${data[i]._id}`);
            XML.setRequestHeader("Content-Type", "application/json");
            XML.setRequestHeader("Authorization", `Bearer ${token}`);
            XML.responseType = "json";
            XML.onload = () => {
            if (XML.status === 200) {
                console.log(XML.response);
                const newProfile = JSON.stringify(XML.response);
                newProfile.name = name;
                newProfile.ville = ville;
                newProfile.cover = cover;
                newProfile.ArtisteCollab = ArtisteCollab;
                XML.send(newProfile);
            } 
            }
        }
        XML.onerror = () => {
            console.log("Erreur 500");
        }
        XML.send(JSON.stringify({name,ville,cover,ArtisteCollab}));
    }
}

export {CréerBmProfile,GetBmProfile,DelBmProfile,GetOneBmProfile,UpdateBmProfile};