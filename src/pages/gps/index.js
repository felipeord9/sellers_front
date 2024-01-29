import React, { useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Swal from "sweetalert2";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './styles.css';
import { Button } from "@mui/material";
import GpsMap from '../../components/gpsMap';
import { RiArrowGoBackFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';

export default function Gps(){
  const navigate =useNavigate()
  return(
    <div className="wrapper w-100 h-100 justify-content-center d-flex flex-column pt-5">
          {/* <div className='d-flex justify-content-start w-100 ps-4 '>
            <Button style={{height:35}} onClick={(e)=>navigate('/registros')} variant="contained" ><RiArrowGoBackFill className="me-1" />back</Button>
          </div> */}
          <GpsMap />
    </div>
    )
}
