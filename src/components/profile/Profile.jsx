import React, { useContext, useEffect, useState } from 'react'
import './profile.scss'
import puntos from '../../assests/Group 13.png'
import atras from '../../assests/Vector.png'

import principal from '../../assests/PRINCIPAL.png'
import { endpoits, traerPosts } from '../../service/peticiones/peticiones'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import EditProfile from '../editProfile/editProfile'
import axios from 'axios'
import { AppContext } from '../../routers/Router'
import Swal from 'sweetalert2'


const Profile = () => {
  const { likes, setLikes } = useContext(AppContext)
  const [modal, setModal] = useState(false);
  const [displayStyle, setDisplayStyle] = useState('none');
  const [displayStyle1, setDisplayStyle1] = useState('flex');

  const openModal = () => {
    setModal(true);
    localStorage.removeItem("NewPhoto")
    localStorage.removeItem("NewState")
  };

  const closeModal = () => {
    setModal(false);
  };

  console.log(likes, "likes");

  const [imagenesPost, setImagenesPost] = useState([])
  const [info, setInfo] = useState({});

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state.id) {
      setInfo(location.state)
    }
  }, [])



  const traerData = async () => {
    try {
      const dataPost = await traerPosts()
      setImagenesPost(dataPost)
      return dataPost
    } catch (error) {
      return []
    }
  }


  useEffect(() => {
    traerData();
  }, []);

  const back = () => {
    navigate("/home")
  }

  const cargarDetalles = (user) => {
    navigate(`/details/${user.id}`, { state: user })
  }

  const irVideos = () => {
    setDisplayStyle('flex');
    setTimeout(() => {
      setDisplayStyle1('none');

    }, 0);
  };

  const irFotos = () => {
    setDisplayStyle1('flex');
    setTimeout(() => {
      setDisplayStyle('none');

    }, 0);
  };



  return (
    <>
      <figure className='container__figureA'>

        <img src={atras} alt="principal" className='atras' onClick={back} />
        <img src={info.front} alt="principal" className='principal' />
        <img
          src={puntos}
          alt="puntos"
          className='puntos'
          onClick={() => {
            if (info.id === 1) {
              openModal();
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No puedes modificar otro perfil',
                footer: '<a href="/home">regresar a inicio</a>'
              });
            }
          }}
        />
      </figure>

      <EditProfile isOpen={modal} onRequestCloset={closeModal} info={info} />

      <section className='container__info'>
        <img src={info.avatar} alt="" className="circularA" />
        <span className='info__followers'>10.7 M <br /> Followers</span>
        <div className='info__personal'>
          <h3>{info.name}</h3>
          <span className='info__personal-span'><br />{info.state}</span>
        </div>
        <span className='info__likes'>6 M<br /> Likes</span>
        <div className='info__botones'>
          <button className='info__btn'>Follow</button>
          <button className='info__btn'>Messages</button>
        </div>
      </section>


      <section className="container__fotos">
        <div className='categorias'>
          <span onClick={irFotos}>Fotos</span>
          <span onClick={irVideos}>Videos</span>
          <span>Album</span>
          <span>Tag</span>
        </div>

        <div className='fotos' style={{ display: displayStyle1 }} >
          {
            imagenesPost.map((user, index) => (
              info.id === user.userId ? (
                <img key={index} src={user.url} className='imagenes' onClick={() => { cargarDetalles(user) }} />
              ) : null
            ))
          }
        </div>
        <div className='videos' style={{ display: displayStyle }} onClick={irVideos}>
          {
            imagenesPost.map((user, index) => (
              info.id === user.userId ? (
                <img key={index} src={user.video} className='imagenes' onClick={() => { cargarDetalles(user) }} />
              ) : null
            ))
          }
        </div>
      </section>
    </>
  )
}

export default Profile