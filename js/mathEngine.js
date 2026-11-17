/**
 * @file mathEngine.js — Motor de cálculo financiero (funciones puras).
 *
 * Responsable: Gianni Antonietti — rama `feat/math-engine`
 *
 * Reglas del módulo:
 *  1. Funciones PURAS: misma entrada → misma salida. Sin DOM, sin `window`,
 *     sin estado global, sin `console.log`. Así se prueban en navegador y en Node.
 *  2. NO redondear resultados: el redondeo es tarea de la UI al mostrar.
 *  3. Tasas en decimal (0.05 = 5 %). Montos en CLP. Plazo en años enteros.
 *  4. Entradas inválidas → lanzar `RangeError` con un mensaje claro.
 *  5. Cada stub lanza `NoImplementadoError` hasta ser implementado; los casos de
 *     tests/validationCases.js pasan de PENDIENTE a OK a medida que avances.
 *
 * Referencias: Lippman (2022a, 2022b), Olivier (2022a, 2022b), Levin (2022). Ver README §9.
 */

import { LIMITES, NoImplementadoError } from './contracts.js';

/** @typedef {import('./contracts.js').Parametros} Parametros */
/** @typedef {import('./contracts.js').FilaMensual} FilaMensual */
/** @typedef {import('./contracts.js').FilaAnual} FilaAnual */
/** @typedef {import('./contracts.js').ResultadoSimulacion} ResultadoSimulacion */

// ─────────────────────────────────────────────────────────────────────────────
// Conversiones básicas
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Tasa de interés mensual a partir de la tasa anual nominal.
 *
 * Fórmula:  i = r / 12
 *
 * @param {number} r Tasa anual nominal en decimal (≥ 0). Ej.: 0.05.
 * @returns {number} Tasa mensual i en decimal. Ej.: 0.05 → 0.0041666…
 */
export function tasaMensual(r) {
  // TODO: [Gianni Antonietti] Implementar i = r / 12.
  throw new NoImplementadoError('mathEngine.tasaMensual');
}

/**
 * Número total de meses del plazo.
 *
 * Fórmula:  n = 12·t
 *
 * @param {number} t Plazo en años (entero ≥ 1).
 * @returns {number} n en meses. Ej.: 10 → 120.
 */
export function mesesTotales(t) {
  // TODO: [Gianni Antonietti] Implementar n = 12 * t.
  throw new NoImplementadoError('mathEngine.mesesTotales');
}

// ─────────────────────────────────────────────────────────────────────────────
// Modelo A — sin aportes (sucesión geométrica)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Término general de la sucesión geométrica sin aportes.
 *
 * Fórmula:  C(k) = P·(1 + i)^k,  con i = r / 12
 *
 * @param {number} P Capital inicial en CLP (≥ 0).
 * @param {number} r Tasa anual nominal en decimal (≥ 0).
 * @param {number} k Mes (entero ≥ 0). k = 0 devuelve P.
 * @returns {number} Saldo al final del mes k, en CLP.
 * @example saldoSinAportes(1_000_000, 0.05, 1)  // ≈ 1_004_166.67  (Caso E)
 * @example saldoSinAportes(1_000_000, 0.05, 12) // ≈ 1_051_161.90  (Caso E)
 */
export function saldoSinAportes(P, r, k) {
  // TODO: [Gianni Antonietti] Implementar C(k) = P * (1 + i) ** k reutilizando tasaMensual().
  throw new NoImplementadoError('mathEngine.saldoSinAportes');
}

/**
 * Monto final a t años sin aportes (función exponencial).
 *
 * Fórmula:  A(t) = P·(1 + r/12)^(12t)
 * Equivale a saldoSinAportes(P, r, 12t): reutilizarla para no duplicar lógica.
 *
 * @param {number} P Capital inicial en CLP (≥ 0).
 * @param {number} r Tasa anual nominal en decimal (≥ 0).
 * @param {number} t Plazo en años (entero ≥ 1).
 * @returns {number} Monto A(t) en CLP.
 * @example montoFinalSinAportes(1_000_000, 0.05, 10) // ≈ 1_647_009.50  (Caso A)
 */
export function montoFinalSinAportes(P, r, t) {
  // TODO: [Gianni Antonietti] Implementar A(t) = P * (1 + r / 12) ** (12 * t).
  throw new NoImplementadoError('mathEngine.montoFinalSinAportes');
}

// ─────────────────────────────────────────────────────────────────────────────
// Modelo B — con aportes mensuales (relación de recurrencia)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Un paso de la recurrencia con aportes al final de cada mes.
 *
 * Fórmula:  C(k+1) = C(k)·(1 + i) + M
 * Recibe `i` (no `r`) porque se llama dentro de un ciclo: evita recalcular r/12.
 *
 * @param {number} saldoActual C(k) en CLP.
 * @param {number} i           Tasa mensual en decimal.
 * @param {number} M           Aporte mensual en CLP (≥ 0).
 * @returns {number} C(k+1) en CLP.
 */
export function siguienteSaldo(saldoActual, i, M) {
  // TODO: [Gianni Antonietti] Implementar C(k+1) = C(k) * (1 + i) + M.
  throw new NoImplementadoError('mathEngine.siguienteSaldo');
}

/**
 * Itera la recurrencia mes a mes y devuelve todos los saldos.
 *
 * Definición:  saldos[0] = P;  saldos[k+1] = siguienteSaldo(saldos[k], i, M)
 * Propiedad a cumplir: con M = 0 reproduce exactamente C(k) = P·(1 + i)^k.
 *
 * @param {number} P Capital inicial en CLP (≥ 0).
 * @param {number} r Tasa anual nominal en decimal (≥ 0).
 * @param {number} M Aporte mensual en CLP (≥ 0).
 * @param {number} n Número de meses (entero ≥ 0).
 * @returns {number[]} Arreglo de largo n + 1 con C(0), C(1), …, C(n).
 */
export function serieSaldos(P, r, M, n) {
  // TODO: [Gianni Antonietti] Iterar siguienteSaldo() n veces partiendo de P.
  throw new NoImplementadoError('mathEngine.serieSaldos');
}

/**
 * Valor futuro de la serie de aportes (suma de una serie geométrica / anualidad vencida).
 *
 * Fórmula:  S = M·((1 + i)^n − 1) / i,   con i = r / 12
 * Caso borde: si i = 0, el límite es S = M·n (evitar división por cero).
 *
 * @param {number} M Aporte mensual en CLP (≥ 0).
 * @param {number} r Tasa anual nominal en decimal (≥ 0).
 * @param {number} n Número de meses (entero ≥ 0).
 * @returns {number} S en CLP.
 * @example valorFuturoAportes(50_000, 0.05, 120) // ≈ 7_764_113.97  (Caso D)
 */
export function valorFuturoAportes(M, r, n) {
  // TODO: [Gianni Antonietti] Implementar S y el caso borde i === 0.
  throw new NoImplementadoError('mathEngine.valorFuturoAportes');
}

/**
 * Monto final con aportes en forma cerrada.
 *
 * Fórmula:  C(n) = A(t) + S = P·(1 + i)^n + M·((1 + i)^n − 1) / i,   con n = 12t
 * Debe coincidir (± 0,01 CLP) con el último elemento de serieSaldos(P, r, M, n).
 *
 * @param {number} P Capital inicial en CLP (≥ 0).
 * @param {number} r Tasa anual nominal en decimal (≥ 0).
 * @param {number} M Aporte mensual en CLP (≥ 0).
 * @param {number} t Plazo en años (entero ≥ 1).
 * @returns {number} Monto total en CLP.
 * @example montoFinalConAportes(1_000_000, 0.05, 50_000, 10) // ≈ 9_411_123.47  (Caso D)
 */
export function montoFinalConAportes(P, r, M, t) {
  // TODO: [Gianni Antonietti] Componer montoFinalSinAportes() + valorFuturoAportes().
  throw new NoImplementadoError('mathEngine.montoFinalConAportes');
}

// ─────────────────────────────────────────────────────────────────────────────
// Logaritmos — duplicación del capital (escenario SIN aportes)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Tiempo exacto de duplicación con capitalización mensual.
 *
 * Despeje:  P·(1 + r/12)^(12t) = 2P  ⇒  12t·ln(1 + r/12) = ln 2
 * Fórmula:  t = ln 2 / (12·ln(1 + r/12))
 * Sugerencia: Math.log1p(x) es más preciso que Math.log(1 + x) para x pequeño.
 * Caso borde: r = 0 → Infinity (el capital nunca se duplica).
 *
 * @param {number} r Tasa anual nominal en decimal (≥ 0).
 * @returns {number} Años (sin redondear).
 * @example tiempoDuplicacion(0.05) // ≈ 13.89  (Caso B → 13,9 años)
 */
export function tiempoDuplicacion(r) {
  // TODO: [Gianni Antonietti] Implementar t = Math.LN2 / (12 * Math.log1p(r / 12)).
  throw new NoImplementadoError('mathEngine.tiempoDuplicacion');
}

/**
 * Aproximación de la Regla del 72.
 *
 * Fórmula:  t ≈ 72 / (r·100)
 * Caso borde: r = 0 → Infinity.
 *
 * @param {number} r Tasa anual nominal en decimal (≥ 0).
 * @returns {number} Años aproximados.
 * @example regla72(0.05) // 14.4  (Caso B)
 */
export function regla72(r) {
  // TODO: [Gianni Antonietti] Implementar 72 / (r * 100).
  throw new NoImplementadoError('mathEngine.regla72');
}

/**
 * Tasa anual nominal necesaria para duplicar un capital en t años.
 *
 * Despeje:  P·(1 + i)^n = 2P  ⇒  1 + i = 2^(1/n)
 * Fórmula:  r = 12·(2^(1/n) − 1),   con n = 12t
 *
 * @param {number} t Plazo en años (> 0).
 * @returns {number} Tasa anual nominal en decimal.
 * @throws {RangeError} Si t ≤ 0.
 * @example tasaParaDuplicar(5)  // ≈ 0.1394  (Caso C → 13,9 % anual; 1,16 % mensual)
 * @example tasaParaDuplicar(10) // ≈ 0.0695  (Caso C → 6,95 % anual)
 */
export function tasaParaDuplicar(t) {
  // TODO: [Gianni Antonietti] Implementar 12 * (2 ** (1 / (12 * t)) - 1).
  throw new NoImplementadoError('mathEngine.tasaParaDuplicar');
}

// ─────────────────────────────────────────────────────────────────────────────
// API de alto nivel (la única que consume main.js)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Valida que los parámetros sean números finitos dentro de LIMITES y que t sea entero.
 *
 * @param {Parametros} parametros
 * @returns {void}
 * @throws {RangeError} Con mensaje que nombre el parámetro inválido, ej.: "t debe ser un entero entre 1 y 40".
 */
export function validarParametros(parametros) {
  // TODO: [Gianni Antonietti] Recorrer P, r, M, t contra LIMITES (Number.isFinite, min, max; t entero).
  throw new NoImplementadoError('mathEngine.validarParametros');
}

/**
 * Ejecuta la simulación completa para la UI.
 *
 * Pasos esperados:
 *  1. validarParametros(parametros).
 *  2. i = tasaMensual(r);  n = mesesTotales(t).
 *  3. conAportes = serieSaldos(P, r, M, n);  sinAportes = serieSaldos(P, r, 0, n).
 *  4. Construir serieMensual: FilaMensual[] de largo n + 1 (k = 0..n).
 *  5. Construir resumen con las formas cerradas (A(t), S, ln 2, Regla del 72, 2^(1/n)).
 *
 * @param {Parametros} parametros
 * @returns {ResultadoSimulacion}
 * @throws {RangeError} Si los parámetros son inválidos.
 * @example simular({ P: 1_000_000, r: 0.05, M: 50_000, t: 10 }).resumen.interesGenerado // ≈ 2_411_123.47
 */
export function simular(parametros) {
  // TODO: [Gianni Antonietti] Componer las funciones anteriores siguiendo los pasos del JSDoc.
  throw new NoImplementadoError('mathEngine.simular');
}

/**
 * Extrae la vista anual de la serie mensual (filas con k múltiplo de 12, incluye el año 0).
 *
 * @param {FilaMensual[]} serieMensual Serie de largo n + 1.
 * @returns {FilaAnual[]} Filas para anio = 0..t, con anio = k / 12.
 */
export function resumenAnual(serieMensual) {
  // TODO: [Gianni Antonietti] Filtrar k % 12 === 0 y agregar la propiedad `anio`.
  throw new NoImplementadoError('mathEngine.resumenAnual');
}
