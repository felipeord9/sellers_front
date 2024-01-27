import { useEffect, useState, useContext, useRef } from "react";
import Swal from "sweetalert2";
import { Modal } from "react-bootstrap";
import AuthContext from "../../context/authContext";
import "./styles.css";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { getAllCiudades } from '../../services/ciudadService'
import { getAllAgencies } from '../../services/agencyService'
import { IoIosSend } from "react-icons/io";
import { createRegistro , updateRegistro , findRegistros , sendMail , deleteRegistro } from '../../services/registroService'

const backgroundStyle = {
    backgroundImage: 'url("ruta_de_tu_imagen")',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    height: '100vh', // 100% del viewport height
    // Puedes ajustar otras propiedades según tus necesidades
  };

export default function FormVendedor() {
  const { user, setUser } = useContext(AuthContext);
  const navigate =useNavigate()
  const [motivoVisita,setMotivoVisita] = useState('mal pedido');

  const [state,setState] = useState({
    longitud:0,
    latitud:0,
  })
  /* useEffect(()=>{
    navigator.geolocation.watchPosition(
      function(position){
        setState({
          longitud:position.coords.longitude,
          latitud:position.coords.latitude
        })
      },
      function (error){
        console.log(error)
      },
      { enableHighAccuracy:true,timeout: 5000, // Tiempo máximo de espera en milisegundos
      maximumAge: 0}
    );
  },[]) */

  const [latitude,setLatitude] = useState('');
  const [longitude,setLongitude] = useState('');
  useEffect(()=>{
    const latitude = localStorage.getItem('latitude');
    const longitude = localStorage.getItem('longitude');
    if(latitude){
      setLatitude(JSON.parse(latitude))
    }
    if(longitude){
      setLongitude(JSON.parse(longitude))
    }
  },[])

  const [ciudades,setCiudades]=useState([]);
  const [ciudad,setCiudad] = useState('');
  const [agencias,setAgencias] = useState([]);
  const [agencia,setAgencia] = useState('');

  const [tipoCliente,setTipoCliente] = useState('Recurrente');
  const [search, setSearch] = useState({
    razonSocial:''.toUpperCase(),
    nit:'',
    direccion:''.toUpperCase(),
    telefono:'',
    contacto:''.toUpperCase(),
    correoElectronico:''.toLocaleLowerCase(),
    notas:'',
  });
  const [loading, setLoading] = useState(false);
  const selectBranchRef = useRef();
  const limitDeliveryDateField = new Date()
  limitDeliveryDateField.setHours(2)

  useEffect(() => {
    getAllCiudades().then((data)=>setCiudades(data));
    getAllAgencies().then((data)=>setAgencias(data));
  }, []);

  const handlerChangeSearch = (e) => {
    const { id, value } = e.target;
    console.log(value);
    setSearch({
      ...search,
      [id]: value,
    });
  };

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

  const [location, setLocation] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    /* if ("geolocation" in navigator) { */
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(
        (position) => {
          Swal.fire({
            title: "¿Está seguro?",
            text: `Se registrará la información de la visita al cliente ${search.razonSocial}`,
            icon: "warning",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#198754",
            showCancelButton: true,
            cancelButtonText: "Cancelar",
          }).then(({isConfirmed})=>{
            if(isConfirmed){
              setLoading(true);
              const body = {
              centroDeOperacion:agencia.description,
              tipoCliente:tipoCliente,
              razonSocial:search.razonSocial.toUpperCase(),
              nit:search.nit,
              direccion:search.direccion.toUpperCase(),
              telefono:search.telefono,
              ciudad:ciudad.description,
              contacto:search.contacto.toUpperCase(),
              correoElectronico:search.correoElectronico.toLocaleLowerCase(),
              motivoVisita:motivoVisita,
              notas:search.notas,
              fechaCreacion:new Date(),
              usuarioCreador:user.name,
              longitud:position.coords.longitude,
              latitud:position.coords.latitude,
              /* longitud: longitude,
              latitud: latitude, */
            };
            createRegistro(body)
            .then(()=>{
              /* const data = {
                correo:agencia.correo.toLocaleLowerCase(),
                vendedor:user.name.toUpperCase(),
                cliente: search.razonSocial.toUpperCase(),
              }
              sendMail(data) */
              setLoading(false);
                  Swal.fire({
                    title: "Registro Exitoso!",
                    text: `
                      La información de la visita se ha guardado satisfactoriamente 
                    `,
                    icon: "success",
                    confirmButtonText: "Aceptar",
                    confirmButtonColor:'green'
                  }).then(() => {
                    window.location.reload();
                  });
            })
            .catch((err) => {
              setLoading(false);
              /* deleteRegistro(resul) */
              Swal.fire({
                title: "¡Ha ocurrido un error!",
                text: `
                  Hubo un error al momento de registrar la visita, intente de nuevo.
                  Si el problema persiste por favor comuniquese con el área de sistemas.`,
                icon: "error",
                confirmButtonText: "Aceptar",
              });
            });
            }
          })
        },
        (error) => {
          console.error("Error obteniendo la ubicación:", error.message);
        },
        {enableHighAccuracy:true,timeout:5000,
        maximumAge:0}
      );
    } /* else if(!navigator.geolocation){ */
      Swal.fire({
        icon:'warning',
        title:'¡ATENCION!',
        showConfirmButton:false,
        text:'NO hemos detectato tu ubicación, activala para poder efectuar el registro sino, esta visita no se tomará encuenta.',
        timer:6000

      })
      console.error("La geolocalización no está disponible en este navegador.");
    /* } */
    
      /* Swal.fire({
        title: "¿Está seguro?",
        text: `Se registrará la información de la visita al cliente ${search.razonSocial}`,
        icon: "warning",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#198754",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
      }).then(({ isConfirmed }) => {
        if (isConfirmed) {
          setLoading(true);
          const body = {
            centroDeOperacion:agencia.description,
            tipoCliente:tipoCliente,
            razonSocial:search.razonSocial.toUpperCase(),
            nit:search.nit,
            direccion:search.direccion.toUpperCase(),
            telefono:search.telefono,
            ciudad:ciudad.description,
            contacto:search.contacto.toUpperCase(),
            correoElectronico:search.correoElectronico.toLocaleLowerCase(),
            motivoVisita:motivoVisita,
            notas:search.Notas,
            fechaCreacion:new Date(),
            usuarioCreador:user.name,
            longitud:longitude,
            latitud:latitude,
          };
          createRegistro(body)
            .then(({ data }) => {
                  setLoading(false);
                  Swal.fire({
                    title: "Registro Exitoso!",
                    text: `
                      La información se ha guardado satisfactoriamente 
                    `,
                    icon: "success",
                    confirmButtonText: "Aceptar",
                    confirmButtonColor:'green'
                  }).then(() => {
                    window.location.reload();
                  });
            })
            .catch((err) => {
              setLoading(false);
              Swal.fire({
                title: "¡Ha ocurrido un error!",
                text: `
                  Hubo un error al momento de registrar la visita, intente de nuevo.
                  Si el problema persiste por favor comuniquese con el área de sistemas.`,
                icon: "error",
                confirmButtonText: "Aceptar",
              });
            });
        }
      }); */
  };

  const refreshForm = () => {
    Swal.fire({
      title: "¿Está seguro?",
      text: "Se descartará todo el proceso que lleva",
      icon: "warning",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#dc3545",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
    }).then(({ isConfirmed }) => {
      if (isConfirmed) window.location.reload();
    });
  };
  const [checkbox1Checked, setCheckbox1Checked] = useState(false);
  const [checkbox2Checked, setCheckbox2Checked] = useState(true);

  const handleCheckbox1Change = () => {
    setCheckbox1Checked(!checkbox1Checked);
    // Desmarcar checkbox2 si checkbox1 se selecciona
    if (!checkbox1Checked) {
      setCheckbox2Checked(false);
      setTipoCliente('Nuevo')
    }
  };

  const handleCheckbox2Change = () => {
    setCheckbox2Checked(!checkbox2Checked);
    // Desmarcar checkbox1 si checkbox2 se selecciona
    if (!checkbox2Checked) {
      setCheckbox1Checked(false);
      setTipoCliente('Recurrente')
    }
  };
  return (
    <div className=" wrapper d-flex justify-content-center w-100 m-auto " style={{userSelect:'none'}}>
    <div
      className=" login-wrapper shadow rounded-4 pt-4 mt-5 mb-3 overflow-auto" style={{backgroundColor:'white',userSelect:'none',width:870, border:'solid black 6px'}}
    >
      <div className="w-100">
        <section className="d-flex flex-row justify-content-center align-items-center mb-2">
          <center>
            <h1 className="fs-3 fw-bold m-1 ms-4 me-4 pb-2" style={{fontSize:150,color:'#FE5000'}}><strong>FORMULARIO DE REGISTRO PARA CADA VISITA</strong></h1>
          </center>
        </section>
      </div>
      <form className="" onSubmit={handleSubmit}>
        <div className="bg-light rounded rounded-3 shadow-sm p-3 mb-3">

          {/* <button onClick={ejemplo}></button>
          {location && (
            <div>
            {location.latitude}
            {location.longitude}
            </div>
          )} */}

          <div className="d-flex flex-column gap-1">
            <div>
              <label className="fw-bold" style={{fontSize:18}}>CENTRO DE OPERACIÓN</label>
              <select
                ref={selectBranchRef}
                className="form-select form-select-sm"
                style={{height:35,fontSize:18}}
                onChange={(e) => setAgencia(JSON.parse(e.target.value))}
                required
              >
                <option selected value="" disabled>
                  -- Seleccione el Centro de Operación --
                </option>
                {agencias
                      .sort((a, b) => a.id - b.id)
                      .map((elem) => (
                        <option id={elem.id} value={JSON.stringify(elem)}>
                          {elem.description}
                        </option>
                      ))}
              </select>
            </div>
            <hr/>
            <div className="">
              <label className="fw-bold" style={{fontSize:18}}>INFORMACIÓN DEL CLIENTE</label>
              <div className="row row-cols-sm-2">
                <div className="d-flex flex-column align-items-start pb-1">
                  <label style={{fontSize:18}}>Razón Social:</label>
                  <input
                    id="razonSocial"
                    type="text"
                    value={search.razonSocial.toUpperCase()}
                    className="form-control form-control-sm"
                    placeholder="Campo Obligatorio"
                    onChange={handlerChangeSearch}
                    required
                    style={{height:35,fontSize:18}}
                  >
                  </input>
                </div>
                <div className="d-flex flex-column align-items-start pb-1">
                  <label style={{fontSize:15}}>NIT/Cédula:</label>
                  <input
                    id="nit"
                    type="number"
                    /* value={client ? client.nit : search.idCliente} */
                    className="form-control form-control-sm"
                    placeholder="Campo Obligatorio"
                    onChange={handlerChangeSearch}
                    style={{height:35,fontSize:18}}
                    max={9999999999}
                    min={0}
                    required
                  />
                </div>
              </div>
              <label className="" style={{fontSize:18}}>¿Es Cliente Nuevo?</label>
                  <div className="d-flex flex-row pb-1">
                  
                  <FormControlLabel
                    value="start"
                    id="tipoCliente"
                    control={<Checkbox color="success" checked={checkbox1Checked} onChange={handleCheckbox1Change}/>}
                    label="Sí"
                    style={{fontSize:18}}
                    labelPlacement="start"
                  />
                  <FormControlLabel
                    value="start"
                    id="tipoCliente"
                    control={<Checkbox color="error" checked={checkbox2Checked} onChange={handleCheckbox2Change} defaultChecked/>}
                    label="No"
                    labelPlacement="start"
                  />
                </div>
              <div className="row row-cols-sm-2">
                <div className="d-flex flex-column align-items-start pb-1">
                  <label style={{fontSize:18}}>Dirección de la Residencia:</label>
                  <input
                    id="direccion"
                    type="text"
                    value={search.direccion.toUpperCase()}
                    className="form-control form-control-sm"
                    placeholder="Campo Obligatorio"
                    onChange={handlerChangeSearch}
                    style={{height:35,fontSize:18}}
                    required
                  >
                  </input>
                </div>
                <div className="d-flex flex-column align-items-start pb-1">
                  <label style={{fontSize:18}}>Celular ó Teléfono:</label>
                  <input
                    id="telefono"
                    type="number"
                    /* value={client ? client.nit : search.idCliente} */
                    className="form-control form-control-sm"
                    placeholder="Campo Obligatorio"
                    onChange={handlerChangeSearch}
                    style={{height:35,fontSize:18}}
                    min={0}
                    required
                  />
                </div>
              </div>
              
              <div className="row row-cols-sm-2">
                <div className="d-flex flex-column align-items-start pb-1">
                  <label style={{fontSize:18}}>Ciudad:</label>
                  <select
                    ref={selectBranchRef}
                    className="form-select form-select-sm"
                    onChange={(e) => setCiudad(JSON.parse(e.target.value))}
                    style={{height:35,fontSize:18}}
                    required
                  >
                    <option selected value="" disabled>
                      --- Seleccione La Ciudad Donde Se Encuentra ---
                    </option>
                    {ciudades
                      .sort((a, b) => a.id - b.id)
                      .map((elem) => (
                        <option id={elem.id} value={JSON.stringify(elem)}>
                          {elem.description}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="d-flex flex-column align-items-start pb-1">
                  <label style={{fontSize:18}}>Nombre de Contacto:</label>
                  <input
                    id="contacto"
                    type="text"
                    value={search.contacto.toUpperCase()}
                    style={{height:35,fontSize:18}}
                    onChange={handlerChangeSearch}
                    /* value={client ? client.nit : search.idCliente} */
                    className="form-control form-control-sm"
                    placeholder="Campo Obligatorio"
                    min={0}
                    required
                  />
                </div>
              </div>
              <div className="d-flex flex-column align-items-start pb-1">
                  <label style={{fontSize:18}}>Correo Electrónico:</label>
                  <input
                    id="correoElectronico"
                    type="text"
                    value={search.correoElectronico.toLocaleLowerCase()}
                    style={{height:35,fontSize:18}}
                    onChange={handlerChangeSearch}
                    /* value={client ? client.nit : search.idCliente} */
                    className="form-control form-control-sm"
                    placeholder="Campo Obligatorio"
                    min={0}
                    required
                  />
                </div>
                <div className="d-flex flex-column align-items-start pb-1">
                  <label style={{fontSize:18}}>Motivo Visita:</label>
                  <select
                    ref={selectBranchRef}
                    style={{height:35,fontSize:18}}
                    className="form-select form-select-sm"
                    onChange={(e) => setMotivoVisita(JSON.parse(e.target.value))}
                    /* required */
                  >
                    <option selected value="" disabled>
                      --- Seleccione el Motivo de Visita ---
                    </option>
                  </select>
                </div>
            </div>
            <hr />
            <div className="d-flex flex-column mb-2">
              <label className="fw-bold" style={{fontSize:22}}>NOTAS:</label>
              <textarea
                id="notas"
                className="form-control border border-3"
                value={search.notas}
                onChange={handlerChangeSearch}
                style={{ minHeight: 70, maxHeight: 120, fontSize: 18 }}
              ></textarea>
            </div>
          </div>
        </div>
        <Modal show={loading} centered>
          <Modal.Body>
            <div className="d-flex align-items-center">
              <strong className="text-danger" role="status">
                Cargando...
              </strong>
              <div
                className="spinner-grow text-danger ms-auto"
                role="status"
              ></div>
            </div>
          </Modal.Body>
        </Modal>
        <div className="d-flex flex-row gap-3 mb-3">
          <button
            type="submit"
            className="fw-bold w-100 p-2 ms-2"
            style={{fontSize:15}}
          >
            ENVIAR
          </button>
          <Link className="w-100" to='https://pedidos.granlangostino.net:5515/login'>
          <button
            type="button"
            className="fw-bold w-100 p-2 me-1"
            style={{backgroundColor:'green', fontSize:15, height:50}}
          >
            PEDIDO NUEVO
          </button>
          </Link>
          <button
            type="button"
            className="fw-bold w-100 p-2 me-2"
            style={{backgroundColor:'grey', fontSize:15}}
            onClick={refreshForm}
          >
            CANCELAR
          </button>
        </div>
      </form>
    </div>
   </div>  
  );
}
