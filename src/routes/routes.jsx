import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Inicio from "../pages/Inicio";
import Error from "../pages/Error";
import Juego1 from "../pages/Juego1";
import Juego2 from "../pages/Juego2";
import Resultados from "../pages/Resultados";
import LoginProfesor from "../pages/LoginProfesor";
import Profesor from "../pages/Profesor";
import ProtectorRuta from "../components/ProtectorRuta";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <Error />,
        children: [
            { index: true, element: <Inicio /> },
            {
                path: "/juego1",
                element: <ProtectorRuta rolRequerido="alumno"> <Juego1 /> </ProtectorRuta>
            },
            {
                path: "/juego2",
                element: <ProtectorRuta rolRequerido="alumno"> <Juego2 /> </ProtectorRuta>
            },
            {
                path: "/resultados",
                element: <ProtectorRuta rolRequerido="alumno"> <Resultados /> </ProtectorRuta>
            },
            { path: "/profesor/login", element: <LoginProfesor /> },
            {
                path: "/profesor",
                element: <ProtectorRuta rolRequerido="profesor"> <Profesor /> </ProtectorRuta>
            },
        ]
    }
]);