import { useState } from 'react';
import './App.css';

// Datos de las 5 rondas
const ROUNDS = [
  { id: 1, animalName: 'Vaca', animalEmoji: '🐄', options: ['Pasto', 'Carne', 'Banana'], answer: 'Pasto' },
  { id: 2, animalName: 'Gallina', animalEmoji: '🐔', options: ['Maíz', 'Pasto', 'Pescado'], answer: 'Maíz' },
  { id: 3, animalName: 'Chancho', animalEmoji: '🐷', options: ['Todo lo que encuentra', 'Solo Pasto', 'Solo Carne'], answer: 'Todo lo que encuentra' },
  { id: 4, animalName: 'Oveja', animalEmoji: '🐑', options: ['Pasto', 'Hamburguesa', 'Pizza'], answer: 'Pasto' },
  { id: 5, animalName: 'Caballo', animalEmoji: '🐴', options: ['Pasto y Zanahoria', 'Pollo', 'Helado'], answer: 'Pasto y Zanahoria' },
];

function App() {
  const [currentRound, setCurrentRound] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [resultMessage, setResultMessage] = useState('');
  const [isGameOver, setIsGameOver] = useState(false);

  const handleOptionClick = (selectedFood) => {
    if (showResult) return; // Evita múltiples clicks mientras se muestra el mensaje

    const currentAnimal = ROUNDS[currentRound];
    const isCorrect = selectedFood === currentAnimal.answer;

    if (isCorrect) {
      setScore(prevScore => prevScore + 10);
      setResultMessage(`¡Correcto! La ${currentAnimal.animalName} comió feliz. 😋`);
    } else {
      setResultMessage(`¡Esa no es su comida! 🤢`);
    }

    setShowResult(true);

    // Esperar 2 segundos para mostrar el mensaje y pasar a la siguiente ronda
    setTimeout(() => {
      setShowResult(false);
      
      if (currentRound < ROUNDS.length - 1) {
        setCurrentRound(prevRound => prevRound + 1);
      } else {
        setIsGameOver(true);
      }
    }, 2000);
  };

  const restartGame = () => {
    setCurrentRound(0);
    setScore(0);
    setIsGameOver(false);
    setResultMessage('');
  };

  return (
    <div className="container game-container text-center">
      <h1 className="text-primary fw-bold mb-4">¡Hora de Comer!</h1>
      
      {isGameOver ? (
        <div className="game-over-screen">
          <h2>¡Juego Terminado!</h2>
          <p className="fs-4">Tu puntaje final es: <strong>{score} / 50</strong></p>
          <button className="btn btn-success btn-lg mt-3" onClick={restartGame}>
            Volver a jugar
          </button>
        </div>
      ) : (
        <div className="play-screen">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="badge bg-info fs-6">Ronda: {currentRound + 1} / 5</span>
            <span className="badge bg-warning text-dark fs-6">Puntaje: {score}</span>
          </div>

          <div className="animal-display">
            {/* Si preferís usar imágenes reales, cambiá el emoji por: <img src="ruta.jpg" alt="..." /> */}
            <span className="animal-image">{ROUNDS[currentRound].animalEmoji}</span>
            <h3 className="text-secondary">{ROUNDS[currentRound].animalName}</h3>
          </div>

          <div className="options-container">
            {ROUNDS[currentRound].options.map((option, index) => (
              <button 
                key={index}
                className="btn btn-outline-primary btn-lg"
                onClick={() => handleOptionClick(option)}
                disabled={showResult}
              >
                {option}
              </button>
            ))}
          </div>

          <div className={`result-message ${showResult ? 'visible' : 'invisible'}`}>
            <span className={resultMessage.includes('Correcto') ? 'text-success' : 'text-danger'}>
              {resultMessage}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;