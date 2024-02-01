import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as FiIcons from "react-icons/fi";
import * as FaIcons from "react-icons/fa";
import AuthContext from "../../context/authContext";
import useUser from "../../hooks/useUser";
import { NavBarData } from "./NavbarData";
import Swal from "sweetalert2";
/* import Logo from "../../assest/item.png"; */
import "./styles.css";
import MenuItem from '@mui/material/MenuItem';
import React from "react";
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Icon3 from '../../assest/gif.gif'
import Logo from '../../assest/logo-gran-langostino.png'
import  Button from "@mui/material/Button";
import Modal from '@mui/material/Modal'
import { AiFillEdit } from 'react-icons/ai'
import Box from '@mui/material/Box';
import { FaPowerOff } from "react-icons/fa";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  justifyContent:'center',
  boxShadow: 24,
  p: 3,
  borderRadius:5
};

export default function Navbar() {
  const { isLogged, logout } = useUser();
  const [showSideBar, setShowSidebar] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [tipo,setTipo]=useState();
  const handleTipo=(e)=>{
    setTipo(e.target.value);
  }
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [cerrar,setCerrar]=useState(false);
    const handleOpenCerrar=()=>{
        setCerrar(true);
    }
    const handleCerrar=()=>{
        setCerrar(false);
    }

  const [info,setInfo]=useState({
    usuario:'',
    accion:'0',
    fechaSalida: new Date(),
    macEquipo:null,
  })
  useEffect(()=>{
    if(user){
      setInfo({
        usuario:user?.name,
      })
    }
  },[user])
    /* Modal instancias */
    const [openModal,setOpenModal]=useState(false);
    const handleOpenModal=(e)=>{
      setOpenModal(true);
    } 
    const handleCloseModal=()=>{
      setOpenModal(false);
      
    }
    const handleClickInicio=(e)=>{
      e = e.target.value
      if( user.role==='cartera'){
        /* return navigate('/inicio') */
        return navigate('/menu/principal/Clientes')
      }else if(user.role==='compras' || user.role==='agencias' || user.role==='comprasnv'){
        /* return navigate('/compras') */
        return navigate('/menu/principal/Proveedores')
      }else{
        /* return navigate('/inicio/admin') */
        return navigate('/menu/principal/admin')
      }
    }
  return (
    <>
      {isLogged && (
        <div
          className="position-fixed shadow w-100"
          style={{ fontSize: 20, left: 0, height: "60px", zIndex: 2, userSelect:'none', backgroundColor:'white' }}
        >
          <div className="d-flex flex-row justify-content-between w-100 h-100 px-2 shadow">
            <div
              id="logo-header"
              className="d-flex flex-row align-items-center gap-2"
            >
            <span className="menu-bars m-0" style={{ cursor: "pointer"}}>
              <footer>
                <FaIcons.FaBars
                  /* className="text-danger" */
                  onClick={(e) => setShowSidebar(!showSideBar)}
                  style={{height:90,width:30, userSelect:'none' , color:'#FE5000'}}
                />
                </footer>
              </span>
              {/* <img
                src={Logo}
                width={100}
                className="navbar-img"
                onClick={(e)=>handleClickInicio(e)}
                unselectable="false"
                aria-invalid
                
                alt=""
                style={{ cursor: "pointer",height:55, width:220 , userSelect:'none'}}
              /> */}
            </div>

            <div className="d-flex flex-row justify-content-end align-items-end " style={{backgroundColor:'white'}}>
            <img
                src={Logo}
                className="navbar-img"
                /* onClick={(e)=>handleClickInicio(e)} */
                unselectable="false"
                aria-invalid
                
                alt=""
                style={{ cursor: "pointer",height:55, width:220 , userSelect:'none'}}
              />
            </div>
          </div>
          <nav
            className={showSideBar ? "bg-light nav-menu active" : "nav-menu"}
            style={{overflow:"auto",width:240}}
          >
            <ul
              className="nav-menu-items"
              onClick={(e) => setShowSidebar(!showSideBar)}
              style={{width:240}}
            >
              {NavBarData.map((item, index) => {
                if (item.access.includes(user.role)) {
                  return (
                    <li key={index} className={item.cName}>
                      <Link style={{height:50,fontSize:18}} to={item.path}>
                        {item.icon}
                        <span>{item.title}</span>
                      </Link>
                    </li>
                  );
                }
              })}
            </ul>
            <ul
              className="nav-menu-items"
              onClick={(e) => setShowSidebar(!showSideBar)}
            >
              <li className="text-center text-secondary">
              <button className="w-100 mb-1" onClick={handleOpenModal}>
                <label className="ms-1" style={{fontSize:15}}><FaPowerOff  className="me-2"/>CERRAR SECCIÓN</label>
              </button>  
              <Modal open={openModal}
                    onClose={handleCloseModal}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description">
                    <Box sx={style}>
                      <center>
                          <img src={Icon3} style={{width:100}}/>
                        <div className="d-flex flex-row">
                        <h3 id="parent-modal-title" className=' d-flex'>¿Está segur@ que desea cerrar la sección?</h3>
                        </div>
                        <div className="d-flex flex-row justify-content-center">
                          <div onClick={handleClose} >
                            <button  className='m-4' onClick={(e)=>(handleCloseModal(e), logout(e),setShowSidebar(false))} style={{fontSize:18}}><strong>YES</strong></button>
                          </div>
                        <div>
                          <Button variant="contained" color="primary" style={{width:90, height:55,fontSize:22}} className="m-4" onClick={handleCloseModal}>NO</Button> 
                        </div>
                        </div>
                      </center>
                    </Box>
                  </Modal>               
              <span className="m-0">Gran Langostino S.A.S</span>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}
