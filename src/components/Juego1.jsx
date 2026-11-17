import { useState } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAutorizaciones } from '../hooks/useAutorizaciones';
import { usePartidas } from '../hooks/usePartidas';

const ROUNDS = [
  { id: 1, animalName: 'Vaca', animalEmoji: '🐄', options: ['Pasto', 'Carne', 'Banana'], answer: 'Pasto' },
  { id: 2, animalName: 'Gallina', animalEmoji: '🐔', options: ['Maíz', 'Pasto', 'Pescado'], answer: 'Maíz' },
  { id: 3, animalName: 'Chancho', animalEmoji: '🐷', options: ['Todo lo que encuentra', 'Solo Pasto', 'Solo Carne'], answer: 'Todo lo que encuentra' },
  { id: 4, animalName: 'Oveja', animalEmoji: '🐑', options: ['Pasto', 'Hamburguesa', 'Pizza'], answer: 'Pasto' },
  { id: 5, animalName: 'Caballo', animalEmoji: '🐴', options: ['Pasto y Zanahoria', 'Pollo', 'Helado'], answer: 'Pasto y Zanahoria' },
];

const Juego1 = () => {
  const [currentRound, setCurrentRound] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [resultMessage, setResultMessage] = useState('');

  const { usuarioActivo } = useAutorizaciones();
  const { setPuntajeJuego1 } = usePartidas();
  const navegar = useNavigate();

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
      setResultMessage('¡Esa no es su comida! 🤢');
    }

    setShowResult(true);

    setTimeout(() => {
      setShowResult(false);
      setResultMessage('');
      if (currentRound < ROUNDS.length - 1) {
        setCurrentRound((prevRound) => prevRound + 1);
      } else {
        setPuntajeJuego1(nuevoPuntaje);
        navegar('/juego2');
      }
    }, 2000);
  };

  return (
    <Container className="text-center my-4" style={{ maxWidth: '600px' }}>
      <h1 className="text-primary fw-bold mb-2">¡Hora de Comer!</h1>
      <p className="text-muted mb-4">Granjero/a: <strong>{usuarioActivo.nombre}</strong></p>

      <Card className="p-4 shadow">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <span className="badge bg-info fs-6">Ronda: {currentRound + 1} / {ROUNDS.length}</span>
          <span className="badge bg-warning text-dark fs-6">Puntaje: {score}</span>
        </div>

        <div className="my-4">
          <span style={{ fontSize: '80px' }}>{ROUNDS[currentRound].animalEmoji}</span>
          <h3 className="text-secondary mt-2">{ROUNDS[currentRound].animalName}</h3>
        </div>

        <div className="d-grid gap-2 my-3">
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
};

export default Juego1;