import axios from "axios";

export const listarRondasJuego2 = async () => {
    try {
        const respuesta = await axios.get('/data/RondaJuego2.json');
        if (!respuesta.data || typeof respuesta.data === 'string') {
            throw new Error("Hay un error en el archivo de rondas");
        }
        return respuesta.data;
    } catch (e) {
        throw new Error("Hay un error en la carga de las rondas");
    }
};