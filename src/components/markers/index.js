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
    const markers = places.map((item,i)=>( 
        <Marker
            key={i}
            position={{lat:item.latitud,lng:item.longitud}}
            /* position={[place.latitud,place.longitud]} */
            /* position={{lat:'3.5105353',lng:'-76.5064869'}} */
            icon={IconLocation}
        ></Marker>

    ))
    return markers/* (
        <div>
        {puntos.map((item)=>{
            <Marker
                
                position={{lat:'3.5105353',lng:'-76.5064869'}}
                icon={IconLocation}
            ></Marker>
        })}
        </div>
        ) */
    }
    export default Markers

    /* key={i} */
                /* position={{lat:item.latitud,lng:item.longitud}} */
                /* position={[place.latitud,place.longitud]} */

    {/* <Marker
    
        position={{lat:'3.5105353',lng:'-76.5064869'}}
        icon={IconLocation}
    ></Marker> */}

//3.4877530785058166, -76.51706596838137
//3.492465010924786, -76.50977035966173
// 3.4958918560134546, -76.50075813712567
// 3.4981192986074614, -76.50908371413516
