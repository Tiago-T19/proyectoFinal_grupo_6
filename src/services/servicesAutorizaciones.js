import { listarUsuarios } from "./servicesUsuarios";

const servicesAutorizaciones = (() => {

    const login = async (user, password) => {
        const usuarios = await listarUsuarios();

        const encontrado = usuarios.find(
            u => u.user === user && u.password === password
        );

        if (!encontrado) return null;

        return { id: encontrado.id, nombre: encontrado.nombre, rol: encontrado.rol };
    };

    const loginAlumno = (nombre) => {
        return { id: Date.now(), nombre: nombre, rol: "alumno" };
    };

    return {
        login,
        loginAlumno
    };
})();

export default servicesAutorizaciones;