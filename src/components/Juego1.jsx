import React, { useState } from 'react';
import { Container, Card, Button } from 'react-bootstrap';

// 1. Constantes globales
const ROUNDS = [
  { id: 1, animalName: 'Vaca', animalEmoji: '🐄', options: ['Pasto', 'Carne', 'Banana'], answer: 'Pasto' },
  { id: 2, animalName: 'Gallina', animalEmoji: '🐔', options: ['Maíz', 'Pasto', 'Pescado'], answer: 'Maíz' },
  { id: 3, animalName: 'Chancho', animalEmoji: '🐷', options: ['Todo lo que encuentra', 'Solo Pasto', 'Solo Carne'], answer: 'Todo lo que encuentra' },
  { id: 4, animalName: 'Oveja', animalEmoji: '🐑', options: ['Pasto', 'Hamburguesa', 'Pizza'], answer: 'Pasto' },
  { id: 5, animalName: 'Caballo', animalEmoji: '🐴', options: ['Pasto y Zanahoria', 'Pollo', 'Helado'], answer: 'Pasto y Zanahoria' },
];

// 2. Componente principal
const JuegoUno = ({ nombre, onTerminar }) => {
  // 3. Estados
  const [currentRound, setCurrentRound] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [resultMessage, setResultMessage] = useState('');

  const esUltimaRonda = currentRound === ROUNDS.length - 1;

  // 4. Función para verificar la respuesta
  const handleOptionClick = (selectedFood) => {
    if (showResult) return;

    const currentAnimal = ROUNDS[currentRound];
    const isCorrect = selectedFood === currentAnimal.answer;

    if (isCorrect) {
      setScore(score + 10);
      setResultMessage(`¡Correcto! La ${currentAnimal.animalName} comió feliz. 🥰`);
    } else {
      setResultMessage(`¡Esa no es su comida! 🤢`);
    }

    setShowResult(true);
  };

  // 5. Función para avanzar controlada por el botón
  const handleSiguiente = () => {
    if (!esUltimaRonda) {
      setCurrentRound(currentRound + 1);
      setShowResult(false);
      setResultMessage('');
    } else {
      onTerminar(score);
    }
  };

  // 6. Renderizado
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

        {/* Zona inferior dinámica: Solo se muestra el mensaje y el botón si ya respondió */}
        <div style={{ minHeight: '120px' }} className="mt-3">
          {showResult && (
            <div className="text-center">
              <div
                className={`alert ${
                  resultMessage.includes('Correcto') ? 'alert-success border-success' : 'alert-danger border-danger'
                } fs-5 fw-bold rounded-4 shadow-sm py-2 px-4 d-inline-block mb-3`}
              >
                {resultMessage}
              </div>
              
              <div>
                <button
                  onClick={handleSiguiente}
                  className="btn btn-warning btn-lg px-4 py-2 rounded-pill shadow fw-bold fs-5 text-dark"
                  style={{ minWidth: '220px' }}
                >
                  {esUltimaRonda ? 'Ver Resultados 🏁' : 'Siguiente Animal ➔'}
                </button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </Container>
  );
};

export default JuegoUno;