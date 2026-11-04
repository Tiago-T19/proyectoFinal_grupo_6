import React from 'react';

function Marcador({ rondaActual, totalRondas, puntaje }) {
  return (
    <div className="d-flex justify-content-between align-items-center mb-4 p-3 bg-white rounded-3 shadow-sm border">
      <span className="fs-5 fw-bold text-secondary">
        Ronda: {rondaActual + 1} / {totalRondas}
      </span>
      <span className="fs-4 fw-bold text-success">
        Puntos: {puntaje}
      </span>
    </div>
  );
}

export { Marcador };