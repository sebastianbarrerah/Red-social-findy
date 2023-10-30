import React, { useEffect, useState } from 'react'
// import { navigate, useNavigate } from 'react-router-dom';
import './formNewPost.scss'
import { useForm } from 'react-hook-form';
import Modal from "react-modal";
import { savePost, traerPosts } from '../../service/peticiones/peticiones';
import { useNavigate } from 'react-router-dom';


function FormNewPost({ isOpen, onRequestCloset }) {

  const {
  register,
  handleSubmit,
  formState: { errors }, 
  
  } = useForm();
  
const navigate = useNavigate();


  const onSubmit = async(data) => {
    console.log(data)
    console.log(data.description)
    const nuevoPost = {
      userId : 1, 
      url: data.url, 
      description: data.description
    }
    
    const response = await savePost(nuevoPost)

    console.log(response);
    
    if (response) {
       console.log("registrado")
       navigate('/home')
    }else {
      console.log('error')
        reset({
            description: '',
            url: '',
        })
    }

  };
    

  return (
    <Modal isOpen={isOpen} onRequestCloset={onRequestCloset} className="modal">
    <div className="newPost">
    
    <h1 className="loginAdmi__titulo">New Post</h1>

    <form 
    onSubmit={handleSubmit(onSubmit)} >
      <div>
        <label>
         Description
        </label>
          <input 
            name="description"
            type="text"
            placeholder="Description"
            {...register("description", { required: true })}
          />
      </div>
      <div>
        <label >
         Image
        </label>
          <input
            name="url"
            type="url"
            placeholder="Post"
            {...register("url", { required: true })}
            
          />
      </div>
      <button  type="submit" className='btn__publicar' >Published</button>
      <button  onClick={onRequestCloset} className='btn__salir'> X</button>

    </form>
  </div>
</Modal>

  )
}

export default FormNewPost