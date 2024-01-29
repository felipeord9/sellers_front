import React, { useEffect, useState, useContext } from 'react';
import Logo from '../../assest/logo-gran-langostino.png'
import './login.css';
import AuthContext from "../../context/authContext";
import useUser from '../../hooks/useUser';
import * as Bs from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { Fade } from "react-awesome-reveal";
import Swal from "sweetalert2";
import { GiSandsOfTime } from "react-icons/gi";

export default function Login() {
  const {login,isLoginLoading,hasLoginError,isLogged}=useUser()
  const [loading,setLoading] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate =useNavigate()
  useEffect(()=>{
    if(isLogged && user.role==='vendedor')navigate('/formulario/vendedor');
    if(isLogged && user.role==='admin' || isLogged && user.role==='supervisor')navigate('/menu/prinicipal');
  },[isLogged,navigate]);

  const [info,setInfo]=useState({
    usuario:'',
    fechaIngreso: '',
    accion:'0',
    fechaSalida:null,
    macEquipo:null,
  })
  useEffect(()=>{
    if(isLogged && user){
      setInfo({ 
        usuario:user.name,      
        fechaIngreso: new Date(),
      })
    }
  },[isLogged])
  const [location, setLocation] = useState(null);
  const handleLogin=async(e)=>{
    e.preventDefault();
    setLoading(true)
    Swal.fire({
      title:'¡ATENCION!',
      text:'Esta aplicación solo funcionará si activas tu ubicación, asegurate de que esté activada.',
      icon:'warning',
      showConfirmButton:true,
      /* showCancelButton:true, */
      confirmButtonText:'Activar',
      /* cancelButtonText:'Cancelar', */
      confirmButtonColor:'#FE5000',
      /* cancelButtonColor:'grey' */
    }).then(({isConfirmed})=>{
      if(isConfirmed){
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              // Manejar la posición actual
              setLocation(position.coords);
              const { latitude, longitude } = position.coords;
              /* Swal.fire({
                title:`${location.latitude} --- ${location.longitude}`
              }) */
              localStorage.setItem('latitude',JSON.stringify(latitude))
              localStorage.setItem('longitude',JSON.stringify(longitude))             
              login({email,password})
              setLoading(false)
            },
            (error) => {
              // Manejar errores, como la denegación de la solicitud de ubicación
              Swal.fire({
                title:'¡ERROR!',
                text:'Recuerda que debes activar tu geolocalización, sino no podras utilizar la aplicación.',
                timer:4000,
                icon:'warning'
              })
              navigate('/')
              console.error("Error obteniendo la ubicación:", error.message);
            },
            {enableHighAccuracy:true,
            timeout: 5000, // Tiempo máximo de espera en milisegundos
            maximumAge: 0}
            

          );
        }
        /* Swal.fire({
          title:'¡ERROR!',
          text:'Recuerda que debes activar tu geolocalización, sino no podras utilizar la aplicación.',
          timer:4000,
          icon:'warning'
        }) */
        /* },[]) */
        /* if(isLocationEnabled===true){
          login({email,password})
        } */
      }
    })
    .catch((err)=>{
      Swal.fire({
        title: "¡Ha ocurrido un error!",
        text: `
          Hubo un error al momento de ingresar a la aplicación, intente de nuevo.
          Si el problema persiste por favor comuniquese con el área de sistemas.`,
        icon: "error",
        confirmButtonColor:'#FE5000',
        confirmButtonText: "Aceptar"});
      })
  }

  const [shown,setShown]=useState("");
  const switchShown =()=>setShown(!shown);
  const ejemplo = (e)=>{
    e.preventDefault();
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Actualiza el estado con la ubicación obtenida
          setLocation(position.coords);
        },
        (error) => {
          console.error("Error obteniendo la ubicación:", error.message);
        }
      );
    } else {
      console.error("La geolocalización no está disponible en este navegador.");
    }
  }
  return(
    <div className=" wrapper d-flex justify-content-center align-items-center vh-100 w-100 m-auto " style={{userSelect:'none'}}>
      <div className='rounder-4'>
      <div className='login-wrapper p-2 shadow-lg border-light rounded-4 border border-3 bg-gradient d-flexjustify-content-between ' style={{backgroundColor:'white'}}>
      <Fade cascade direction='down'>
      <div className='d-flex p-3 '>
        <img className='p-2 ' style={{width:340}} src={Logo} alt='' />
      </div>
      </Fade>
      {/* <h1 style={{color:'black'}}><strong>Log In</strong></h1> */}
      {/* {location && (
        <div>
        <label>{location.latitude}</label>
        <label>{location.longitude}</label>
        </div>
      )} */}
      <form onSubmit={handleLogin} className=''>
        <div className='input_group m-3 mb-0 d-flex flex-column'>
          <input type='text' id='usuario' style={{fontSize:18}} className='input_group_input' required onChange={(e)=> setEmail(e.target.value)}/>
          <label for="usuario" style={{fontSize:18}} className='input_group_label'>Usuario</label>
        </div>
        <div className='input_group m-3 mt-0 d-flex flex-column'>
          <input type={shown ? 'text':'password'} style={{fontSize:18}} onChange={(e)=>setPassword(e.target.value)} id='email' className='input_group_input' required/>
          <label for="email" style={{fontSize:18}} className='input_group_label'>Contraseña</label>
          <span className='position-absolute' onClick={switchShown} style={{ right: 10, cursor: "pointer",fontSize:25 }}>{shown ? <Bs.BsEye/>:<Bs.BsEyeSlash/>}</span>
        </div>
        <div className='align-content-center text-align-center align-items-center'>
          <center>
          <button type="submit" >{loading ? <strong>Cargando... <GiSandsOfTime /></strong>:<strong>Entrar</strong>}</button>
          </center>
        </div>
        <center>
        <label><a href='/send/recovery' className='text-decoration-none' style={{fontSize:'medium'}}><strong>¿Olvidaste tu constraseña?</strong></a></label>
        </center>
      </form>
      {isLoginLoading && <div className='loading'>Cargando...</div>}
      {hasLoginError && <div className='text-danger text-center mt-2'>Credenciales Incorrectas</div>}
    </div>
    </div>
    </div>
  )
}