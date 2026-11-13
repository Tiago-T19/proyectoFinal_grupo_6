import { useState } from 'react';
import { Container, Card, Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import servicesAutorizaciones from '../services/servicesAutorizaciones';
import { useAutorizaciones } from '../hooks/useAutorizaciones';
import { usePartidas } from '../hooks/usePartidas';

const Inicio = () => {
  const [nombreInput, setNombreInput] = useState('');
  const { guardarSesion } = useAutorizaciones();
  const { reiniciarPuntajes } = usePartidas();
  const navegar = useNavigate();

  const gestionarComenzar = (e) => {
    e.preventDefault();
    if (nombreInput.trim() === '') return;

    const alumno = servicesAutorizaciones.loginAlumno(nombreInput.trim());
    guardarSesion(alumno);
    reiniciarPuntajes();
    navegar('/juego1');
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
      <Card className="p-4 shadow" style={{ width: '100%', maxWidth: '400px', borderRadius: '15px' }}>
        <Card.Body>
          <h2 className="text-center mb-4 text-primary">Aventura en la Granja 🚜</h2>
          <p className="text-center text-muted mb-4">¡Ingresá tu nombre para comenzar a jugar!</p>

          <Form onSubmit={gestionarComenzar}>
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

          <p className="text-center mt-4 mb-0">
            <Link to="/profesor/login">¿Sos profesor? Ingresá acá</Link>
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Inicio;