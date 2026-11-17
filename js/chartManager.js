/**
 * @file chartManager.js — Gráfico comparativo de dos curvas (Chart.js vía CDN).
 *
 * Responsable: Camilo Sepúlveda — rama `feat/ui-charts`
 *
 * Dependencia externa: Chart.js 4.4.1 cargado en index.html como script clásico
 * con `defer`, por lo que está disponible como `window.Chart` antes de main.js.
 *
 * Reglas del módulo:
 *  - NO importa mathEngine: recibe la serie ya calculada desde main.js.
 *  - NO calcula nada financiero: solo dibuja los valores que recibe.
 *  - Los colores salen de las variables CSS (styles.css), no se escriben aquí.
 *
 * Verificación con GeoGebra: generarComandosGeoGebra() produce texto para pegar en
 * https://www.geogebra.org/graphing y comparar ambas curvas punto a punto.
 */

import { NoImplementadoError } from './contracts.js';

/** @typedef {import('./contracts.js').Parametros} Parametros */
/** @typedef {import('./contracts.js').FilaMensual} FilaMensual */
/** @typedef {import('./contracts.js').ComandosGeoGebra} ComandosGeoGebra */

/**
 * Textos del gráfico (vienen de content.js → CONTENIDO.grafico).
 * @typedef {Object} EtiquetasGrafico
 * @property {string} ejeX
 * @property {string} ejeY
 * @property {string} serieSinAportes
 * @property {string} serieConAportes
 */

/** Instancia única de Chart (estado privado del módulo). @type {any} */
let grafico = null;

/**
 * Lee un color definido en :root para mantener una sola paleta (CSS).
 *
 * @param {string} nombreVariable Ej.: '--color-serie-sin-aportes'.
 * @returns {string} Valor CSS sin espacios, ej. '#2b6cb0'.
 */
function leerColorCSS(nombreVariable) {
  // TODO: [Camilo Sepúlveda] getComputedStyle(document.documentElement).getPropertyValue(nombreVariable).trim()
  throw new NoImplementadoError('chartManager.leerColorCSS');
}

/**
 * Crea el gráfico de líneas vacío con dos datasets: [0] "Sin aportes", [1] "Con aportes".
 *
 * Recomendaciones (rendimiento con sliders y hasta 481 puntos):
 *  - `animation: false`, `pointRadius: 0`, `interaction: { mode: 'index', intersect: false }`.
 *  - Tooltip con formato CLP (recibir el formateador desde uiController si se necesita).
 *
 * @param {HTMLCanvasElement} canvas   Elemento `#grafico-saldos`.
 * @param {EtiquetasGrafico}  etiquetas Textos de ejes y leyenda.
 * @returns {void}
 * @throws {Error} Si `window.Chart` no existe (el CDN no cargó): main.js debe mostrar un aviso.
 */
export function crearGrafico(canvas, etiquetas) {
  // TODO: [Camilo Sepúlveda] new window.Chart(canvas, { type: 'line', data: { labels: [], datasets: [...] }, options })
  // TODO: [Camilo Sepúlveda] Colores: leerColorCSS('--color-serie-sin-aportes') y '--color-serie-con-aportes'.
  throw new NoImplementadoError('chartManager.crearGrafico');
}

/**
 * Reemplaza los datos de ambas curvas y redibuja.
 *
 * Eje X: mes k (0..n).   Eje Y: saldo en CLP.
 *  - dataset[0] ← fila.saldoSinAportes   (C(k) = P(1 + i)^k)
 *  - dataset[1] ← fila.saldoConAportes   (C(k+1) = C(k)(1 + i) + M)
 *
 * @param {FilaMensual[]} serieMensual Serie de largo n + 1.
 * @returns {void}
 */
export function actualizarGrafico(serieMensual) {
  // TODO: [Camilo Sepúlveda] Asignar labels/data y llamar grafico.update('none').
  throw new NoImplementadoError('chartManager.actualizarGrafico');
}

/**
 * Genera comandos para verificar las curvas en GeoGebra (usar punto decimal).
 *
 * Formato esperado de salida (Caso D):
 *   funcionSinAportes:   "f(x) = 1000000 (1 + 0.05 / 12)^x"
 *   iteracionConAportes: "L = IterationList(c (1 + 0.05 / 12) + 50000, c, {1000000}, 120)"
 *   puntosSinAportes:    "{(0, 1000000), (12, 1051161.9), …}"
 *   puntosConAportes:    "{(0, 1000000), (12, …), …}"
 *
 * @param {FilaMensual[]} serieMensual
 * @param {Parametros}    parametros
 * @param {number}        [cadaMeses=12] Submuestreo de puntos (12 = un punto por año).
 * @returns {ComandosGeoGebra}
 */
export function generarComandosGeoGebra(serieMensual, parametros, cadaMeses = 12) {
  // TODO: [Camilo Sepúlveda] Construir los cuatro strings a partir de la serie y los parámetros.
  throw new NoImplementadoError('chartManager.generarComandosGeoGebra');
}

/**
 * Libera la instancia de Chart (útil al recrear el gráfico o en pruebas).
 * @returns {void}
 */
export function destruirGrafico() {
  // TODO: [Camilo Sepúlveda] grafico?.destroy(); grafico = null;
  throw new NoImplementadoError('chartManager.destruirGrafico');
}
