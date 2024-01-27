import React, { useState, useContext, useEffect } from "react"
import { Navigate, useNavigate } from 'react-router-dom';
import { Fade } from "react-awesome-reveal";
import AuthContext from "../../context/authContext";

export default function MenuPrincipal(){
  const { user, setUser } = useContext(AuthContext);
  const navigate =useNavigate()

    const handleClickInicio=(e)=>{
      e = e.target.value
      if(user.role==='agencias' || user.role==='cartera'){
        return navigate('/inicio')
      }else if(user.role==='compras'){
        return navigate('/compras')
      }else{
        return navigate('/inicio/admin')
      }
    }

    const handleClickBack=(e)=>{
      e = e.target.value
      if(user.role==='agencias' || user.role==='cartera'){
        return navigate('/validar/tercero')
      }else if(user.role==='compras'){
        return navigate('/validar/Proveedor')
      }else{
        return navigate('/validacion/admin')
      }
    }

    const BotonColorCambiante = ({ children }) => {
      const [hover, setHover] = useState(false);
      const handleMouseEnter = () => {
        setHover(true);
      };
      const handleMouseLeave = () => {
        setHover(false);
      };
      const buttonStyle = {
        backgroundColor: hover ? '#FE5000' : 'whitesmoke', // Cambia los colores según tus necesidades
        color: hover ? 'white':'black',
        padding: '10px',
        cursor: 'pointer',
        height: 170,
        width:280,
        fontSize:21,
        border: hover ? 'solid #FE5000': 'solid #B9B9B9',
        transform: hover ? 'scale(1.1)' : 'scale(1)',
        /* filter: hover ? 'brightness(80%)' : 'brightness(100%)', */
        transition: 'all 0.3s ease',
      };
      return (
        <button
          className="rounded-2 m-2 me-4"
          style={buttonStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {children}
        </button>
      );
    };
    
    return(
      <div className="wrapper w-100 justify-content-center d-flex flex-column mt-5">
      <div className="'login-wrapper justify-content-center align-items-center w-100 d-flex flex-row h-100 gap-2">
        <div className="container w-100 d-flex flex-row justify-content-center mt-2 gap-2">
    <div className='d-flex flex-row '>
    <Fade cascade damping={0.1} direction="down" triggerOnce='true'>
    <div className="d-flex flex-row w-100">
        <center>
        <div className="ms-3 mt-5 mb-3" style={{border:10,borderColor:'#D92121'}}>
        <div className=" mb-4">
          <a onClick={(e)=>navigate('/formulario/vendedor')}><BotonColorCambiante>Formulario de Visita</BotonColorCambiante></a>
          <a onClick={(e)=>navigate('/registros')}><BotonColorCambiante>Registro de Visitas</BotonColorCambiante></a>
          {user.role === 'admin' && (
            <a onClick={(e)=>navigate('/gestionar/usuarios')}><BotonColorCambiante>Gestionar Usuarios</BotonColorCambiante></a>
          )}
        </div>
        </div>
        </center>
      </div>
      </Fade>
      
    </div>
    </div>
    </div>
    </div>
    

    )
}

/* <Fade cascade damping={0.1} direction="down" triggerOnce='true'>
      <div className="d-flex flex-row">
      <div className="me-5 d-flex justify-content-center align-items-center">
        <img src={Logo} style={{width:450,height:200}} />
      </div>
      
      <div>
        <center>
        <label className='text-danger' style={{color:'black', marginBottom:5, fontSize:60, userSelect:'none'}}><strong>¡Bienvenid@!</strong></label>
        <hr style={{width:400, color:'black'}}/>
        </center>
        <div className="d-flex flex-row">
        <h4 className="me-5 mt-3">Validación de Tercero: </h4>
        <div className="d-flex flex-row">
        
        <TextField min={10000000}
                    max={9999999999}
                    value={search.cedula}
                    pattern="[0-9]"
                    onChange={handlerChangeSearch} id="cedula" type="number" style={{fontSize:20}} label="Número de documento" variant="standard"></TextField>
        
        </div>
        </div>
        <center>
        <div className="mt-2">
          <button onClick={(e)=>handleSearch(e)} className="ms-3 mt-1">Buscar Cliente</button>
          <button  style={{backgroundColor:'blue'}} onClick={(e)=>searchProveedor(e)} className="ms-3 mt-1">Buscar Proveedor</button>
        </div>
        </center>
      </div>
      </div>
      </Fade> */