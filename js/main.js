/**
 * @file main.js — Punto de entrada y orquestador (composition root).
 *
 * Responsable: Camilo Sepúlveda (integración) — rama `feat/ui-charts`
 *
 * Es el ÚNICO módulo que conoce a todos los demás. Los módulos no se importan
 * entre sí (salvo contracts.js), lo que permite trabajar en paralelo sin conflictos:
 *
 *   uiController ──(parámetros)──▶ main ──▶ mathEngine.simular()
 *                                    │
 *        ◀──(resumen, tabla)─────────┼──▶ chartManager.actualizarGrafico()
 *
 * Se carga con <script type="module">: se ejecuta en modo estricto y después de
 * parsear el HTML (equivale a `defer`), por lo que el DOM ya está disponible.
 */

import { PARAMETROS_INICIALES, MODOS_TABLA, NoImplementadoError } from './contracts.js';
import { simular, resumenAnual } from './mathEngine.js';
import {
  inicializarUI,
  renderizarResumen,
  renderizarTabla,
  renderizarContenido,
  renderizarComandosGeoGebra,
  mostrarError,
} from './uiController.js';
import { crearGrafico, actualizarGrafico, generarComandosGeoGebra } from './chartManager.js';
import { CONTENIDO, obtenerTexto } from './content.js';

/** @typedef {import('./contracts.js').Parametros} Parametros */
/** @typedef {import('./contracts.js').ModoTabla} ModoTabla */
/** @typedef {import('./contracts.js').ResultadoSimulacion} ResultadoSimulacion */

/**
 * Estado mínimo de la aplicación (solo vive aquí).
 * @type {{ modoTabla: ModoTabla, ultimoResultado: ResultadoSimulacion | null }}
 */
const estado = {
  modoTabla: MODOS_TABLA.MENSUAL,
  ultimoResultado: null,
};

/**
 * Ciclo principal: parámetros → simulación → renderizado.
 * Si mathEngine lanza RangeError, se muestra el mensaje y se conserva el último resultado válido.
 *
 * @param {Parametros} parametros Parámetros en unidades del motor (r decimal).
 * @returns {void}
 */
function recalcular(parametros) {
  // TODO: [Camilo Sepúlveda]
  //  1. estado.ultimoResultado = simular(parametros)   (try/catch → mostrarError(error.message))
  //  2. renderizarResumen(resultado.resumen)
  //  3. actualizarGrafico(resultado.serieMensual)
  //  4. renderizarFilas()
  //  5. renderizarComandosGeoGebra(generarComandosGeoGebra(resultado.serieMensual, parametros))
  //  6. mostrarError('')
  throw new NoImplementadoError('main.recalcular');
}

/**
 * Dibuja la tabla según estado.modoTabla, sin recalcular la simulación.
 * - 'mensual' → estado.ultimoResultado.serieMensual
 * - 'anual'   → resumenAnual(estado.ultimoResultado.serieMensual)
 * @returns {void}
 */
function renderizarFilas() {
  // TODO: [Camilo Sepúlveda] Elegir filas según el modo y llamar renderizarTabla(filas, estado.modoTabla).
  throw new NoImplementadoError('main.renderizarFilas');
}

/**
 * Manejador para uiController: cambio de vista de la tabla.
 * @param {ModoTabla} modo
 * @returns {void}
 */
function alCambiarModoTabla(modo) {
  // TODO: [Camilo Sepúlveda] estado.modoTabla = modo; renderizarFilas();
  throw new NoImplementadoError('main.alCambiarModoTabla');
}

/**
 * Arranque de la aplicación.
 * Orden: textos → gráfico → controles → primer cálculo con PARAMETROS_INICIALES.
 * @returns {void}
 */
function iniciar() {
  // TODO: [Camilo Sepúlveda]
  //  1. renderizarContenido(obtenerTexto)
  //  2. crearGrafico(document.querySelector('#grafico-saldos'), CONTENIDO.grafico)
  //     (si window.Chart no existe → mostrarError y continuar sin gráfico)
  //  3. inicializarUI({ alCambiarParametros: recalcular, alCambiarModoTabla })
  //  4. recalcular(PARAMETROS_INICIALES)
  throw new NoImplementadoError('main.iniciar');
}

try {
  iniciar();
} catch (error) {
  // Mientras haya stubs, la página muestra el HTML estático y avisa en consola.
  console.warn('[Crecer con números] Arranque incompleto:', error instanceof Error ? error.message : error);
}
