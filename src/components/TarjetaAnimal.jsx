import React from 'react';

const TarjetaAnimal = ({ animal, alSeleccionar, deshabilitado, fueSeleccionado }) => {
  let claseCirculo = 'bg-success-subtle text-dark';
  let badgeIntruso = null;

  if (deshabilitado) {
    if (animal.esIntruso) {
      claseCirculo = 'bg-danger text-white';
      badgeIntruso = <span className="text-danger fw-bold mt-2 fs-5">¡INTRUSO!</span>;
    } else {
      claseCirculo = 'bg-success text-white';
    }
  }

  const manejarClick = () => {
    if (!deshabilitado) {
      alSeleccionar(animal);
    }
  };

  const manejarKeyDown = (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && !deshabilitado) {
      alSeleccionar(animal);
    }
  };

  return (
    <div className="col-12 col-md-4 text-center mb-3">
      <div
        role="button"
        tabIndex="0"
        onClick={manejarClick}
        onKeyDown={manejarKeyDown}
        className={`card h-100 p-4 border-0 shadow-sm align-items-center ${
          fueSeleccionado ? 'border border-3 border-warning' : ''
        }`}
        style={{
          cursor: deshabilitado ? 'default' : 'pointer',
          borderRadius: '1.5rem',
          transition: 'transform 0.2s',
          backgroundColor: '#fff'
        }}
      >
        <div
          className={`rounded-circle d-flex align-items-center justify-content-center shadow-sm ${claseCirculo}`}
          style={{ width: '135px', height: '135px', fontSize: '5rem' }}
        >
          {animal.emoji}
        </div>
        <h3 className="mt-3 mb-0 fw-bold">{animal.nombre}</h3>
        {badgeIntruso}
      </div>
    </div>
  );
};

export { TarjetaAnimal };