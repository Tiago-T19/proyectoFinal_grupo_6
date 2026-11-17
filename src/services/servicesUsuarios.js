import axios from "axios";

// CRUD Usuarios
export const listarUsuarios = async () => {
    try {
        const respuesta = await axios.get('/data/usuarios.json');
        return respuesta.data;
    } catch (e) {
        throw new Error("Hay un error en la carga de usuarios");
    }
};

// sesion
export const guardarUsuarioEnSesion = (usuario) => {
    sessionStorage.setItem("usuarioEnSesion", JSON.stringify(usuario));
};

export const obtenerUsuarioEnSesion = () => {
    try {
        const u = sessionStorage.getItem("usuarioEnSesion");
        return u ? JSON.parse(u) : null;
    } catch {
        return null;
    }
};

export const limpiarSesion = () => {
    sessionStorage.removeItem("usuarioEnSesion");
};