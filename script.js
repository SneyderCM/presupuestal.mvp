// script.js

// Obtener transacciones (solo gastos e ingresos)
function getTransacciones() {
  return JSON.parse(localStorage.getItem('transacciones') || '[]');
}

// Obtener presupuesto asignado
function getPresupuesto() {
  return parseInt(localStorage.getItem('presupuesto') || '0');
}

// Calcular gastos totales (solo tipo "gasto")
function getGastosTotales() {
  const transacciones = getTransacciones();
  return transacciones
    .filter(t => t.tipo === 'gasto')
    .reduce((sum, t) => sum + t.monto, 0);
}

// Calcular ingresos totales (solo para el resumen informativo)
function getIngresosTotales() {
  const transacciones = getTransacciones();
  return transacciones
    .filter(t => t.tipo === 'ingreso')
    .reduce((sum, t) => sum + t.monto, 0);
}

// ✅ ¡CORRECCIÓN CLAVE! El "saldo actual" es: presupuesto - gastos (NO incluye ingresos)
function getSaldoActual() {
  const presupuesto = getPresupuesto();
  const gastos = getGastosTotales();
  return presupuesto - gastos;
}

// Guardar nueva transacción
function agregarTransaccion(trans) {
  const transacciones = getTransacciones();
  transacciones.push(trans);
  localStorage.setItem('transacciones', JSON.stringify(transacciones));
}

// Porcentaje de gastos respecto al presupuesto (para alerta)
function calcularPorcentajeGastos() {
  const gastos = getGastosTotales();
  const presupuesto = getPresupuesto();
  return presupuesto > 0 ? (gastos / presupuesto) * 100 : 0;
}

// ¿Estamos en alerta (≥80%)?
function estaEnAlerta() {
  return calcularPorcentajeGastos() >= 80;
}
function reiniciarDatos() {
  if (confirm("¿Seguro que quieres reiniciar todo? Se borrarán presupuesto y transacciones.")) {
    localStorage.removeItem('presupuesto');
    localStorage.removeItem('transacciones');
    alert("✅ Datos reiniciados. Recarga la página para ver el estado inicial.");
    location.reload();
  }
}