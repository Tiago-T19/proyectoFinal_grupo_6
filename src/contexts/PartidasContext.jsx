import { createContext, useEffect, useState } from "react";
import { listarPartidas, guardarPartidas } from "../services/servicesPartidas";

// definir
export const PartidasContext = createContext(null);

// proveer
export const ProveedorPartidasContext = ({ children }) => {
    const [partidas, setPartidas] = useState(listarPartidas);
    const [puntajeJuego1, setPuntajeJuego1] = useState(0);
    const [puntajeJuego2, setPuntajeJuego2] = useState(0);

    useEffect(() => {
        guardarPartidas(partidas);
    }, [partidas]);

    const agregarNuevaPartida = (nuevaPartida) => {
        setPartidas((prevPartidas) => [...prevPartidas, nuevaPartida]);
    };

    const borrarPartidas = () => setPartidas([]);

    const reiniciarPuntajes = () => {
        setPuntajeJuego1(0);
        setPuntajeJuego2(0);
    };

    return (
        <PartidasContext.Provider value={{
            partidas, agregarNuevaPartida, borrarPartidas,
            puntajeJuego1, setPuntajeJuego1,
            puntajeJuego2, setPuntajeJuego2,
            reiniciarPuntajes
        }}>
            {children}
        </PartidasContext.Provider>
    );
};