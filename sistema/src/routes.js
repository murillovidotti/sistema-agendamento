// Impotações
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './Components/Home/home'; 
import Agendamentos from './Components/Agendamentos/agendamentos';


// Definindo rotas
function Rotas(){
    return(
        <Router>
        <Routes>
          <Route path="/" caseSensitive={false} element={<Home />} />
          <Route path="/agendamentos" caseSensitive={false} element={<Agendamentos />} />
        </Routes>
      </Router>
    );
};

export default Rotas;