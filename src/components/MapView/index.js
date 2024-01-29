import React, { useEffect, useState } from "react";
import 'leaflet/dist/leaflet.css'
import { useLocation } from "react-router-dom";
import {MapContainer, TileLayer} from 'react-leaflet'
import Markers from "../markers";
import {findRegistros} from '../../services/registroService'

const MapView =()=>{
    const [puntos,setPuntos] = useState([])
    useEffect(()=>{
        findRegistros()
        .then(({data})=>{
            const coordenadas = data.map((elem)=>{
                /* if(elem){ */
                    return [elem.latitud,elem.longitud] /* `${elem.latitud},${elem.longitud}` *//* elem.latitud */
                /* } */
            })
            setPuntos(data)
            /* localStorage.setItem('coordenadas',JSON.stringify(data)) */
        })
    },[])
    const [state,setState] = useState({
        currentLocation:{lat:'3.4512653723079487',lng:'-76.53013093778655'}
        //3.4512653723079487, -76.53013093778655
    })

    const[route,setRoute] = useState([])
    useEffect(()=>{
        const data = localStorage.getItem('route');
        if(data){
            setRoute(JSON.parse(data));
        }
    })

    return <MapContainer center={state.currentLocation/* {lat:'3.5105353',lng:'-76.5064869'} */} zoom={10} >
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />   
        <Markers places = {route}/>
    </MapContainer>
}
export default MapView