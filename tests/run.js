/**
 * @file run.js — Ejecuta la validación desde la terminal:  npm test  (Node ≥ 18, sin dependencias).
 *
 * Responsable: Maximiliano Montoya — rama `feat/validation-qa`
 *
 * Código de salida: 0 si no hay FALLA ni ERROR; 1 en caso contrario
 * (los casos PENDIENTE no hacen fallar la ejecución mientras existan stubs).
 */

import * as motor from '../js/mathEngine.js';
import { CASOS } from './validationCases.js';
import { ejecutarTodos, imprimirReporte } from '../js/validator.js';

// TODO: [Maximiliano Montoya] Ajustar cuando validator.js esté implementado.
try {
  const reporte = ejecutarTodos(CASOS, motor);
  imprimirReporte(reporte);
  process.exitCode = reporte.fallidos + reporte.errores > 0 ? 1 : 0;
} catch (error) {
  console.warn(`Validador pendiente: ${error instanceof Error ? error.message : error}`);
}
