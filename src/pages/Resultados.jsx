import { Container, Card, Button, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAutorizaciones } from '../hooks/useAutorizaciones';
import { usePartidas } from '../hooks/usePartidas';

const Resultados = () => {
  const { usuarioActivo, cerrarSesion } = useAutorizaciones();
  const { puntajeJuego1, puntajeJuego2, reiniciarPuntajes } = usePartidas();
  const navegar = useNavigate();

  const nombre = usuarioActivo.nombre;
  const puntajeTotal = puntajeJuego1 + puntajeJuego2;

  const obtenerMensajePersonalizado = (total) => {
    if (total >= 80) {
      return `¡Increíble trabajo, ${nombre}! Sos el mejor granjero de todos. ¡Puntaje brillante! 🌟`;
    } else if (total >= 50) {
      return `¡Muy bien hecho, ${nombre}! Demostraste conocer muy bien la granja. ¡Felicitaciones! 🎉`;
    } else {
      return `¡Buen esfuerzo, ${nombre}! Con un poco más de práctica serás un experto de la granja. 👍`;
    }
  };

  const jugarDeNuevo = () => {
    reiniciarPuntajes();
    cerrarSesion();
    navegar('/');
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
      <Card className="p-4 shadow text-center" style={{ width: '100%', maxWidth: '500px', borderRadius: '15px' }}>
        <Card.Body>
          <h2 className="text-success mb-3">¡Aventura Finalizada! 🌾</h2>
          <h4 className="mb-4 text-dark">Granjero/a: <strong>{nombre}</strong></h4>

          <ListGroup variant="flush" className="mb-4 text-start">
            <ListGroup.Item className="d-flex justify-content-between align-items-center">
              Juego 1 (Hora de Comer):
              <span className="badge bg-primary rounded-pill fs-6">{puntajeJuego1} pts</span>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between align-items-center">
              Juego 2 (El Intruso):
              <span className="badge bg-primary rounded-pill fs-6">{puntajeJuego2} pts</span>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between align-items-center fw-bold bg-light">
              Puntaje Total:
              <span className="badge bg-success rounded-pill fs-5">{puntajeTotal} pts</span>
            </ListGroup.Item>
          </ListGroup>

          <div className="alert alert-info py-3 mb-4" role="alert">
            {obtenerMensajePersonalizado(puntajeTotal)}
          </div>

          <Button variant="primary" onClick={jugarDeNuevo} size="lg" className="w-100">
            Jugar de nuevo 🔄
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Resultados;