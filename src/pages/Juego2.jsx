import { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Marcador from '../components/Marcador';
import TarjetaAnimal from '../components/TarjetaAnimal';
import { useRondasJuego2 } from '../hooks/useRondasJuego2';
import { useAutorizaciones } from '../hooks/useAutorizaciones';
import { usePartidas } from '../hooks/usePartidas';

const Juego2 = () => {
  const [rondaActual, setRondaActual] = useState(0);
  const [puntaje, setPuntaje] = useState(0);
  const [respondido, setRespondido] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [esCorrecto, setEsCorrecto] = useState(false);
  const [seleccionadoId, setSeleccionadoId] = useState(null);
  const [animalesMezclados, setAnimalesMezclados] = useState([]);

  const { rondas, error } = useRondasJuego2();
  const { usuarioActivo } = useAutorizaciones();
  const { puntajeJuego1, setPuntajeJuego2, agregarNuevaPartida } = usePartidas();
  const navegar = useNavigate();

  useEffect(() => {
    if (rondas.length === 0) return;
    const mezclados = [...rondas[rondaActual].animales].sort(() => Math.random() - 0.5);
    setAnimalesMezclados(mezclados);
  }, [rondas, rondaActual]);

  const totalRondas = rondas.length;
  const esUltimaRonda = rondaActual === totalRondas - 1;

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

  const terminarJuego = () => {
    setPuntajeJuego2(puntaje);
    agregarNuevaPartida({
      nombre: usuarioActivo.nombre,
      juego1: puntajeJuego1,
      juego2: puntaje,
      total: puntajeJuego1 + puntaje,
      fecha: new Date().toLocaleString(),
    });
    navegar('/resultados');
  };

  const handleSiguiente = () => {
    if (!esUltimaRonda) {
      setRondaActual((prev) => prev + 1);
      setRespondido(false);
      setMensaje('');
      setSeleccionadoId(null);
    } else {
      terminarJuego();
    }
  };

  if (error) return <Alert variant="danger">{error}</Alert>;

  if (rondas.length === 0) {
    return <p className="text-center fs-4 mt-5">Cargando juego... 🐮</p>;
  }

  return (
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
          ¡Hola <span className="text-primary fw-bold">{usuarioActivo.nombre}</span>! Hay un animal que no pertenece a la granja. ¿Podés encontrarlo?
        </p>
      </div>

      <Marcador rondaActual={rondaActual} totalRondas={totalRondas} puntaje={puntaje} />

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
};

export default Juego2;
