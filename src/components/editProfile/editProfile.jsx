import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { endpoits, savePost } from "../../service/peticiones/peticiones";
import axios from "axios";

function EditProfile({ isOpen, onRequestCloset, info }) {
  const [fotoPerfil, setfotoPerfil] = useState("");
  const [estado, setEstado] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const idInfo = info.id
  console.log(idInfo)

  useEffect(()=> {
    const NewState = localStorage.getItem("NewState")
    const NewPhoto = localStorage.getItem("NewPhoto")
    setfotoPerfil(NewPhoto)
    setEstado(NewState)
   
  }, [])

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log(data);
    const newPhoto = data.photo;
    localStorage.setItem("NewPhoto", newPhoto);

    const newState = data.state;
    localStorage.setItem("NewState", newState);
  };

  const devolverHome = () => {
    console.log('prueba')
    navigate("/home")
    window.location.reload()
  }

  const actualizarPerfil = async () => {

    try {
      const response = await axios.get(`${endpoits.users}/${idInfo}`);
      const userData = response.data;
      const updatedData = {
        ...userData, 
        avatar: fotoPerfil, 
        state: estado,
      };
      const updateResponse = await axios.put(`${endpoits.users}/${idInfo}`, updatedData);
      console.log("¡Actualización exitosa!");
      devolverHome()
      return updateResponse;
    } catch (error) {
      console.log(error);
      return [];
    }
  };  

  return (
    <Modal isOpen={isOpen} onRequestCloset={onRequestCloset} className="modal">
      <button onClick={onRequestCloset} className="btn__salir">
        {" "}
        X
      </button>

      <div className="newPost">
        <h1 className="loginAdmi__titulo">Actualizar Perfil</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>Foto de perfil</label>
            <input
              name="photo"
              type="url"
              placeholder="URL foto de perfil"
              {...register("photo", { required: true })}
            />
          </div>
          <div>
            <label>Estado</label>
            <input
              name="state"
              type="text"
              placeholder="Estado"
              {...register("state", { required: true })}
            />
          </div>
          <button type="submit" className="btn__publicar" 
          onClick={actualizarPerfil}
          >
            Actualizar
          </button>
        </form>
      </div>
    </Modal>
  );
}

export default EditProfile;

