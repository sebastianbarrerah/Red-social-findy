import React, { useContext, useEffect, useState } from "react";
import "./home2.scss";
import logo from "../../assests/logo.png";
import chats from "../../assests/chats.png";
import corazon from "../../assests/corazon.png";
import imgenCentral from "../../assests/JENNIE.png";
import fotoRedonda from "../../assests/fotoRedonda.png";
import enviarPost from "../../assests/enviarPost.png";
import comentarioIcono from "../../assests/comentario.png";
import guardar from "../../assests/guardarPost.png";

import footer from "../details/assestsDetails/footer.png";
import circulo from "../details/assestsDetails/circulo.png";
import fotoPersona from "../details/assestsDetails/fotoMujer.jpg";
import casa from "../../assests/casa.png";
import lupa from "../../assests/lupa.png";
import campana from "../../assests/campana.png";
import mas from "../../assests/mas.png";
// import guardar from '../../assests/ig.png';

import FormNewPost from "../formNewPost/formNewPost";
import { useNavigate } from "react-router-dom";
import { actualizarLikes, endpoits, traerPosts, traerUsers } from "../../service/peticiones/peticiones";
import { AppContext } from "../../routers/Router";
import { log } from "react-modal/lib/helpers/ariaAppHider";

const Home2 = () => {
  const [modal, setModal] = useState(false);
  const [imagenesUsers, setImagenesUsers] = useState([]);
  const { imagenesPost, setImagenesPost } = useContext(AppContext)
  const [idUsuario, setIdUsuario] = useState({});
  const [estadoNuevo, setEstadoNuevo] = useState(0);

  const { likes, setLikes } = useContext(AppContext)
  const { comentario, setComentario } = useContext(AppContext)
  const { tag, setTag } = useContext(AppContext)
  const [liked, setLiked] = useState(false)

  const loginEmail = localStorage.getItem("userEmail")
  let idUsuarioLogin = 0
  imagenesUsers.forEach((dato, index) => {
    if (loginEmail === dato.email) {
      // console.log("Correo encontrado en el índice:", index);
      idUsuarioLogin = index
    }

  });
  const actualizarUsuario = (id) => {
    const usuario = imagenesUsers[id];
    setIdUsuario(usuario);
  };

  useEffect(() => {
    actualizarUsuario(idUsuarioLogin)
  }, [actualizarUsuario]);





  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataPost = await traerPosts();
        const dataUsers = await traerUsers();
        setImagenesPost(dataPost);
        setImagenesUsers(dataUsers);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const navigate = useNavigate();


  const handlePerfilClick = (userData) => {
    navigate(`/profile/${userData.username}`, { state: userData });
  };

  const uniqueUserImages = {};
  const uniqueUserId = {};
  const uniqueUserLikes = {}

  imagenesPost.forEach((post) => {
    if (!uniqueUserImages[post.userId]) {
      uniqueUserImages[post.userId] = post.url;
      uniqueUserId[post.userId] = post.id;
      uniqueUserLikes[post.userId] = post.likes;
    }
  });

  const guardarPost = (e) => {
    console.log("funciona");
    console.log(e, "posicion");
    setTag(e)
    console.log(tag, "Esto es tag");


  }

  const handleClickLikes = () => {
    setLiked(!liked);
  };

  const handleDoubleClickLikes = (e) => {
    e.preventDefault();
    setLiked(false);
  };

  const handleLikes = async (idPost) => {
    // const nuevoEstado = estadoNuevo + 1;
    // setEstadoNuevo(nuevoEstado);
    const nuevoEstado = likes[idPost] ? likes[idPost] + 1 : 1;
    setLikes({ ...likes, [idPost]: nuevoEstado });
    await actualizarLikes(idPost, nuevoEstado)



    const getStyle = () => {
      const stateButton = document.querySelectorAll(".content__button__id")
      stateButton.forEach((item) => {
        item.classList.add("noActiveButton")
      })
      target.classList.remove("noActiveButton")
      target.classList.add("activeButton")
    }


  }
  return (
    <article className="container__padre">
      <figure className="container__figure">
        <img src={logo} alt="logo" />
        <div className="header__logos">
          <img src={corazon} alt="corazon" />
          <img src={chats} alt="chats" />
        </div>
      </figure>

      <figure className="container__estados">
        {imagenesUsers.map(person => (
          <div className="container__circulares" key={person.id}>
            <img src={person.avatar} alt="Estado +" className="estados__circular" />
            <span>{person.name}</span>
          </div>

        ))}
      </figure>

      {imagenesUsers.map((userData) => {
        const userImage = uniqueUserImages[userData.id];
        const userLikes = uniqueUserLikes[userData.id];


        return (
          <section className="container__ventana" key={userData.id}>

            <div className="ventana__datos">
              <img src={userData.avatar} alt="" />
              <h3 onClick={() => { handlePerfilClick(userData, uniqueUserId) }}>
                {userData.name}
              </h3>
            </div>

            <img src={userImage} alt="" className="imagenPrincipal" />

            <div className="ventana__iconos">
              <div className="iconos">


                {/* AQUIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII */}
                <img src={corazon} alt=""className={`fa ${liked ? 'active' : ''}`}
                 onClick={() => {handleLikes(uniqueUserId[userData.id], estadoNuevo); 
                  {handleClickLikes}} } 
                  onDoubleClick={handleDoubleClickLikes}
                  />
                 
               

                <span>{likes[uniqueUserId[userData.id]] || 0}</span>
              </div>
              <div className="iconos">
                <img src={enviarPost} alt="" />
                <span>6</span>
              </div>
              <div className="iconos">
                <img src={comentarioIcono} alt="" />

                <span>{comentario}</span>

              </div>
              <img src={guardar} alt="" className="iconoGuardar" onClick={() => { guardarPost(uniqueUserId[userData.id], estadoNuevo) }} />
            </div>
            <div className="ventana__comentario">
              <p>
                <strong>{userData.name}</strong>
                {imagenesPost.filter((image) => image.id === userData.id)
                  .map((image) => (
                    <p >{image.description}</p>

                  ))}
              </p>

            </div>

          </section>
        );
      })}


      <div className="footerA">
        <article className="footerA__iconosA">
          <img className="footerA__casaA" src={casa} alt="casa" />
          <img className="footerA__lupaA" src={lupa} alt="lupa" />
          <img
            className="footerA__masA"
            src={mas}
            alt="lupa"
            onClick={openModal}
          />
          <img className="footerA__campanaA" src={campana} alt="campana" />
        </article>

        <img
          className="footerA__circuloA"
          src={circulo}
          alt=""
          onClick={openModal}
        />

        <img className="footerA__fig__imgA" src={fotoPersona} alt="" />

        <img className="footerA__imgA" src={footer} alt="" />
        <FormNewPost isOpen={modal} onRequestCloset={closeModal} />
      </div>
    </article>
  );
};

export default Home2;
