import './App.css';
import Swal from 'sweetalert2';
import { useState, useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes,Route,Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "sweetalert2/dist/sweetalert2.css";
import { AuthContextProvider } from './context/authContext';
import PrivateRoute from '../src/components/PrivateRoute'
import Login from '../src/pages/Login/login'
import Navbar from './components/Navbar';
import RecoveryPassword from './pages/RecoveryPassword';
import SendRecovery from './pages/SendRecoveryPassword'
import Page404 from './pages/Page404'
import ChangePassword from './pages/ChangePassword'
import React, { Component } from "react";
import FormVendedor from './pages/FormVendedor';
import Registros from './pages/registros';
import MenuPrincipal from './pages/menuPrincipal';
import GestionarUsers from './pages/GestionarUsers';
import Mapa from './pages/mapa';
import Gps from './pages/gps';
import ViewGps from './pages/gpsView';

function App() {

  /* useEffect(() => {
    // Detectar cuando la aplicación se está moviendo a segundo plano
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const handleVisibilityChange = () => {
    if (document.visibilityState === 'hidden') {
      // La aplicación se está moviendo a segundo plano
      // Enviar una notificación al usuario
      sendNotification();
    }
  };

  const sendNotification = () => {
    // Solicitar permiso al usuario para seguir funcionando en segundo plano
    if ('Notification' in window && Notification.permission !== 'granted') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          // El usuario ha concedido permiso
          // Realizar acciones necesarias para seguir funcionando en segundo plano
          // Por ejemplo, iniciar un servicio en segundo plano o mantener una conexión abierta
          Swal.fire({
            icon:'warning',
            title:'¡ATENCION!',
            text:'Se require un permiso para que la app siga funcionando en segundo plano debido a que se debe mantener la conexion con tu ubicacion.',
            showConfirmButton:true,
            confirmButtonText:'OK',
            confirmButtonColor:'#FE5000'
          })
          console.log('El usuario ha concedido permiso para seguir funcionando en segundo plano.');
        }
      });
    }
  }; */

  return(
    <AuthContextProvider>
    <Router>
      <Navbar/>
      <div id='wrapper' className="d-flex vh-100 bg-gradient">
      <Routes>
        <Route path='/' element={<Navigate to='/login'/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/send/recovery' element={<SendRecovery/>}/>
        <Route path='/recuperacion/contrasena//:token' element={<RecoveryPassword/>} />
        <Route path='/change/password' element={<PrivateRoute component={ChangePassword}/>}/>
        <Route path='*' element={<Page404/>}/>
        
        <Route path='/formulario/vendedor' element={<PrivateRoute component={FormVendedor}/>}/>
        <Route path='/registros' element={<PrivateRoute component={Registros}/>}/>
        <Route path='/menu/prinicipal' element={<PrivateRoute component={MenuPrincipal}/>}/>
        <Route path='/gestionar/usuarios' element={<PrivateRoute component={GestionarUsers}/>}/>
        <Route path='/mapa' element={<PrivateRoute component={Mapa}/>}/>

        <Route path='/gps' element={<PrivateRoute component={Gps}/>}/>
        <Route path='/view' element={<PrivateRoute component={ViewGps}/>}/>
      </Routes>
      </div>
    </Router>
  </AuthContextProvider>
);
}

export default App;
