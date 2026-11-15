
import { useEffect, useState } from "react";
import { listarRondasJuego2 } from "../services/servicesRondas";

export const useRondasJuego2 = () => {
    const [rondas, setRondas] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const cargarRondas = async () => {
            try {
                setError(null);
                const data = await listarRondasJuego2();
                setRondas(Array.isArray(data) ? data : []);
            } catch (e) {
                setRondas([]);
                setError(e.message);
            }
        };

        cargarRondas();
    }, []);

    return { rondas, error };
};