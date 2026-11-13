import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAutorizaciones } from "../hooks/useAutorizaciones";

const Menu = () => {

    const { usuarioActivo, cerrarSesion } = useAutorizaciones();
    const navegar = useNavigate();

    const gestionarCerrarSesion = () => {
        cerrarSesion();
        navegar("/");
    };

    return (
        <Navbar bg="success" data-bs-theme="dark" expand="md" className="shadow-sm">
            <Container>
                <Navbar.Brand as={Link} to="/">🚜 Aventura en la Granja</Navbar.Brand>
                <Navbar.Toggle aria-controls="menu-principal" />
                <Navbar.Collapse id="menu-principal">
                    <Nav className="ms-auto align-items-md-center gap-2">
                        <Nav.Link as={NavLink} to="/" end>Inicio</Nav.Link>
                        {usuarioActivo?.rol === "alumno" && (
                            <Nav.Link as={NavLink} to="/juego1">Juegos</Nav.Link>
                        )}
                        {usuarioActivo?.rol === "profesor" && (
                            <Nav.Link as={NavLink} to="/profesor" end>Puntajes</Nav.Link>
                        )}
                        {!usuarioActivo && (
                            <Nav.Link as={NavLink} to="/profesor/login">Profesor</Nav.Link>
                        )}
                        {usuarioActivo && (
                            <Button variant="outline-light" onClick={gestionarCerrarSesion}>
                                {usuarioActivo.nombre} - Cerrar sesión
                            </Button>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Menu;