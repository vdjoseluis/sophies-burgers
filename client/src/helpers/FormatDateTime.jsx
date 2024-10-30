// Función para formatear la fecha
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

// Función para formatear la hora
const formatTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Función combinada que usa ambas
const formatDateTime = (dateString) => {
  return `${formatDate(dateString)} - ${formatTime(dateString)}`;
};

export { formatDate, formatTime, formatDateTime };
