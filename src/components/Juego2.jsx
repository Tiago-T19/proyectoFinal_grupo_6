import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Marcador } from './Marcador';
import { TarjetaAnimal } from './TarjetaAnimal';

const RONDAS_JUEGO_2 = [
  { 
    id: 1, 
    animales: [
      { id: '1a', nombre: 'Perro', emoji: '🐶', esIntruso: false },
      { id: '1b', nombre: 'Gato', emoji: '🐱', esIntruso: false },
      { id: '1c', nombre: 'León', emoji: '🦁', esIntruso: true }
    ] 
  },
  { 
    id: 2, 
    animales: [
      { id: '2a', nombre: 'Vaca', emoji: '🐄', esIntruso: false },
      { id: '2b', nombre: 'Oveja', emoji: '🐑', esIntruso: false },
      { id: '2c', nombre: 'Cocodrilo', emoji: '🐊', esIntruso: true }
    ] 
  },
  { 
    id: 3, 
    animales: [
      { id: '3a', nombre: 'Gallina', emoji: '🐔', esIntruso: false },
      { id: '3b', nombre: 'Chancho', emoji: '🐷', esIntruso: false },
      { id: '3c', nombre: 'Elefante', emoji: '🐘', esIntruso: true }
    ] 
  },
  { 
    id: 4, 
    animales: [
      { id: '4a', nombre: 'Caballo', emoji: '🐴', esIntruso: false },
      { id: '4b', nombre: 'Vaca', emoji: '🐄', esIntruso: false },
      { id: '4c', nombre: 'Tiburón', emoji: '🦈', esIntruso: true }
    ] 
  },
  { 
    id: 5, 
    animales: [
      { id: '5a', nombre: 'Oveja', emoji: '🐑', esIntruso: false },
      { id: '5b', nombre: 'Perro', emoji: '🐶', esIntruso: false },
      { id: '5c', nombre: 'Pingüino', emoji: '🐧', esIntruso: true }
    ] 
  }
];

function JuegoDos({ nombreJugador, onTerminar }) {
  const [rondaActual, setRondaActual] = useState(0);
  const [puntaje, setPuntaje] = useState(0);
  const [respondido, setRespondido] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [esCorrecto, setEsCorrecto] = useState(false);
  const [seleccionadoId, setSeleccionadoId] = useState(null);
  const [animalesMezclados, setAnimalesMezclados] = useState([]);

  const totalRondas = RONDAS_JUEGO_2.length;
  const esUltimaRonda = rondaActual === totalRondas - 1;

  useEffect(function() {
    const animalesOriginales = RONDAS_JUEGO_2[rondaActual].animales;
    const mezclados = [...animalesOriginales].sort(function() {
      return Math.random() - 0.5;
    });
    setAnimalesMezclados(mezclados);
  }, [rondaActual]);

  function handleSeleccion(animal) {
    if (respondido) return;

    setRespondido(true);
    setSeleccionadoId(animal.id);

    if (animal.esIntruso) {
      setPuntaje(puntaje + 10);
      setEsCorrecto(true);
      setMensaje('🎉 ¡Excelente! ¡Sacaste al intruso de la granja!');
    } else {
      setEsCorrecto(false);
      setMensaje('❌ ¡Oh no! Ese animal sí vive en la granja.');
    }
  }

  function handleSiguiente() {
    if (!esUltimaRonda) {
      setRondaActual(rondaActual + 1);
      setRespondido(false);
      setMensaje('');
      setSeleccionadoId(null);
    } else {
      onTerminar(puntaje);
    }
  }

  return (
    <Container className="my-4">
      <div
        className="card border-0 shadow-lg p-4 p-md-5 mx-auto"
        style={{
          borderRadius: '2.5rem',
          backgroundColor: '#fffdf5',
          border: '4px solid #fef08a'
        }}
      >
        <div className="text-center mb-4">
          <h1 className="fw-bold text-success display-6 mb-2">
            🌾 El Intruso de la Granja 🚜
          </h1>
          <p className="text-secondary fs-5 mb-0">
            ¡Hola <span className="text-primary fw-bold">{nombreJugador}</span>! Hay un animal que no pertenece a la granja. ¿Podés encontrarlo?
          </p>
        </div>

        <Marcador 
          rondaActual={rondaActual} 
          totalRondas={totalRondas} 
          puntaje={puntaje} 
        />

        <div className="row justify-content-center align-items-center g-3 my-2">
          {animalesMezclados.map(function(animal) {
            return (
              <TarjetaAnimal
                key={animal.id}
                animal={animal}
                alSeleccionar={handleSeleccion}
                deshabilitado={respondido}
                fueSeleccionado={seleccionadoId === animal.id}
              />
            );
          })}
        </div>

        {!respondido ? (
          <div className="text-center mt-3">
            <p className="text-muted fs-5 fw-semibold mb-0">
              👇 Tocá el animal que <span className="text-danger fw-bold">NO</span> es de la granja
            </p>
          </div>
        ) : (
          <div className="text-center mt-4">
            <div
              className={`alert ${
                esCorrecto ? 'alert-success border-success' : 'alert-danger border-danger'
              } fs-4 fw-bold rounded-4 shadow-sm py-3 px-4 d-inline-block`}
            >
              {mensaje} {esCorrecto ? '(+10 pts)' : '(0 pts)'}
            </div>

            <div className="mt-3">
              <button
                onClick={handleSiguiente}
                className="btn btn-warning btn-lg px-4 py-2 rounded-pill shadow fw-bold fs-5 text-dark"
                style={{ minWidth: '220px' }}
              >
                {esUltimaRonda ? 'Ver Resultados 🏁' : 'Siguiente Ronda ➔'}
              </button>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}

export { JuegoDos };