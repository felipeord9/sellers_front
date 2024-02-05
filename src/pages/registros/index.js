import { useState, useEffect , useContext } from "react";
import * as GoIcons from "react-icons/go"
import TableRegistros from "../../components/tablaRegistros"
import { findRegistros } from "../../services/registroService"
import * as FaIcons from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
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
import { FaMapMarkedAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { FaEye } from "react-icons/fa";
import AuthContext from "../../context/authContext";

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


export default function Terceros() {
  const [registros, setRegistros] = useState([]);
  const [suggestions, setSuggestions] = useState([])
  const [search, setSearch] = useState('')
  const navigate =useNavigate()
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false)
  const [filterDate, setFilterDate] = useState({
    initialDate: null,
    finalDate: null,
  });
  const [filteredData,setFilteredData] =useState ([]);

  const getFilteredOrders = () => {
    if (filterDate.initialDate && filterDate.finalDate && search==="") {
      const nexDay = new Date(filterDate.initialDate);
      nexDay.setDate(nexDay.getDate()+1);
      const initialDate = nexDay.toLocaleDateString();

      const next = new Date(filterDate.finalDate);
      next.setDate(next.getDate()+1);
      const finalDate= next.toLocaleDateString();
      /* const initialDate = new Date(filterDate.initialDate).toLocaleDateString();
      const finalDate = new Date(filterDate.finalDate).toLocaleDateString(); */
      const filteredOrders = registros.filter((elem) => {
        const splitDate = new Date(elem.fechaCreacion).toLocaleDateString();
        if ((splitDate >= initialDate) && (splitDate <= finalDate)) {
          return elem;
        }
        /* if(initialDate===finalDate && initialDate === splitDate){
          return elem
        } */
        return 0;
      });

      setFilteredData(filteredOrders);
    }
    if (filterDate.finalDate==="" && filterDate.initialDate==="" && search !==""){
      const filteredRegistros = registros.filter((elem) => {
        const elemento = elem.usuarioCreador.toUpperCase()
        if(      
          elemento.includes(search.toUpperCase())
        ) {
          return elem
        }
      })
      setFilteredData(filteredRegistros);
    }
    if(filterDate.finalDate !=="" && filterDate.initialDate !=="" && search !==""){
      const nexDay = new Date(filterDate.initialDate);
      nexDay.setDate(nexDay.getDate()+1);
      const initialDate = nexDay.toLocaleDateString();

      const next = new Date(filterDate.finalDate);
      next.setDate(next.getDate()+1);
      const finalDate= next.toLocaleDateString();

      
      const filtro = registros.filter((item)=>{
        const elemento = item.usuarioCreador.toUpperCase()
        const splitDate = new Date(item.fechaCreacion).toLocaleDateString();
        if((splitDate >= initialDate) && (splitDate <= finalDate) && (elemento.includes(search.toUpperCase()))){
          return item
        }
      })
      setFilteredData(filtro)
    }
  };

  const handleChangeFilterDate = (e) => {
    const { id, value } = e.target;
    setFilterDate({
      ...filterDate,
      [id]: value,
    });
  };
  const removeFilterDate = () => {
    setFilterDate({
      initialDate: "",
      finalDate: "",
    });
    setSearch("");
    getAllTerceros();
  };
  useEffect(() => {
    getAllTerceros()
  }, []);

  const getAllTerceros = () => {
    setLoading(true)
    findRegistros()
      .then(({ data }) => {
        if(user.role === 'admin'){
          setRegistros(data)
          setSuggestions(data)
          setFilteredData(data)
          setLoading(false)
        }else{
          const filtro = data.filter((element)=>{
            if(user.name === element.centroDeOperacion){
              return element
            }
          })
          setRegistros(filtro)
          setSuggestions(filtro)
          setFilteredData(filtro)
          setLoading(false)
        }
        /* setRegistros(data)
        setSuggestions(data)
        setFilteredData(data)
        setLoading(false) */
      })
      .catch((error) => {
        setLoading(false)
      });
  }

  const searchRegistros = (e) => {
    const { value } = e.target
    if(value !== "") {
      const filteredRegistros = registros.filter((elem) => {
        const elemento = elem.usuarioCreador.toUpperCase()
        if(      
          elemento.includes(value.toUpperCase())
        ) {
          return elem
        }
      })
      setFilteredData(filteredRegistros);
      /* if(filteredRegistros.length > 0) {
        setFilteredData(filteredRegistros)
      } else {
        setFilteredData(registros)
     } */
    } else {
      setFilteredData(registros)
    }
    setSearch(value)
  }

  const customStyles = {
    cells: {
      style: {
        fontSize: '18px', // ajustar el tamaño de la fuente de las celdas
      },
    },
    rows: {
      style: {
        height:'35px' // ajusta el alto de las filas según tus necesidades
      },
    },
    headCells: {
      style: {
        fontSize: '18px',
        height:'35px',
        backgroundColor:'#FE5000',
        color:'white'
      },
    },
  };

  const handlerClickSeeRoute = (e) =>{
    e.preventDefault();
    localStorage.setItem('route',JSON.stringify(filteredData));
    navigate('/mapa')
  }

  return (
    <div className="wrapper w-100 justify-content-center d-flex flex-column mt-5">
      <div className="login-wrapper w-100 h-100 d-flex flex-row gap-2">
        <div className="container w-100 h-100 d-flex flex-column gap-2">
      <center>
      <h1 className=" fw-bold mt-3" style={{color:'#FE5000'}}>Listado de Visitas registradas</h1>
      </center>
        <div className="d-flex justify-content-center gap-3 mb-1">
          <input
            type="search"
            value={search}
            className="form-control form-control-sm rounded-2"
            placeholder="Buscar por Vendedor"
            onChange={searchRegistros}
            /* onChange={(e)=>setSearch(e)} */
            style={{fontSize:20}}
          />
          <div className="btn-group dropdown">
            {/* <button
              title="Filtro por fecha"
              type="button"
              class="d-flex align-items-center btn btn-sm btn-primary"
              onClick={getFilteredOrders}
            >
              <FaIcons.FaFilter />
            </button> */}
            <button
              type="button"
              id="dropdownMenuButton"
              className="btn btn-sm btn-primary dropdown-toggle dropdown-toggle-split"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <FaIcons.FaFilter className="me-2"/>
              <span className="visually-hidden rounded rounded-2">Toggle Dropdown</span>
            </button>
            <ul className="dropdown-menu p-0 m-0" aria-labelledby="dropdownMenuButton">
              <li className="d-flex w-100 form-control form-control-sm justify-content-center" style={{fontSize:16,backgroundColor:'#FE5000',color:'white'}}><strong>Filtrar Por Fecha</strong></li>
              <li className="d-flex flex-row gap-2 ">
                <input
                  id="initialDate"
                  type="date"
                  value={(filterDate.initialDate)}
                  className="form-control form-control-sm dropdown-item"
                  max={filterDate.finalDate}
                  onChange={(e)=>(handleChangeFilterDate(e))}
                  style={{fontSize:18}}
                />
                -
                <input
                  id="finalDate"
                  type="date"
                  value={filterDate.finalDate}
                  className="form-control form-control-sm"
                  min={filterDate.initialDate}
                  onChange={handleChangeFilterDate}
                  style={{fontSize:18}}
                />
              </li>
              <li className="d-flex justify-content-center gap-3 mt-2  mb-2 w-100">
                <button
                  className="btn btn-sm btn-primary w-50 ms-2"
                  onClick={getFilteredOrders}
                  style={{fontSize:18}}
                >
                  <strong>Filtrar</strong>
                </button>
                <button
                  className="btn btn-sm btn-danger w-50  me-3 "
                  onClick={removeFilterDate}
                  style={{fontSize:18}}
                >
                  <strong>Borrar Filtro</strong>
                </button>
              </li>
            </ul>
          </div>
          {/* <div>
            <button
              title="Filtrar"
              className="btn btn-sm ps-3 pe-3 p-2 btn-success"
              onClick={getFilteredOrders}
              style={{fontSize:18}}
            >
              <strong>Filtrar</strong>
            </button>
          </div> */}
          {/* <div>
            <button
              className="btn btn-sm btn-danger me-2"
              onClick={removeFilterDate}
              style={{fontSize:18}}
            >
              Borrar
            </button>
          </div> */}
          <div>
            <button
             title="Ver Recorrido"
             className="btn btn-sm p-2 ps-3 pe-3" 
             onClick={(e)=>handlerClickSeeRoute(e)}
             style={{backgroundColor:'#FE5000', color:'white',fontSize:16}}
             ><strong><FaEye /></strong></button>
          </div>
        </div>
        {/* <TableRegistros registros={suggestions} loading={loading} customStyles={customStyles} style={{fontSize:30}}/> */}
        <TableContainer className="d-flex mb-3" component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow >
                <StyledTableCell style={{fontSize:18}} className="d-flex justify-content-center">NIT</StyledTableCell>
                <StyledTableCell style={{fontSize:18,width:260}}>RazonSocial</StyledTableCell>
                <StyledTableCell style={{fontSize:18}}>Motivo</StyledTableCell>
                <StyledTableCell style={{fontSize:18}}>Creador</StyledTableCell>
                <StyledTableCell style={{fontSize:18}}>Longitud</StyledTableCell>
                <StyledTableCell style={{fontSize:18}}>Latitud</StyledTableCell>
                {/* <StyledTableCell style={{fontSize:18}}>xxxxx</StyledTableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((row) => (
                <StyledTableRow style={{fontSize:18}}>
                  <StyledTableCell style={{width:120,fontSize:18}} component="th" scope="row">
                    {row.nit}
                  </StyledTableCell>
                  <StyledTableCell style={{fontSize:18}}>{row.razonSocial}</StyledTableCell>
                  <StyledTableCell style={{fontSize:18}}>{row.motivoVisita}</StyledTableCell>
                  <StyledTableCell style={{fontSize:18, width:150}}>{row.usuarioCreador}</StyledTableCell>
                  <StyledTableCell style={{fontSize:18, width:120}}>{row.longitud}</StyledTableCell>
                  <StyledTableCell style={{fontSize:18, width:120}}>{row.latitud}</StyledTableCell>
                  {/* <StyledTableCell style={{fontSize:18, width:120}}>{row.centroDeOperacion}</StyledTableCell> */}
                </StyledTableRow>
              ))}
              {filteredData.length===0 &&(
                <StyledTableRow>
                  <StyledTableCell className="d-flex w-100 justify-content-center" style={{fontSize:18}}><strong>NO HAY REGISTROS</strong></StyledTableCell>
                </StyledTableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {/* {filteredData.map((elem)=>{
          return `
          ${elem.nit}
          `
        })}
        <span>{filterDate.finalDate}</span>
        <span>{filterDate.initialDate}</span> */}
    </div>
    </div>
    </div>
  )
} 