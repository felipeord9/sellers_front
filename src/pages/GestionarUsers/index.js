import { useState, useEffect } from "react";
import * as GoIcons from "react-icons/go"
import { deleteUserByName } from '../../services/userService';
import ModalUsers from "../../components/ModalUsers";
import { findUsers } from "../../services/userService"
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import * as FiIcons from 'react-icons/fi';
import Swal from 'sweetalert2';
import { MdDeleteOutline } from "react-icons/md";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#FE5000'/* theme.palette.common.black */,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));



export default function GestionarUsers() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [suggestions, setSuggestions] = useState([])
  const [search, setSearch] = useState('')
  const [showModalUsers, setShowModalUsers] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getAllUsers()
  }, []);

  const getAllUsers = () => {
    setLoading(true)
    findUsers()
      .then(({ data }) => {
        setUsers(data)
        setSuggestions(data)
        setLoading(false)
      })
      .catch((error) => {
        setLoading(false)
      });
  }

  const searchUsers = (e) => {
    const { value } = e.target
    if(value !== "") {
      const filteredUsers = users.filter((elem) => {
        if(
          elem.rowId.includes(value) ||
          elem.name.toLowerCase().includes(value.toLowerCase()) ||
          elem.role.toLowerCase().includes(value.toLowerCase())
        ) {
          return elem
        }
      })
      if(filteredUsers.length > 0) {
        setSuggestions(filteredUsers)
      } else {
        setSuggestions(users)
     }
    } else {
      setSuggestions(users)
    }
    setSearch(value)
  }

  return (
    <div className="wrapper w-100 justify-content-center d-flex flex-column mt-5">
      <div className="login-wrapper w-100 h-100 d-flex flex-row gap-2">
        <div className="container w-100 h-100 d-flex flex-column gap-2">
      <center className="m-0">
      <h1 className=" fw-bold mt-3" style={{color:'#FE5000'}}>Listado de Usuarios registrados</h1>
      </center>
      <ModalUsers 
        user={selectedUser}
        setUser={setSelectedUser}
        showModal={showModalUsers} 
        setShowModal={setShowModalUsers} 
        reloadInfo={getAllUsers} 
      />
      {/* <div className="d-flex flex-column gap-1 h-100"> */}
        <div className="d-flex justify-content-end gap-3 mt-0">
          <input
            type="search"
            value={search}
            className="form-control form-control-sm w-100"
            placeholder="Buscar usuario"
            onChange={searchUsers}
            style={{width:500, fontSize:20}}
          />
          <button
            title="Nuevo usuario"
            className="d-flex  text-nowrap btn btn-sm text-light gap-1" 
            style={{fontSize:18,backgroundColor:'#FE5000'}}
            onClick={(e) => setShowModalUsers(!showModalUsers)}>
              Nuevo usuario
              <GoIcons.GoPersonAdd style={{width: 25, height: 25}} />
          </button>
        </div>
        <TableContainer className="d-flex mb-3" component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow >
                <StyledTableCell style={{fontSize:18}} className="d-flex justify-content-center">ID</StyledTableCell>
                <StyledTableCell style={{fontSize:18,width:360}}>Nombre</StyledTableCell>
                <StyledTableCell style={{fontSize:18}}>Correo</StyledTableCell>
                <StyledTableCell style={{fontSize:18}}>Role</StyledTableCell>
                <StyledTableCell style={{fontSize:18,width:70}}>Editar</StyledTableCell>
                <StyledTableCell style={{fontSize:18,width:80}}>Borrar</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {suggestions.map((row) => (
                <StyledTableRow style={{fontSize:18}} key={row.rowId}>
                  <StyledTableCell style={{width:120,fontSize:18}} component="th" scope="row">
                    {row.rowId}
                  </StyledTableCell>
                  <StyledTableCell style={{fontSize:18}}>{row.name}</StyledTableCell>
                  <StyledTableCell style={{fontSize:18}}>{row.email}</StyledTableCell>
                  <StyledTableCell style={{fontSize:18, width:120}}>{row.role}</StyledTableCell>
                  <StyledTableCell style={{fontSize:18, width:70}}>
                    <div className='d-flex gap-2 p-1'>
                      <button title="Editar Usuario" className='btn btn-sm btn-primary' onClick={(e) => {
                        setSelectedUser(row)
                        setShowModalUsers(true)
                      }}><FiIcons.FiEdit /></button>
                    </div>
                  </StyledTableCell>
                  <StyledTableCell style={{fontSize:18, width:70}}>
                    <div className='d-flex gap-2 p-1'>
                    <button title="Eliminar usuario" className='btn btn-sm btn-danger ' onClick={(e) => {
                      setSelectedUser(row)
                      Swal.fire({
                        title:'¿Esta segur@?',
                        icon:'question',
                        text:`Se eliminará el usuario "${row.name.toUpperCase()}" de la base de datos`,
                        showCancelButton:true,
                        showConfirmButton:true,
                        cancelButtonColor:'grey',
                        confirmButtonColor:'#D92121',
                        confirmButtonText:'Si, eliminar'
                      }).then((result)=>{
                        if(result.isConfirmed){
                          deleteUserByName(row.name)
                          .then(()=>{
                            Swal.fire({
                              title:'Eliminado',
                              text:`Usuari@ "${row.name.toUpperCase()}" eliminado con éxito`,
                              icon:'success',
                              showConfirmButton:'true',
                              confirmButtonColor:'green',
                              timer:5000
                            })
                          })
                          .then(()=>{
                            window.location.reload();
                          })
                          .catch((err)=>{
                            Swal.fire({
                              title:'Algo salió mal',
                              text:'Ha ocurrido un error al borrar el usuario, intentalo de nuevo. Si el problema persiste, comunicate con el área de sistemas',
                              icon:'error',
                              showConfirmButton:'true',
                              confirmButtonColor:'green'
                            })
                          })
                        }
                      })
                    }}>
                      <MdDeleteOutline />
                    </button>
                    </div>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    {/* </div> */}
    </div>
    </div>
  )
} 