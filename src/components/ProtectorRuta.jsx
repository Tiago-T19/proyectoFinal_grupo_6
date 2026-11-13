import { Navigate } from "react-router-dom";
import { useAutorizaciones } from "../hooks/useAutorizaciones";

const ProtectorRuta = ({ children, rolRequerido }) => {
    const { usuarioActivo } = useAutorizaciones();

    if (!usuarioActivo) return <Navigate to="/" replace />;

    if (rolRequerido && usuarioActivo.rol !== rolRequerido) return <Navigate to="/" replace />;

    return children;
};

export default ProtectorRuta;