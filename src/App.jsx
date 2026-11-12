import React, { useState } from 'react';
import { Container, Card, Button, ListGroup, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import JuegoUno from './components/Juego1'; 
import { JuegoDos } from './components/Juego2'; 

const LoginScreen = ({ onComenzar }) => {
  const [nombreInput, setNombreInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nombreInput.trim() !== '') {
      onComenzar(nombreInput);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <Card className="p-4 shadow" style={{ width: '100%', maxWidth: '400px', borderRadius: '15px' }}>
        <Card.Body>
          <h2 className="text-center mb-4 text-primary">Aventura en la Granja 🚜</h2>
          <p className="text-center text-muted mb-4">¡Ingresá tu nombre para comenzar a jugar!</p>
          
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Nombre del niño/a"
                value={nombreInput}
                onChange={(e) => setNombreInput(e.target.value)}
                required
                size="lg"
              />
            </Form.Group>

            <Button variant="success" type="submit" className="w-100 py-2" size="lg">
              Comenzar 🚀
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

const ResumenScreen = ({ nombre, puntaje1, puntaje2, onReiniciar }) => {
  const puntajeTotal = puntaje1 + puntaje2;

  const obtenerMensajePersonalizado = (total) => {
    if (total >= 40) {
      return `¡Increíble trabajo, ${nombre}! Sos el mejor granjero de todos. ¡Puntaje brillante! 🌟`;
    } else if (total >= 20) {
      return `¡Muy bien hecho, ${nombre}! Demostraste conocer muy bien la granja. ¡Felicitaciones! 🎉`;
    } else {
      return `¡Buen esfuerzo, ${nombre}! Con un poco más de práctica serás un experto de la granja. 👍`;
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <Card className="p-4 shadow text-center" style={{ width: '100%', maxWidth: '500px', borderRadius: '15px' }}>
        <Card.Body>
          <h2 className="text-success mb-3">¡Aventura Finalizada! 🌾</h2>
          <h4 className="mb-4 text-dark">¡Granjero/a: <strong>{nombre}</strong>!</h4>

          <ListGroup variant="flush" className="mb-4 text-start">
            <ListGroup.Item className="d-flex justify-content-between align-items-center">
              Puntaje Juego 1 (Hora de Comer):
              <span className="badge bg-primary rounded-pill fs-6">{puntaje1} pts</span>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between align-items-center">
              Puntaje Juego 2:
              <span className="badge bg-primary rounded-pill fs-6">{puntaje2} pts</span>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between align-items-center fw-bold bg-light">
              Puntaje Total:
              <span className="badge bg-success rounded-pill fs-5">{puntajeTotal} pts</span>
            </ListGroup.Item>
          </ListGroup>

          <div className="alert alert-info py-3 mb-4" role="alert">
            {obtenerMensajePersonalizado(puntajeTotal)}
          </div>

          <Button variant="primary" onClick={onReiniciar} size="lg" className="w-100">
            Jugar de nuevo 🔄
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

const App = () => {
  const [pantallaActual, setPantallaActual] = useState(1);
  const [nombreJugador, setNombreJugador] = useState('');
  const [puntajeJuego1, setPuntajeJuego1] = useState(0);
  const [puntajeJuego2, setPuntajeJuego2] = useState(0);

  const iniciarJuego = (nombre) => {
    setNombreJugador(nombre);
    setPantallaActual(2);
  };

  const terminarJuego1 = (puntaje) => {
    setPuntajeJuego1(puntaje);
    setPantallaActual(3);
  };

  const terminarJuego2 = (puntaje) => {
    setPuntajeJuego2(puntaje);
    setPantallaActual(4);
  };

  const reiniciarJuego = () => {
    setNombreJugador('');
    setPuntajeJuego1(0);
    setPuntajeJuego2(0);
    setPantallaActual(1);
  };

  return (
    <div className="container my-4">
      {pantallaActual === 1 && <LoginScreen onComenzar={iniciarJuego} />}
      
      {pantallaActual === 2 && (
        <JuegoUno nombre={nombreJugador} onTerminar={terminarJuego1} />
      )}
      
      {pantallaActual === 3 && (
        <JuegoDos nombreJugador={nombreJugador} onTerminar={terminarJuego2} />
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
};

export default App;