import { useState } from 'react';
import { Container, Card, Button, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import servicesAutorizaciones from '../services/servicesAutorizaciones';
import { useAutorizaciones } from '../hooks/useAutorizaciones';

const LoginProfesor = () => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { guardarSesion } = useAutorizaciones();
  const navegar = useNavigate();

  const gestionarLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const usuarioEnSesion = await servicesAutorizaciones.login(user, password);

      if (!usuarioEnSesion) {
        setError('Credenciales inválidas');
        return;
      }

      guardarSesion(usuarioEnSesion);
      navegar('/profesor');
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
      <Card className="p-4 shadow" style={{ width: '100%', maxWidth: '400px', borderRadius: '15px' }}>
        <Card.Body>
          <h2 className="text-center mb-4 text-primary">👩‍🏫 Ingreso Profesor</h2>

          {error && (
            <Alert variant="danger" onClose={() => setError('')} dismissible>
              {error}
            </Alert>
          )}

          <Form onSubmit={gestionarLogin}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Usuario"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                required
                size="lg"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                size="lg"
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 py-2" size="lg">
              Ingresar
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LoginProfesor;