import { Link } from "react-router-dom";

const Error = () => {

    return (
        <div className="text-center mt-5">
            <h1>Página de Error 🐮</h1>
            <p className="text-muted fs-5">Esta página no existe.</p>
            <Link to="/" className="btn btn-success">Volver al inicio</Link>
        </div>
    );
};

export default Error;