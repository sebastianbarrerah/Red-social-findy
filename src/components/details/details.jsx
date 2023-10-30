import React, { useContext, useEffect, useState } from "react";
import "./details.scss";

import barraCel from "../details//assestsDetails/barraBlanca.png";
import flechaLeft from "../details/assestsDetails/flechaLeftBlanca.png";
import fotoPersona from "../details/assestsDetails/fotoMujer.jpg";
import puntos from "../../assests/puntos.png";
import corazon from "../../assests/corazon.png";
import comentarioIcono from "../../assests/comentario.png";
import enviarPost from "../../assests/enviarPost.png";
import enviarRigth from "../../assests/enviarRigth.png";
import footer from '../details/assestsDetails/footer.png'; 
import circulo from '../details/assestsDetails/circulo.png'; 
import casa from "../../assests/casa.png";
import lupa from "../../assests/lupa.png";
import campana from "../../assests/campana.png";
import mas from "../../assests/mas.png";
import FormNewPost from "../formNewPost/formNewPost";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { actualizarComentarios, endpoits, traerUsers } from "../../service/peticiones/peticiones";
import axios from "axios";
import Swal from "sweetalert2";
import { AppContext } from "../../routers/Router";


function Details() {
  const [modal, setModal] = useState(false);
  const [info, setInfo] = useState({});
  const location = useLocation();
  const [comentarios, setcomentarios] = useState("")
  const [datos, setDatos] = useState([])
  const [usuarios, setUsuarios] = useState([])
  const {likes, setLikes} = useContext(AppContext)
  const {imagenesPost, setImagenesPost} = useContext(AppContext)
  const {comentario, setComentario} = useContext(AppContext)
  

  const { id } = useParams()

  useEffect(()=> {
    if(location.state.id) {
        setInfo(location.state)
        traerDatosApi(location.state.id)

    } 
}, [])

const numeroUsuario  = info.userId ;

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const navigate = useNavigate()

  const back  = () => {
    navigate(`/home`)
  }

  const home  = () => {
    navigate("/home")
  }

  useEffect(() => {
    traerUsers1()
  }, [])
  

  const traerUsers1 = async () => {
    try {
        const dataUsuarios = await traerUsers()
        setUsuarios(dataUsuarios)
        return dataUsuarios
      } catch (error) {
        return []
      }
  }
 
  const agregandoComentarios = ({target}) => {
    const valor = target.value;
    setcomentarios(valor)
  }

  const handeClickSend = async() => {
    try {
      const response = await axios.post(`${endpoits.posts}/${info.id}/comments`, {text: comentarios})
      Swal.fire('Comentario enviado exitosamente')
      navigate("/home")
      return response
      
    } catch (error) {
      console.log(error);
    }
  }

  const traerDatosApi = async(postId) => {
    try {
      const {data} = await axios.get(`${endpoits.posts}/${postId}/comments`)
      setDatos(data)
      const numeroComentarios = data.length;
      setComentario(numeroComentarios)
      return data
      
    } catch (error) {
      return []
    }
  }



  const idPost = id; 
  
  const traerComentarios = async (idPost) => {
    
    try {
        const dataUsuarios = await actualizarComentarios(idPost)
        // console.log(dataUsuarios.comments)
        // setComentario(dataUsuarios)
        return dataUsuarios
      } catch (error) {
        return []
      }
  }

  useEffect(()=>{
    traerComentarios(idPost)
  },[])
    




 

  return (
    <section className="details">

      <figure className="details__barra">
        <img className="details__barra__img" src={barraCel} alt="Barra" />
      </figure>
      <figure className="details__iconos">

        <img className="details__iconos__fecha" src={flechaLeft} alt="Fecha" onClick={back} />

        
        <img className="details__iconos__puntos" src={puntos} alt="Puntos" />
      </figure>
      <figure className="details__foto">
        <img className="details__foto__img" src={info.url} alt="Foto" />
      </figure>

      <div className="datos">
        <figure className="datos__figPerfil">
          <img
            className="datos__figPerfil__imgPerfil"
            src={info.url}
            alt="Foto"
          />
        </figure>
        {
          usuarios.map((user, index) =>
            user.id === numeroUsuario ? (
              <span className="datos__span" key={index}>
                {user.name}
              </span>
            ) : null
          )
        }
        
        <article className="datos__article">
          <img  className="datos__article__img" src={corazon} alt="" />

          {/* aquiiiiiiiiiiiiii */}
          {
            imagenesPost.map((element, index)=>(
              element.id == id ?(
                <span key={index}>
                  {element.likes}
                </span>
              ): null
            ))
          } 
         
          {/* <span>{postPerfil}</span> */}
          
        </article>
        <article className="datos__article">
          <img className="datos__article__img" src={comentarioIcono } alt="" />
          <span>{comentario}</span>
        </article>
        <article className="datos__article">
          <img className="datos__article__img" src={enviarPost} alt="" />
          <span>108K</span>
        </article>
      </div>

      <div className="comentario">
        <p className="comentario__parrafo">{info.description}</p>
      </div>

      <div className="input">
        <figure className="input__fig">
        {
          usuarios.map((user) =>
            user.id === numeroUsuario ? (
              <img className="input__fig__img" src={user.avatar} alt="" key={user.id}/>
            ) : null
          )
        }
        </figure>

        <input className="input__escribir" type="text" placeholder="Write comment as username...."  onChange={agregandoComentarios}/>
        <img className="input__icono" src={enviarRigth} alt="" onClick={handeClickSend}/>
      </div>

      <div className="contenedor__comentarios">
        {datos && datos.map((comment, index) => (
         <div className="iguales">
            <img className="input__fig__img" src={info.url} alt="" key=''/>
            <div key={index} className="linea__comentarios">{comment.text}</div>
         </div>
          
          ))
        }
      </div>

      <div className="footer">
     
        <article className="footer__iconos">
        <img className="footer__casa"  src={casa} alt="casa" onClick={home} />
        <img className="footer__lupa"  src={lupa} alt="lupa"  />
        <img className="footer__mas"  src={mas} alt="lupa"  onClick={openModal}/>
        <img className="footer__campana"  src={campana} alt="campana"  />
        </article>

    
        <img className="footer__circulo"  src={circulo} alt="" onClick={openModal}/>
        
        <img className="footer__fig__img" src={fotoPersona} alt="" />

        <img  className="footer__img" src={footer} alt=""/>
        <FormNewPost isOpen={modal} onRequestCloset={closeModal} />
        
      </div>

     
    </section>
  );
}

export default Details;
