import { Card, Table, Button } from 'react-bootstrap';
import { usePartidas } from '../hooks/usePartidas';

const Profesor = () => {
  const { partidas, borrarPartidas } = usePartidas();

  return (
    <Card className="p-4 shadow border-0 mx-auto" style={{ maxWidth: '900px', borderRadius: '20px' }}>
      <h2 className="text-primary fw-bold text-center mb-2">👩‍🏫 Espacio del Profesor</h2>
      <p className="text-muted text-center mb-4">Puntajes de los alumnos que jugaron</p>

      {partidas.length === 0 ? (
        <p className="text-center text-secondary fs-5">Todavía no hay partidas registradas.</p>
      ) : (
        <>
          <Table striped bordered hover responsive className="text-center align-middle">
            <thead className="table-success">
              <tr>
                <th>#</th>
                <th>Alumno</th>
                <th>Hora de Comer</th>
                <th>El Intruso</th>
                <th>Total</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {partidas.map((partida, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td className="fw-bold">{partida.nombre}</td>
                  <td>{partida.juego1}</td>
                  <td>{partida.juego2}</td>
                  <td className="fw-bold text-success">{partida.total}</td>
                  <td>{partida.fecha}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Button variant="outline-danger" onClick={borrarPartidas}>
            Borrar resultados 🗑️
          </Button>
        </>
      )}
    </Card>
  );
};

export default Profesor;