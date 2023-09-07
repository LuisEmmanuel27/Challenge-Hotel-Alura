import React, { createContext, useContext, useState } from 'react';

// Crea un contexto para los datos de la reserva y el huésped
const ReservaContext = createContext();

// Proveedor del contexto que contendrá los datos
export function ReservaProvider({ children }) {
  const [datosReserva, setDatosReserva] = useState({
    fechaEntrada: null,
    fechaSalida: null,
    valor: null,
    formaDePago: null,
  });

  const [datosHuesped, setDatosHuesped] = useState({
    nombre: null,
    apellido: null,
    fechaNacimiento: null,
    nacionalidad: null,
    telefono: null,
    idReserva: null,
  });

  return (
    <ReservaContext.Provider value={{ datosReserva, setDatosReserva, datosHuesped, setDatosHuesped }}>
      {children}
    </ReservaContext.Provider>
  );
}

// Función personalizada para acceder al contexto
export function useReserva() {
  const context = useContext(ReservaContext);
  if (!context) {
    throw new Error('useReserva debe usarse dentro de un ReservaProvider');
  }
  return context;
}
