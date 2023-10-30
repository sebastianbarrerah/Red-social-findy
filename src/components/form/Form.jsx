import React, { useEffect, useState } from "react";
import { dataAdmi } from "./dataAdmi";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { saveSession } from "../../service/sessionService/sessionService";
import { useContext } from "react";
import { AppContext } from "../../routers/Router"

import './form.scss'
import Swal from "sweetalert2";

const Form = () => {
  const [admim, setAdmim] = useState(false);
  const arrayAdmi = dataAdmi;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const {
    user: { userDispatch },
  } = useContext(AppContext);

  const onSubmit = (data) => {
    const validarUsuario =
    (data.email === "mariapaulinap0531@gmail.com" &&
    data.password === "maria123" || data.nombre === "Maria paulina") ||
  (data.email === "sebas123@gmail.com" && data.password === "sebas123") 
    

    if (validarUsuario) {
      userDispatch({
        type: "login",
        payload: {
          isAutenticated: true,
          user: validarUsuario,
        },
      });
      saveSession(validarUsuario);
      setAdmim(true);
      localStorage.setItem("userData", JSON.stringify(data));
      localStorage.setItem("userEmail",data.email);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Bienvenido',
        showConfirmButton: false,
        timer: 1500
      })
      navigate('/home');
      // navigate('profile');
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Hubo un error, intenta nuevamente'
      })
    }
  };
    
  return (
    <div className="loginAdmi">
    
    <h1 className="loginAdmi__titulo">Bienvenido</h1>
    <span className="loginAdmi__span">Inicio Sesión</span>

    <form 
    onSubmit={handleSubmit(onSubmit)} 
    className="loginAdmi__form">
      <div>
        <label className="loginAdmi__label">
          <span className="loginAdmi__labelSpan">Email</span>
          <input className="loginAdmi__labelInput"
            name="email"
            type="email"
            placeholder="Escriba su correo"
            {...register("email", { required: true })}
          />
        </label>
      </div>
      <div>
        <label className="loginAdmi__label">
          <span className="loginAdmi__labelSpan">Contraseña</span>
          <input
          className="loginAdmi__labelInput"
            name="password"
            type="password"
            placeholder="Escriba su contraseña"
            {...register("password", { required: true })}
          />
        </label>
      </div>
      <button className="loginAdmi__btnIngresar" type="submit">Iniciar sesión</button>
    </form>
  </div>
 
  )
}

export default Form

