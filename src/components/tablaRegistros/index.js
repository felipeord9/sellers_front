import * as FiIcons from 'react-icons/fi';
import DataTable from 'react-data-table-component'
import Swal from 'sweetalert2';
import { MdDeleteOutline } from "react-icons/md";
import { useState } from 'react';

export default function TableRegistros({ registros, loading , customStyles}) {
  const [selectedCliente, setSelectedTercero] = useState();
  const columns = [
    {
      id: "razonSocial",
      name: "Razon Social",
      selector: (row) => row.razonSocial,
      sortable: true,
      width: '250px',
      
    },
    {
      id: "nit",
      name: "Nit",
      selector: (row) => row.nit,
      sortable: true,
      width: '130px',
    },
    {
      id:'motivoVisita',
      name:'Motivo Visita',
      selector: (row) => row.motivoVisita,
      sortable: true,
      width: '320px'
    },
    {
      id:'usuarioCreador',
      name:'Usuario Creador',
      selector: (row) => row.usuarioCreador,
      sortable: true,
      width: '250px'
    },
    {
      id:'longitud',
      name:'Longitud',
      selector: (row) => row.longitud,
      sortable: true,
      width: '170px'
    },
    {
      id:'latitud',
      name:'Latitud',
      selector: (row) => row.latitud,
      sortable: true,
      width: '170px'
    },

  ]
  
  return (
    <div
      className="d-flex flex-column rounded m-0 p-0"
      style={{ height: "calc(100% - 60px)", width: "100%" , fontSize:18 }}
    >
    {/* <div
      className="wrapper justify-content-center d-flex flex-column rounded w-100 h-100" style={{userSelect:'none',fontSize:20}}
    >
    <div className='login-wrapper justify-content-center shadow border border-2 rounded-4 ' style={{width:'auto',height:400,backgroundColor:'white'}} > */}
      <DataTable
        className="bg-light text-center border border-2 h-auto w-100"
        customStyles={customStyles}
        columns={columns}
        data={registros}
        fixedHeaderScrollHeight={200}
        
        progressPending={loading}
        progressComponent={
          <div class="d-flex align-items-center text-danger gap-2 mt-2">
            <strong>Cargando...</strong>
            <div
              class="spinner-border spinner-border-sm ms-auto"
              role="status"
              aria-hidden="true"
            ></div>
          </div>
        }
        dense
        striped
        fixedHeader
        noDataComponent={
          <div style={{padding: 24}}>Ningún resultado encontrado...</div>} 
      />
      </div>
    /* </div> */
  )
}
