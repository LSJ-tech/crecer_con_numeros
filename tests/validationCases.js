/**
 * @file validationCases.js — Casos de prueba oficiales (Etapa 2) y casos borde.
 *
 * Responsable: Maximiliano Montoya — rama `feat/validation-qa`
 *
 * Solo DATOS: cada caso describe qué función del motor llamar y qué valor esperar.
 * El ejecutor es js/validator.js. Los valores esperados vienen de la Tabla 2
 * (Etapa 2) y se verificaron a mano y con GeoGebra.
 *
 * Tolerancia = media unidad del último dígito informado:
 *   pesos enteros → 0.5 · centavos → 0.005 · años con 1 decimal → 0.05
 *   tasa '13,9 %' → 0.0005 · tasa '6,95 %' o '1,16 %' → 0.00005
 *
 * Nota Caso D: "Total aportado" = P + M·n = 1.000.000 + 50.000·120 = 7.000.000
 * (los aportes mensuales por sí solos suman 6.000.000).
 */

/** @typedef {typeof import('../js/mathEngine.js')} MotorCalculo */

/**
 * @typedef {Object} CasoValidacion
 * @property {string} id                         Único, ej. 'A1'.
 * @property {'A'|'B'|'C'|'D'|'E'|'X'} grupo     X = casos borde/propiedades agregados por QA.
 * @property {string} descripcion
 * @property {(motor: MotorCalculo) => number} calcular Llama a una o más funciones del motor.
 * @property {number} esperado
 * @property {number} tolerancia                 Diferencia absoluta máxima aceptada.
 * @property {'CLP' | 'años' | 'tasa'} unidad
 * @property {string} fuente
 */

const P = 1_000_000;
const R = 0.05;

/** @type {CasoValidacion[]} */
export const CASOS = [
  // ── Caso A · Monto final sin aportes: A(t) = P(1 + r/12)^(12t) ────────────
  { id: 'A1', grupo: 'A', descripcion: 'A(5) con P = $1.000.000, r = 5 %', calcular: (m) => m.montoFinalSinAportes(P, R, 5), esperado: 1_283_359, tolerancia: 0.5, unidad: 'CLP', fuente: 'Etapa 2 · P2' },
  { id: 'A2', grupo: 'A', descripcion: 'A(10) con P = $1.000.000, r = 5 %', calcular: (m) => m.montoFinalSinAportes(P, R, 10), esperado: 1_647_009.5, tolerancia: 0.005, unidad: 'CLP', fuente: 'Etapa 2 · P2' },
  { id: 'A3', grupo: 'A', descripcion: 'A(15) con P = $1.000.000, r = 5 %', calcular: (m) => m.montoFinalSinAportes(P, R, 15), esperado: 2_113_704, tolerancia: 0.5, unidad: 'CLP', fuente: 'Etapa 2 · P2' },
  { id: 'A4', grupo: 'A', descripcion: 'A(20) con P = $1.000.000, r = 5 %', calcular: (m) => m.montoFinalSinAportes(P, R, 20), esperado: 2_712_640, tolerancia: 0.5, unidad: 'CLP', fuente: 'Etapa 2 · P2' },

  // ── Caso B · Tiempo de duplicación: t = ln 2 / (12 ln(1 + r/12)) ──────────
  { id: 'B1', grupo: 'B', descripcion: 'Duplicación exacta con r = 3 %', calcular: (m) => m.tiempoDuplicacion(0.03), esperado: 23.1, tolerancia: 0.05, unidad: 'años', fuente: 'Etapa 2 · P1' },
  { id: 'B2', grupo: 'B', descripcion: 'Duplicación exacta con r = 5 %', calcular: (m) => m.tiempoDuplicacion(0.05), esperado: 13.9, tolerancia: 0.05, unidad: 'años', fuente: 'Etapa 2 · P1' },
  { id: 'B3', grupo: 'B', descripcion: 'Regla del 72 con r = 5 %', calcular: (m) => m.regla72(0.05), esperado: 14.4, tolerancia: 0.05, unidad: 'años', fuente: 'Etapa 1 · Nociones' },
  { id: 'B4', grupo: 'B', descripcion: 'Duplicación exacta con r = 8 %', calcular: (m) => m.tiempoDuplicacion(0.08), esperado: 8.7, tolerancia: 0.05, unidad: 'años', fuente: 'Etapa 2 · P1' },
  { id: 'B5', grupo: 'B', descripcion: 'Duplicación exacta con r = 10 %', calcular: (m) => m.tiempoDuplicacion(0.1), esperado: 7.0, tolerancia: 0.05, unidad: 'años', fuente: 'Etapa 2 · P1' },

  // ── Caso C · Tasa para duplicar: r = 12(2^(1/n) − 1) ──────────────────────
  { id: 'C1', grupo: 'C', descripcion: 'Tasa anual para duplicar en 5 años (n = 60)', calcular: (m) => m.tasaParaDuplicar(5), esperado: 0.139, tolerancia: 0.0005, unidad: 'tasa', fuente: 'Etapa 2 · P3' },
  { id: 'C2', grupo: 'C', descripcion: 'Tasa mensual para duplicar en 5 años', calcular: (m) => m.tasaMensual(m.tasaParaDuplicar(5)), esperado: 0.0116, tolerancia: 0.00005, unidad: 'tasa', fuente: 'Etapa 2 · P3' },
  { id: 'C3', grupo: 'C', descripcion: 'Tasa anual para duplicar en 10 años (n = 120)', calcular: (m) => m.tasaParaDuplicar(10), esperado: 0.0695, tolerancia: 0.00005, unidad: 'tasa', fuente: 'Etapa 2 · P3' },

  // ── Caso D · Con aportes: P = $1.000.000, r = 5 %, t = 10, M = $50.000 ─────
  { id: 'D1', grupo: 'D', descripcion: 'Capital inicial crece a A(10)', calcular: (m) => m.montoFinalSinAportes(P, R, 10), esperado: 1_647_009.5, tolerancia: 0.005, unidad: 'CLP', fuente: 'Etapa 2 · P4' },
  { id: 'D2', grupo: 'D', descripcion: 'Aportes con interés S (n = 120)', calcular: (m) => m.valorFuturoAportes(50_000, R, 120), esperado: 7_764_113.97, tolerancia: 0.005, unidad: 'CLP', fuente: 'Etapa 2 · P4' },
  { id: 'D3', grupo: 'D', descripcion: 'Monto total A(10) + S (forma cerrada)', calcular: (m) => m.montoFinalConAportes(P, R, 50_000, 10), esperado: 9_411_123.47, tolerancia: 0.005, unidad: 'CLP', fuente: 'Etapa 2 · P4' },
  { id: 'D4', grupo: 'D', descripcion: 'Monto total por recurrencia C(120)', calcular: (m) => m.serieSaldos(P, R, 50_000, 120).at(-1), esperado: 9_411_123.47, tolerancia: 0.01, unidad: 'CLP', fuente: 'Etapa 2 · P4/P5' },
  { id: 'D5', grupo: 'D', descripcion: 'Total aportado P + M·n', calcular: (m) => m.simular({ P, r: R, M: 50_000, t: 10 }).resumen.totalAportado, esperado: 7_000_000, tolerancia: 0.005, unidad: 'CLP', fuente: 'Etapa 2 · P4' },
  { id: 'D6', grupo: 'D', descripcion: 'Interés generado', calcular: (m) => m.simular({ P, r: R, M: 50_000, t: 10 }).resumen.interesGenerado, esperado: 2_411_123.47, tolerancia: 0.005, unidad: 'CLP', fuente: 'Etapa 2 · P4' },

  // ── Caso E · Sucesión mensual sin aportes: C(k) = P(1 + i)^k ──────────────
  { id: 'E1', grupo: 'E', descripcion: 'C(1)', calcular: (m) => m.saldoSinAportes(P, R, 1), esperado: 1_004_167, tolerancia: 0.5, unidad: 'CLP', fuente: 'Etapa 2 · P5' },
  { id: 'E2', grupo: 'E', descripcion: 'C(2)', calcular: (m) => m.saldoSinAportes(P, R, 2), esperado: 1_008_351, tolerancia: 0.5, unidad: 'CLP', fuente: 'Etapa 2 · P5' },
  { id: 'E3', grupo: 'E', descripcion: 'C(3)', calcular: (m) => m.saldoSinAportes(P, R, 3), esperado: 1_012_552, tolerancia: 0.5, unidad: 'CLP', fuente: 'Etapa 2 · P5' },
  { id: 'E4', grupo: 'E', descripcion: 'C(6)', calcular: (m) => m.saldoSinAportes(P, R, 6), esperado: 1_025_262, tolerancia: 0.5, unidad: 'CLP', fuente: 'Etapa 2 · P5' },
  { id: 'E5', grupo: 'E', descripcion: 'C(12)', calcular: (m) => m.saldoSinAportes(P, R, 12), esperado: 1_051_162, tolerancia: 0.5, unidad: 'CLP', fuente: 'Etapa 2 · P5' },

  // ── Grupo X · Casos borde y propiedades ──────────────────────────────────
  // TODO: [Maximiliano Montoya] Agregar como mínimo:
  //  - X1: recurrencia con M = 0 coincide con C(k) para k = 0..120 (máx. diferencia ≤ 1e-6).
  //  - X2: valorFuturoAportes(M, 0, n) === M·n (tasa 0 %, sin división por cero).
  //  - X3: tiempoDuplicacion(0) === Infinity y regla72(0) === Infinity.
  //  - X4: simular() con t = 1 entrega serieMensual de largo 13.
  //  - X5: simular() con t = 0 o P < 0 lanza RangeError (calcular devuelve 1 si lanzó, esperado 1).
  //  - X6: resumenAnual() de t = 10 entrega 11 filas (año 0..10).
  //  - X7: tiempo exacto < Regla del 72 para r = 5 % (comparación lado a lado).
];
