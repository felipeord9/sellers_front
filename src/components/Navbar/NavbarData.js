import * as LiaIcons from "react-icons/lia"
import { GoHomeFill } from 'react-icons/go'
import { FaEdit } from "react-icons/fa";
import { FaWalking } from "react-icons/fa";
import { FaWpforms } from "react-icons/fa";
import { RiUserSettingsLine } from "react-icons/ri";

export const NavBarData = [
  {
    title:'Menú Principal',
    path:'/menu/prinicipal',
    icon:<GoHomeFill/>,
    cName:'nav-text',
    access:['admin','supervisor'] ,
  },
  {
    title:'Formulario',
    path:'/formulario/vendedor',
    icon:<FaWpforms />,
    cName:'nav-text',
    access:['vendedor','admin','supervisor'] ,
  },{
    title:'Registro Visitas',
    path:'/registros',
    icon:<FaWalking  />,
    cName:'nav-text',
    access:['admin','supervisor'] 
  },
  {
    title:'Gestionar Usuarios',
    path:'/gestionar/usuarios',
    icon:<RiUserSettingsLine   />,
    cName:'nav-text',
    access:['admin'] 
  },
  {
    title:'Cambiar Contraseña',
    path:'/change/password',
    icon:<FaEdit />,
    cName:'nav-text',
    access:['vendedor','admin','supervisor'] 
  }
  /* {
    title:'Menu Principal',
    path:'/menu/principal/admin',
    icon:<GoHomeFill/>,
    cName:'nav-text',
    access:['admin']   
  }, */
];