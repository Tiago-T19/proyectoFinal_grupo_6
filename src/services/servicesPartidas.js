const ALMACEN_LOCAL = "partidasGuardadas";

export const listarPartidas = () => {
    const guardadas = localStorage.getItem(ALMACEN_LOCAL);
    if (guardadas && guardadas !== "undefined") {
        try {
            return JSON.parse(guardadas);
        } catch (e) {
            console.log("error al parsear el Local Storage", e);
            return [];
        }
    }
    return [];
};

export const guardarPartidas = (partidas) => {
    try {
        localStorage.setItem(ALMACEN_LOCAL, JSON.stringify(partidas));
    } catch (e) {
        throw new Error("error al guardar en el Local Storage", e);
    }
};