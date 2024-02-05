import React, { useEffect, useState } from "react";
import {Marker,Popup} from 'react-leaflet'
import { FaMapMarkerAlt } from "react-icons/fa";
import {IconLocation} from '../iconLocation'

const Markers = ({places}) =>{
    const [puntos,setPuntos] = useState([]);
    const [mensaje,setMensaje] = useState(null);
    useEffect(()=>{
        const data = localStorage.getItem('coordenadas');
        if(data){
            setPuntos(JSON.parse(data));
        }
    })

    const modificarFecha=({fecha})=>{
        const date = new Date(fecha).toLocaleDateString()
        const hora = new Date(fecha).toLocaleTimeString()
        return `${date} ${hora}`
    }

    const markers = places.map((item,i)=>( 
        <Marker
            key={i}
            position={{lat:item.latitud,lng:item.longitud}}
            icon={IconLocation}
        >
            <Popup>
                <div className="d-flex flex-column">
                   <strong style={{textTransform:'uppercase'}}>{item.razonSocial}</strong>
                    <label className="d-flex"><strong className="d-flex me-1">Creador:</strong>{item.usuarioCreador}</label>
                    <div className="d-flex">
                        <label className="me-1"><strong>Fecha:</strong></label>
                        <label className="me-2">{new Date(item.fechaCreacion).toLocaleDateString()}</label>
                    </div>
                        <label><strong className="me-1">Hora:</strong>{new Date(item.fechaCreacion).toLocaleTimeString()}</label>
                </div>
            </Popup>
        </Marker>
    ))
    return markers
    }
    export default Markers

//3.4877530785058166, -76.51706596838137
//3.492465010924786, -76.50977035966173
// 3.4958918560134546, -76.50075813712567
// 3.4981192986074614, -76.50908371413516
