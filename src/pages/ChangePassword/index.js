import { useState, useContext, useEffect } from "react";
import Logo from '../../assest/logo-gran-langostino.png'
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as Bs from "react-icons/bs";
import InputPassword from "../../components/InputPassword";
import { changePassword } from "../../services/authService";
import { Fade } from "react-awesome-reveal";
import AuthContext from "../../context/authContext";

export default function ChangePassword() {
  const { user, setUser } = useContext(AuthContext);

  const [realPassword,setRealPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errorInput, setErrorInput] = useState("");
  const navigate = useNavigate();

  const [info,setInfo]=useState({
    password:''
  })
  useEffect(()=>{
    if(user){
      setInfo({
        password:user?.password,
      })
    }
  },[user])
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setErrorInput("La contraseña nueva no coincide");
      return setTimeout(() => setErrorInput(""), 3000);
    }
    if (currentPassword === newPassword) {
      setErrorInput("La contraseña anterior es igual a la actual");
      return setTimeout(() => setErrorInput(""), 3000);
    }
    Swal.fire({
      title: '¿Está segur@ de querer cambiar su contraseña?',
          showDenyButton: true,
          confirmButtonText: 'Confirmar',
          confirmButtonColor: '#D92121',
          denyButtonText: `Cancelar`,
          denyButtonColor:'blue',
          icon:'question'
    }).then((result)=>{
      if(result.isConfirmed){
          changePassword({ currentPassword, newPassword })
          .then(()=>{
            Swal.fire({
              title: "¡Correcto!",
              text: "Contraseña actualizada exitosamente",
              icon: "success",
              showConfirmButton: false,
              timer: 2500,
            }).then(() => {
              navigate("/inicio");
            });
          }).catch((err)=>{
            Swal.fire({
              title: "Uups!",
              text: "¡Contraseña actual incorrecta! Verificala y vuelve a intentarlo",
              icon: "warning",
              showConfirmButton: false,
              timer: 2500,
            })
          })
        }
  })
      .catch((error) => {
        Swal.fire({
          title: "¡Uups!",
          text: "¡Contraseña actual incorrecta! Verificala y vuelve a intentarlo",
          icon: "warning",
          showConfirmButton: false,
          timer: 2500,
        })
        setErrorInput("¡Contraseña actual incorrecta!")
        return setTimeout(() => setErrorInput(""), 3000)
      });
  };
  const [shown,setShown]=useState("");
  const switchShown =()=>setShown(!shown);

  const [mostrar,setMostrar]=useState('');
  const switchMostrar=()=>setMostrar(!mostrar);

  const [see,setSee]=useState('');
  const switchSee=()=>setSee(!see);

  const handleClickInicio=(e)=>{
    e = e.target.value
    if( user.role==='vendedor'){
      /* return navigate('/inicio') */
      return navigate('/formulario/vendedor')
    }else if(user.role==='admin' || user.role==='supervisor'){
      /* return navigate('/compras') */
      return navigate('/menu/prinicipal')
    }
  }
  return (
    <div className=" wrapper d-flex justify-content-center align-items-center vh-100 w-100 m-auto " style={{userSelect:'none'}}>
      <div className='rounder-4'>
      <div className='login-wrapper p-2 shadow-lg border-light mt-5 rounded-4 border border-3 bg-gradient d-flexjustify-content-between ' style={{backgroundColor:'white'}}>
      <Fade damping={0.5} direction="down">
      <img src={Logo} alt='' style={{width:400}}/>
      </Fade>
      <Fade cascade>
      <center>
        <h2 className="mt-1" style={{color:'#FE5000'}}><strong>Cambiar contraseña</strong></h2>
      </center>
      </Fade>
      <form onSubmit={handleSubmit} className=''>
        <div className='input_group m-3 d-flex flex-column'>
        <input  type={shown ? 'text':'password'} onChange={(e)=>setCurrentPassword(e.target.value)} id='current' className='input_group_input' required/>
          <label  for="current" className='input_group_label'>Contraseña actual</label>
          <span className='position-absolute' onClick={switchShown} style={{ right: 10, cursor: "pointer",fontSize:25 }}>{shown ? <Bs.BsEye/>:<Bs.BsEyeSlash/>}</span>
        </div>
        <div className='input_group m-3 d-flex flex-column'>
          <input type={mostrar ? 'text':'password'} onChange={(e)=>setNewPassword(e.target.value)} id='newPass' className='input_group_input' required/>
          <label for="newPass" className='input_group_label'>Nueva contraseña</label>
          <span className='position-absolute' onClick={switchMostrar} style={{ right: 10, cursor: "pointer",fontSize:25 }}>{mostrar ? <Bs.BsEye/>:<Bs.BsEyeSlash/>}</span>
        </div>
        <div className='input_group m-3 d-flex flex-column'>
          <input type={see ? 'text':'password'} onChange={(e)=>setConfirmNewPassword(e.target.value)} id='confirm' className='input_group_input' required/>
          <label for="confirm" className='input_group_label'>Confirmar Nueva contraseña</label>
          <span className='position-absolute' onClick={switchSee} style={{ right: 10, cursor: "pointer",fontSize:25 }}>{see ? <Bs.BsEye/>:<Bs.BsEyeSlash/>}</span>
        </div>
        <div className='align-content-center text-align-center align-items-center'>
          <center>
          <button type="submit"><strong>CAMBIAR</strong></button>
          </center>
        </div>
        <center>
        <label className='mt-1'><a onClick={(e)=>handleClickInicio(e)} className="gui-input" style={{fontSize:'medium',cursor:'pointer'}}><strong>Volver al inicio</strong></a></label>
        </center>
        <div style={{height:12}}>
        <span
          className="text-center text-danger m-0"
          style={{ fontSize: 15, height: 0 }}
        >
          {errorInput}
        </span>
        </div>
      </form>
      
    </div>
    </div>
    </div>
  );
}
