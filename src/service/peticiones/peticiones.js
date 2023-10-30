import axios from "axios"

const URL_BACK = 'https://red-social-findy-back.onrender.com'

export const endpoits = {
    users : `${URL_BACK}/users`, 
    posts : `${URL_BACK}/posts`, 
    comments : `${URL_BACK}/comments`, 
}

export const traerUsers = async () => {
    try {
        const {data} = await axios.get(endpoits.users)
        return data
        
    } catch (error) {
        return []
    }
}
export const traerPosts = async () => {
    try {
        const {data} = await axios.get(endpoits.posts)
        return data
        
    } catch (error) {
        console.log(error);
        return []
    }
}

export const traerComments = async () => {
    try {
        const {data} = await axios.get(endpoits.comments)
        return data
        
    } catch (error) {
        return []
    }
}


export const savePost = async (user) => {
    try {
        const {data} = await axios.post(endpoits.posts, {...user})
        return data;
    } catch (error) {
        console.log(error);
        return null
    }
   
}

export const actualizarLikes = async (id, estadoNuevo) => {
    try {
      const response = await axios.get(`${endpoits.posts}/${id}`);
      const userData = response.data;
      const updatedData = {
        ...userData, 
        likes: estadoNuevo
    }


      
      const updateResponseLikes = await axios.put(`${endpoits.posts}/${id}`, updatedData);
      console.log("¡Actualización exitosa de likes!");
      return updateResponseLikes;
    } catch (error) {
      console.log(error);
      return [];
    }
  };  

export const actualizarComentarios = async (id) => {
    try {
      const response = await axios.get(`${endpoits.posts}/${id}`);
      const userData = response.data;
      return userData
    }
      
    catch (error) {
      console.log(error);
      return [];
    }
  };




//   const handleLikes = async (idPost, estadoNuevo) => {
//     try {
//       const response = await axios.get(`${endpoits.posts}/${idPost}`);
//       const postData = response.data;
  
//       // Agregar el nuevo número al array de likes
//       postData.likes.push(estadoNuevo);
  
//       // Actualizar el estado de likes en la API
//       const updateResponseLikes = await axios.put(`${endpoits.posts}/${idPost}`, postData);
//       console.log("¡Actualización exitosa de likes!");
  
//       // Aquí podrías actualizar tu estado local si lo deseas
//       // setLikes(postData.likes);
  
//       return updateResponseLikes;
//     } catch (error) {
//       console.log(error);
//       return [];
//     }
//   };



//   <button onClick={() => handleLikes(idDelPost, nuevoNumeroDeLike)}>Agregar Like</button>