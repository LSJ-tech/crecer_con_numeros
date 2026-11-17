/**
 * @file contracts.js — Contratos compartidos de "Crecer con números".
 *
 * ⚠️ ARCHIVO CONGELADO (propiedad compartida).
 * Define los tipos de datos y las constantes que conectan los módulos de los
 * cuatro integrantes. Un cambio aquí rompe el trabajo de los demás, por lo que
 * SOLO se modifica mediante un Pull Request a `dev` (rama `chore/contracts-*`)
 * aprobado por los 4 integrantes. Ver CONTRIBUTING.md §5.
 *
 * Convenciones de unidades (válidas en TODO el código):
 *  - Montos en pesos chilenos (CLP) como `number` SIN redondear.
 *    El redondeo se hace únicamente al mostrar (uiController).
 *  - Tasas como fracción decimal: 5 % → 0.05. Solo la UI convierte % ↔ decimal.
 *  - Plazo `t` en años enteros; `n = 12t` meses; `k` = índice de mes (0..n).
 *  - k = 0 representa el estado inicial (saldo = P), antes del primer mes.
 */

// ─────────────────────────────────────────────────────────────────────────────
// Tipos (JSDoc). VS Code los usa para autocompletar y advertir errores de tipo.
// Importar en otros módulos con:  /** @typedef {import('./contracts.js').Parametros} Parametros */
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Parámetros de entrada de la simulación (siempre en unidades del motor).
 * @typedef {Object} Parametros
 * @property {number} P Capital inicial en CLP (≥ 0). Rango: LIMITES.P.
 * @property {number} r Tasa anual nominal en decimal (≥ 0). 0.05 = 5 % anual.
 * @property {number} M Aporte mensual fijo en CLP (≥ 0), depositado al FINAL de cada mes.
 * @property {number} t Plazo en años (entero ≥ 1).
 */

/**
 * Fila de la serie mensual. Hay una por cada mes k = 0, 1, …, n (largo n + 1).
 * @typedef {Object} FilaMensual
 * @property {number} k               Mes (0 = estado inicial).
 * @property {number} saldoSinAportes C(k) = P·(1 + i)^k   (sucesión geométrica).
 * @property {number} saldoConAportes C(0) = P;  C(k+1) = C(k)·(1 + i) + M   (recurrencia).
 * @property {number} totalAportado   P + M·k.
 * @property {number} interesGenerado saldoConAportes − totalAportado.
 */

/**
 * Fila de la vista anual: una FilaMensual con k = 12·anio, para anio = 0..t.
 * @typedef {FilaMensual & { anio: number }} FilaAnual
 */

/**
 * Indicadores de las tarjetas de resumen.
 * @typedef {Object} ResumenSimulacion
 * @property {number} i                       Tasa mensual: r / 12.
 * @property {number} n                       Meses totales: 12·t.
 * @property {number} montoSinAportes         A(t) = P·(1 + r/12)^(12t).
 * @property {number} valorFuturoAportes      S = M·((1 + i)^n − 1) / i   (S = M·n si i = 0).
 * @property {number} montoConAportes         A(t) + S. Debe coincidir con la última fila iterada.
 * @property {number} totalAportado           P + M·n.
 * @property {number} interesGenerado         montoConAportes − totalAportado.
 * @property {number} tiempoDuplicacion       Años (sin aportes): ln 2 / (12·ln(1 + r/12)). Infinity si r = 0.
 * @property {number} regla72                 Años (aproximación): 72 / (r·100). Infinity si r = 0.
 * @property {number} tasaParaDuplicar        Tasa anual nominal para duplicar P en t años: 12·(2^(1/n) − 1).
 * @property {number} tasaMensualParaDuplicar Tasa mensual equivalente: 2^(1/n) − 1.
 */

/**
 * Salida completa de `mathEngine.simular()`.
 * @typedef {Object} ResultadoSimulacion
 * @property {Parametros}        parametros   Copia de los parámetros usados.
 * @property {ResumenSimulacion} resumen      Indicadores para las tarjetas.
 * @property {FilaMensual[]}     serieMensual Serie mes a mes (largo n + 1).
 */

/**
 * Vista de la tabla de valores.
 * @typedef {'mensual' | 'anual'} ModoTabla
 */

/**
 * Callbacks que main.js entrega a uiController.inicializarUI().
 * @typedef {Object} ManejadoresUI
 * @property {(parametros: Parametros) => void} alCambiarParametros Se llama tras cada cambio válido de un control.
 * @property {(modo: ModoTabla) => void}        alCambiarModoTabla  Se llama al alternar vista mensual/anual.
 */

/**
 * Comandos de verificación para pegar en GeoGebra.
 * @typedef {Object} ComandosGeoGebra
 * @property {string} funcionSinAportes Ej.: "f(x) = 1000000 (1 + 0.05 / 12)^x"
 * @property {string} iteracionConAportes Ej.: "L = IterationList(c (1 + 0.05 / 12) + 50000, c, {1000000}, 120)"
 * @property {string} puntosSinAportes  Ej.: "{(0, 1000000), (12, 1051161.9), …}"
 * @property {string} puntosConAportes  Ídem para la curva con aportes.
 */

// ─────────────────────────────────────────────────────────────────────────────
// Constantes compartidas
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Rangos de los controles, en UNIDADES DEL MOTOR (r en decimal).
 * uiController los aplica a los sliders/inputs; mathEngine los usa para validar.
 */
export const LIMITES = Object.freeze({
  P: Object.freeze({ min: 0, max: 100_000_000, paso: 10_000 }),
  r: Object.freeze({ min: 0, max: 0.2, paso: 0.0005 }),
  M: Object.freeze({ min: 0, max: 2_000_000, paso: 5_000 }),
  t: Object.freeze({ min: 1, max: 40, paso: 1 }),
});

/** Valores al cargar la página. Reproducen el Caso D de validación. */
export const PARAMETROS_INICIALES = Object.freeze({ P: 1_000_000, r: 0.05, M: 50_000, t: 10 });

/** Modos válidos de la tabla de valores. */
export const MODOS_TABLA = Object.freeze({ MENSUAL: 'mensual', ANUAL: 'anual' });

/** Configuración regional para Intl.NumberFormat. */
export const FORMATO = Object.freeze({ locale: 'es-CL', moneda: 'CLP' });

/**
 * Error que lanzan los stubs mientras una función no está implementada.
 * validator.js lo reconoce y reporta el caso como PENDIENTE (no como FALLA).
 */
export class NoImplementadoError extends Error {
  /** @param {string} nombreFuncion Ej.: 'mathEngine.tasaMensual' */
  constructor(nombreFuncion) {
    super(`${nombreFuncion}: no implementado todavía`);
    this.name = 'NoImplementadoError';
  }
}
