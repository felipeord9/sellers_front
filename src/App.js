import './App.css';
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

function App() {
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
      </Routes>
      </div>
    </Router>
  </AuthContextProvider>
);
}

export default App;
