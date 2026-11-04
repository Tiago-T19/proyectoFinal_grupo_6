

import React, { useState } from 'react';
import { Container, Card, Button, ListGroup, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { JuegoDos } from './components/Juego2'; 

function LoginScreen({ onComenzar }) {
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
}

const ROUNDS = [
  { id: 1, animalName: 'Vaca', animalEmoji: '🐄', options: ['Pasto', 'Carne', 'Banana'], answer: 'Pasto' },
  { id: 2, animalName: 'Gallina', animalEmoji: '🐔', options: ['Maíz', 'Pasto', 'Pescado'], answer: 'Maíz' },
  { id: 3, animalName: 'Chancho', animalEmoji: '🐷', options: ['Todo lo que encuentra', 'Solo Pasto', 'Solo Carne'], answer: 'Todo lo que encuentra' },
  { id: 4, animalName: 'Oveja', animalEmoji: '🐑', options: ['Pasto', 'Hamburguesa', 'Pizza'], answer: 'Pasto' },
  { id: 5, animalName: 'Caballo', animalEmoji: '🐴', options: ['Pasto y Zanahoria', 'Pollo', 'Helado'], answer: 'Pasto y Zanahoria' },
];

function JuegoUno({ nombre, onTerminar }) {
  const [currentRound, setCurrentRound] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [resultMessage, setResultMessage] = useState('');

  const handleOptionClick = (selectedFood) => {
    if (showResult) return;

    const currentAnimal = ROUNDS[currentRound];
    const isCorrect = selectedFood === currentAnimal.answer;
    let nuevoPuntaje = score;

    if (isCorrect) {
      nuevoPuntaje = score + 10;
      setScore(nuevoPuntaje);
      setResultMessage(`¡Correcto! La ${currentAnimal.animalName} comió feliz. 😋`);
    } else {
      setResultMessage(`¡Esa no es su comida! 🤢`);
    }

    setShowResult(true);

    setTimeout(() => {
      setShowResult(false);
      if (currentRound < ROUNDS.length - 1) {
        setCurrentRound(prevRound => prevRound + 1);
      } else {
        onTerminar(nuevoPuntaje);
      }
    }, 2000);
  };

  return (
    <Container className="text-center my-4" style={{ maxWidth: '600px' }}>
      <h1 className="text-primary fw-bold mb-2">¡Hora de Comer!</h1>
      <p className="text-muted mb-4">Granjero/a: <strong>{nombre}</strong></p>
      
      <Card className="p-4 shadow">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <span className="badge bg-info fs-6">Ronda: {currentRound + 1} / 5</span>
          <span className="badge bg-warning text-dark fs-6">Puntaje: {score}</span>
        </div>

        <div className="animal-display my-4">
          <span style={{ fontSize: '80px' }}>{ROUNDS[currentRound].animalEmoji}</span>
          <h3 className="text-secondary mt-2">{ROUNDS[currentRound].animalName}</h3>
        </div>

        <div className="options-container d-grid gap-2 my-3">
          {ROUNDS[currentRound].options.map((option, index) => (
            <Button 
              key={index}
              variant="outline-primary"
              size="lg"
              onClick={() => handleOptionClick(option)}
              disabled={showResult}
            >
              {option}
            </Button>
          ))}
        </div>

        <div style={{ minHeight: '30px' }} className="mt-2">
          <span className={resultMessage.includes('Correcto') ? 'text-success fw-bold' : 'text-danger fw-bold'}>
            {resultMessage}
          </span>
        </div>
      </Card>
    </Container>
  );
}

function ResumenScreen({ nombre, puntaje1, puntaje2, onReiniciar }) {
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
}

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
}

export default App;