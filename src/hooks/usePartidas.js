import { useContext } from "react";
import { PartidasContext } from "../contexts/PartidasContext";

// usar
export const usePartidas = () => {
    const contexto = useContext(PartidasContext);
    if (!contexto) {
        throw new Error('usePartidas debe ser usado dentro de ProveedorPartidasContext');
    }

    return contexto;
};