/**
 * @file content.js — Textos de la interfaz (única fuente de verdad del contenido).
 *
 * Responsable: Logan Silva — rama `feat/docs-content`
 *
 * Cómo se conecta con la UI (sin tocar index.html):
 *  - Un elemento con  data-content="ruta.a.la.clave"        recibe el string como textContent.
 *  - Un elemento con  data-content-lista="ruta.a.la.lista"   (<ul>/<ol>) recibe un <li> por cada item.
 *  - Si una clave no existe o es '', uiController conserva el texto de respaldo del HTML.
 *  - Solo texto plano: uiController usa textContent (nunca innerHTML).
 *  - Las listas son arreglos de strings (fórmulas en Unicode, ej. 'C(k) = P · (1 + i)ᵏ').
 *
 * Para agregar un texto nuevo: crear la clave aquí y pedir a Camilo que agregue el
 * atributo data-content en index.html (o abrir un Issue con la clave).
 */

/**
 * Árbol de textos de la interfaz. Las rutas (claves) son el contrato con index.html.
 * Los textos de respaldo del HTML se mantienen hasta que cada clave tenga contenido.
 */
export const CONTENIDO = Object.freeze({
  sitio: {
    titulo: 'Crecer con números',
    subtitulo: 'Calculadora web de crecimiento de capitales',
    pie: '', // TODO: [Logan Silva] Integrantes, curso/institución y año.
  },

  contexto: {
    titulo: '¿Por qué esta calculadora?',
    descripcion: '', // TODO: [Logan Silva] Párrafo breve sobre la brecha de alfabetización financiera en Chile.
    datos: [
      // TODO: [Logan Silva] Un string por dato, con su cita. Ej.: '42 % … (DCV-Cadem, en La Tercera, s. f.)'.
    ],
  },

  parametros: {
    titulo: 'Parámetros',
    P: { etiqueta: 'Capital inicial (P)', ayuda: '' }, // TODO: [Logan Silva] Texto de ayuda de cada parámetro.
    r: { etiqueta: 'Tasa anual nominal (r)', ayuda: '' },
    M: { etiqueta: 'Aporte mensual (M)', ayuda: '' },
    t: { etiqueta: 'Plazo (t)', ayuda: '' },
    restablecer: 'Restablecer valores de ejemplo',
  },

  resultados: {
    titulo: 'Resultados',
    montoFinal: { titulo: 'Monto final', nota: '' }, // TODO: [Logan Silva] Notas interpretativas de cada tarjeta.
    duplicacion: { titulo: 'Tiempo de duplicación', exacto: 'Exacto (logaritmos)', regla72: 'Regla del 72', nota: '' },
    tasaRequerida: { titulo: 'Tasa para duplicar en el plazo', nota: '' },
    desglose: { titulo: 'Aportado vs. interés', totalAportado: 'Total aportado', interesGenerado: 'Interés generado' },
  },

  modelos: {
    titulo: 'Dos modelos, dos fórmulas',
    sinAportes: {
      titulo: 'Sin aportes: sucesión geométrica',
      descripcion: '', // TODO: [Logan Silva] Explicar razón (1 + i) y la función exponencial A(t).
      /** @type {string[]} */
      formulas: [
        // TODO: [Logan Silva] i = r/12 ; C(k) = P(1 + i)^k ; A(t) = P(1 + r/12)^(12t)
      ],
    },
    conAportes: {
      titulo: 'Con aportes mensuales: relación de recurrencia',
      descripcion: '', // TODO: [Logan Silva] Explicar aporte al final de cada mes y la suma S.
      /** @type {string[]} */
      formulas: [
        // TODO: [Logan Silva] C(k+1) = C(k)(1 + i) + M ; S = M((1 + i)^n − 1)/i ; total = A(t) + S
      ],
    },
    duplicacion: {
      titulo: 'Duplicar el capital: logaritmos y Regla del 72',
      descripcion: '', // TODO: [Logan Silva] Despeje con ln y por qué la Regla del 72 es solo una aproximación.
      /** @type {string[]} */
      formulas: [
        // TODO: [Logan Silva] t = ln 2 / (12 ln(1 + r/12)) ; t ≈ 72/(100r) ; r = 12(2^(1/n) − 1)
      ],
    },
  },

  grafico: {
    titulo: 'Saldo mes a mes',
    descripcion: '', // TODO: [Logan Silva] Figcaption: qué muestra cada curva y cómo leer el gráfico.
    ejeX: 'Mes',
    ejeY: 'Saldo (CLP)',
    serieSinAportes: 'Sin aportes',
    serieConAportes: 'Con aportes',
    geogebra: {
      titulo: 'Verificar en GeoGebra',
      instrucciones: '', // TODO: [Logan Silva] Pasos para pegar los comandos en geogebra.org/graphing.
    },
  },

  tabla: {
    titulo: 'Tabla de valores',
    vista: 'Vista',
    caption: 'Saldo sin aportes y con aportes por periodo',
    modoMensual: 'Mensual',
    modoAnual: 'Resumen anual',
    columnas: {
      periodo: 'Periodo',
      sinAportes: 'Sin aportes',
      conAportes: 'Con aportes',
      totalAportado: 'Total aportado',
      interesGenerado: 'Interés generado',
    },
  },

  supuestos: {
    titulo: 'Supuestos y limitaciones',
    lista: [
      // TODO: [Logan Silva] Un string por supuesto. Mínimo obligatorio:
      //  - Tasa de interés constante durante todo el plazo.
      //  - Capitalización mensual (tasa nominal anual / 12).
      //  - Aportes al final de cada mes.
      //  - Sin comisiones, impuestos ni inflación (montos nominales).
      //  - Es una simulación educativa: no reemplaza las condiciones de una institución financiera.
    ],
  },

  referencias: {
    titulo: 'Referencias',
    /** @type {string[]} */
    lista: [
      // TODO: [Logan Silva] Una cita APA 7 completa (con URL) por string. Copiar desde README §9 y mantener ambos sincronizados.
    ],
  },
});

/**
 * Obtiene un valor de CONTENIDO a partir de una ruta con puntos.
 *
 * @param {string} ruta Ej.: 'resultados.duplicacion.regla72'.
 * @returns {string | string[] | undefined} El valor, o `undefined` si la ruta no existe, es '' o es un arreglo vacío
 *   (uiController conserva entonces el texto de respaldo del HTML).
 * @example obtenerTexto('sitio.titulo') // 'Crecer con números'
 */
export function obtenerTexto(ruta) {
  // TODO: [Logan Silva] Recorrer ruta.split('.') sobre CONTENIDO; devolver undefined si falta, es '' o es [].
  return undefined;
}
