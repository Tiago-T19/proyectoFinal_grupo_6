import { useContext } from "react";
import { AutorizacionesContext } from "../contexts/AutorizacionesContext";

// usar
export const useAutorizaciones = () => {
    const contexto = useContext(AutorizacionesContext);
    if (!contexto) {
        throw new Error('useAutorizaciones debe ser usado dentro de ProveedorContext');
    }

    return contexto;
};