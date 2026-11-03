import { useState, useEffect } from 'react';
import { rondasJuego2 } from '../data/rondasJuego2';
import Marcador from './Marcador';
import TarjetaAnimal from './TarjetaAnimal';

export default function Juego2({ onJuegoTerminado, nombreJugador = "Mateo" }) {
  const [rondaActual, setRondaActual] = useState(0);
  const [puntaje, setPuntaje] = useState(0);
  const [respondido, setRespondido] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [esCorrecto, setEsCorrecto] = useState(false);
  const [seleccionadoId, setSeleccionadoId] = useState(null);

  // Estado para guardar los animales de la ronda actual ya mezclados
  const [animalesMezclados, setAnimalesMezclados] = useState([]);

  const totalRondas = rondasJuego2.length;
  const esUltimaRonda = rondaActual === totalRondas - 1;

  // Cada vez que cambia la ronda, mezcla el orden de los animales
  useEffect(() => {
    const animalesOriginales = rondasJuego2[rondaActual].animales;
    // Crea una copia y desordena las posiciones aleatoriamente
    const mezclados = [...animalesOriginales].sort(() => Math.random() - 0.5);
    setAnimalesMezclados(mezclados);
  }, [rondaActual]);

  const handleSeleccion = (animal) => {
    setRespondido(true);
    setSeleccionadoId(animal.id);

    if (animal.esIntruso) {
      setPuntaje((prev) => prev + 10);
      setEsCorrecto(true);
      setMensaje('🎉 ¡Excelente! ¡Sacaste al intruso de la granja!');
    } else {
      setEsCorrecto(false);
      setMensaje('❌ ¡Oh no! Ese animal sí vive en la granja.');
    }
  };

  const handleSiguiente = () => {
    if (!esUltimaRonda) {
      setRondaActual((prev) => prev + 1);
      setRespondido(false);
      setMensaje('');
      setSeleccionadoId(null);
    } else {
      if (onJuegoTerminado) onJuegoTerminado(puntaje);
    }
  };

  return (
    <div
      className="card border-0 shadow-lg p-4 p-md-5 mx-auto"
      style={{
        borderRadius: '2.5rem',
        backgroundColor: '#fffdf5',
        border: '4px solid #fef08a'
      }}
    >
      {/* Encabezado */}
      <div className="text-center mb-4">
        <h1 className="fw-bold text-success display-6 mb-2">
          🌾 El Intruso de la Granja 🚜
        </h1>
        <p className="text-secondary fs-5 mb-0">
          ¡Hola <span className="text-primary fw-bold">{nombreJugador}</span>! Hay un animal que no pertenece a la granja. ¿Podés encontrarlo?
        </p>
      </div>

      {/* Marcador superior */}
      <Marcador 
        rondaActual={rondaActual} 
        totalRondas={totalRondas} 
        puntaje={puntaje} 
      />

      {/* Fila de animales en orden aleatorio */}
      <div className="row justify-content-center align-items-center g-3 my-2">
        {animalesMezclados.map((animal) => (
          <TarjetaAnimal
            key={animal.id}
            animal={animal}
            alSeleccionar={handleSeleccion}
            deshabilitado={respondido}
            fueSeleccionado={seleccionadoId === animal.id}
          />
        ))}
      </div>

      {/* Instrucción */}
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
  );
}