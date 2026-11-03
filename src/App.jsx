

import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { LoginScreen, ResumenScreen } from './components/pantalla.jsx';
import JuegoUno from './components/Juego1.jsx';

function App() {
  const [pantallaActual, setPantallaActual] = useState(1);
  const [nombreJugador, setNombreJugador] = useState('');
  const [puntajeJuego1, setPuntajeJuego1] = useState(0);
  const [puntajeJuego2, setPuntajeJuego2] = useState(0);

  function iniciarJuego(nombre) {
    setNombreJugador(nombre);
    setPantallaActual(2);
  }

  function terminarJuego1(puntaje) {
    setPuntajeJuego1(puntaje);
    setPantallaActual(3);
  }

  function terminarJuego2(puntaje) {
    setPuntajeJuego2(puntaje);
    setPantallaActual(4);
  }

  function reiniciarJuego() {
    setNombreJugador('');
    setPuntajeJuego1(0);
    setPuntajeJuego2(0);
    setPantallaActual(1);
  }

  return (
    <div className="container my-4">
      {pantallaActual === 1 && <LoginScreen onComenzar={iniciarJuego} />}
      
      {pantallaActual === 2 && (
        <JuegoUno nombre={nombreJugador} onTerminar={terminarJuego1} />
      )}
      
      {pantallaActual === 3 && (
        <div className="text-center mt-5">
          <h2>Pantalla 3: Juego 2 (Pendiente)</h2>
          <p className="text-muted">-----------</p>
          <Button variant="warning" onClick={function() { terminarJuego2(30); }}>
            Simular terminar Juego 2 (30 pts)
          </Button>
        </div>
      )}
      
      {pantallaActual === 4 && (
        <ResumenScreen
          nombre={nombreJugador}
          puntaje1={puntajeJuego1}
          puntaje2={puntajeJuego2}
          onReiniciar={reiniciarJuego}
        />
      )}
    </div>
  );
}

export default App;