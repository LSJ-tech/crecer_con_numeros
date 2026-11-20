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
 * Fuentes de los textos: README §2 (contexto), §3 (modelos y supuestos) y §9 (referencias), y la Tabla de
 * la Etapa 2. Si cambia una cifra, una fórmula o una referencia, hay que cambiarla en ambos lados.
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
    pie:
      'Logan Silva, Camilo Sepúlveda, Gianni Antonietti y Maximiliano Montoya · MVFM01, Ingeniería en Informática, INACAP · 2026. ' +
      'Proyecto académico con fines educativos: los resultados son simulaciones y no constituyen asesoría financiera.',
  },

  contexto: {
    titulo: '¿Por qué esta calculadora?',
    descripcion:
      'En Chile, muchas personas creen entender las tasas de interés, pero pocas saben calcular cuánto crece un ahorro. ' +
      'Esa brecha lleva a decisiones de largo plazo poco informadas al comparar cuentas de ahorro, depósitos o créditos. ' +
      'Esta calculadora es para quienes comienzan a ahorrar: muestra, con las fórmulas a la vista, cómo cambia el resultado ' +
      'al mover el capital, la tasa, el aporte mensual o el plazo.',
    datos: [
      'El 42 % de las personas en Chile tiene un nivel de conocimiento financiero bajo, aunque el 66 % afirma entender las tasas de interés (La Tercera, s. f.).',
      'Solo el 39 % de los emprendedores respondió bien una pregunta sobre el crecimiento de un ahorro al 2 % anual, y el 42 % no supo o no respondió (Ministerio de Economía, 2012).',
    ],
  },

  parametros: {
    titulo: 'Parámetros',
    P: {
      etiqueta: 'Capital inicial (P)',
      ayuda: 'Monto con que se abre el ahorro, en pesos. Entre $0 y $100.000.000.',
    },
    r: {
      etiqueta: 'Tasa anual nominal (r)',
      ayuda: 'Tasa anual que informa la institución. Se divide por 12 para obtener la tasa mensual (i = r/12). Entre 0 % y 20 %.',
    },
    M: {
      etiqueta: 'Aporte mensual (M)',
      ayuda: 'Depósito fijo al final de cada mes. Con $0, las dos curvas coinciden. Entre $0 y $2.000.000.',
    },
    t: {
      etiqueta: 'Plazo (t)',
      ayuda: 'Años que se mantiene el ahorro, de 1 a 40. Cada año son 12 meses de capitalización (n = 12t).',
    },
    restablecer: 'Restablecer valores de ejemplo',
  },

  resultados: {
    titulo: 'Resultados',
    montoFinal: {
      titulo: 'Monto final',
      nota: 'Es la suma de dos partes: el capital inicial con su interés, A(t), y los aportes mensuales con su interés, S.',
    },
    duplicacion: {
      titulo: 'Tiempo de duplicación',
      exacto: 'Exacto (logaritmos)',
      regla72: 'Regla del 72',
      // A-09: estas dos tarjetas son del escenario sin aportes y no cambian al mover M.
      nota:
        'Escenario sin aportes: depende solo de la tasa, no del capital ni del aporte mensual. ' +
        'La Regla del 72 es una aproximación; el valor exacto se calcula con logaritmos. Con tasa 0 % el capital no se duplica.',
    },
    tasaRequerida: {
      titulo: 'Tasa para duplicar en el plazo',
      nota:
        'Escenario sin aportes: depende solo del plazo, no del capital ni del aporte mensual. ' +
        'Es la tasa anual nominal con la que el capital inicial llega al doble en los años elegidos.',
    },
    desglose: { titulo: 'Aportado vs. interés', totalAportado: 'Total aportado', interesGenerado: 'Interés generado' },
  },

  modelos: {
    titulo: 'Dos modelos, dos fórmulas',
    sinAportes: {
      titulo: 'Sin aportes: sucesión geométrica',
      descripcion:
        'Cada mes el saldo se multiplica por el mismo factor (1 + i), así que los saldos forman una sucesión geométrica ' +
        'de razón (1 + i) (Levin, 2022). Al evaluarla en k = 12t se obtiene la función exponencial A(t) (Lippman, 2022a). ' +
        'Ejemplo: $1.000.000 al 5 % anual llega a $1.647.009,50 en 10 años.',
      /** @type {string[]} */
      formulas: [
        'i = r / 12',
        'C(k) = P · (1 + i)ᵏ',
        'A(t) = P · (1 + r/12)¹²ᵗ',
      ],
    },
    conAportes: {
      titulo: 'Con aportes mensuales: relación de recurrencia',
      descripcion:
        'Al final de cada mes el saldo gana interés y después se suma el aporte M, así que ya no es una sucesión geométrica pura, ' +
        'sino una relación de recurrencia. Su forma cerrada suma el capital capitalizado, A(t), y el valor futuro de los aportes, S, ' +
        'que es una serie geométrica (Olivier, 2022b). Ejemplo: con $1.000.000, $50.000 al mes, 5 % y 10 años, el total es ' +
        '$9.411.123,47. Lo aportado suma $7.000.000 (el capital más los aportes), por lo que el interés generado es $2.411.123,47.',
      /** @type {string[]} */
      formulas: [
        'C(0) = P',
        'C(k+1) = C(k) · (1 + i) + M',
        'S = M · ((1 + i)ⁿ − 1) / i',
        'C(n) = A(t) + S',
        'Interés generado = C(n) − (P + M · n)',
      ],
    },
    duplicacion: {
      titulo: 'Duplicar el capital: logaritmos y Regla del 72',
      descripcion:
        'Para saber cuándo se duplica el capital se resuelve (1 + r/12)¹²ᵗ = 2: el logaritmo natural baja el exponente desconocido ' +
        '(Lippman, 2022b). La Regla del 72 es solo un atajo: con capitalización mensual da un tiempo algo mayor que el exacto ' +
        '(al 5 %, 14,4 años frente a 13,9). Despejando i en (1 + i)ⁿ = 2 se obtiene la tasa necesaria para duplicar en n meses ' +
        '(Olivier, 2022a).',
      /** @type {string[]} */
      formulas: [
        't = ln 2 / (12 · ln(1 + r/12))',
        't₇₂ ≈ 72 / (100 · r)',
        'r = 12 · (2^(1/n) − 1)',
      ],
    },
  },

  grafico: {
    titulo: 'Saldo mes a mes',
    descripcion:
      'La curva sin aportes muestra cómo crece solo el capital inicial; la curva con aportes suma además los depósitos mensuales. ' +
      'El eje horizontal son los meses y el vertical, el saldo en pesos. La distancia entre las dos curvas son los aportes ' +
      'acumulados con su interés (S), y crece cada mes.',
    ejeX: 'Mes',
    ejeY: 'Saldo (CLP)',
    serieSinAportes: 'Sin aportes',
    serieConAportes: 'Con aportes',
    geogebra: {
      titulo: 'Verificar en GeoGebra',
      instrucciones:
        'Abre geogebra.org/graphing y pega en la barra de entrada cada línea de abajo, una por una. ' +
        'f(x) dibuja la curva sin aportes (x es el número de mes); L calcula los saldos con aportes mes a mes; ' +
        'las listas de puntos marcan un punto por año. Si coinciden con el gráfico, las fórmulas están bien. ' +
        'GeoGebra usa punto decimal, no coma.',
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
    // Igual que README §3.6.
    lista: [
      'Tasa de interés constante durante todo el plazo.',
      'Capitalización mensual con tasa nominal anual (i = r/12).',
      'Aportes al final de cada mes (anualidad vencida).',
      'Sin comisiones, impuestos ni inflación: los montos son nominales.',
      'Es una simulación educativa: no reemplaza las condiciones reales de una institución financiera ni constituye asesoría financiera.',
    ],
  },

  referencias: {
    titulo: 'Referencias',
    // Igual que README §9 (APA 7). Si cambia una, se cambia en ambos lados.
    /** @type {string[]} */
    lista: [
      'La Tercera. (s. f.). Estudio DCV-Cadem: 42% de los chilenos tiene un nivel de conocimiento financiero bajo. https://www.latercera.com/pulso-pm/noticia/estudio-dcv-cadem-42-de-los-chilenos-tiene-un-nivel-de-conocimiento-financiero-bajo/JXFY5LKOEBGWNC3DVSIPUIKRJM/',
      'Levin, O. (2022, 30 de octubre). 2.2: Secuencias aritméticas y geométricas. En Matemáticas discretas. LibreTexts Español. https://espanol.libretexts.org/Bookshelves/Matematicas/Combinatoria_y_Matematicas_Discretas/Matem%C3%A1ticas_Discretas_(Levin)/2%3A_Secuencias/2.2%3A_Secuencias_aritm%C3%A9ticas_y_geom%C3%A9tricas',
      'Lippman, D. (2022a, 30 de octubre). 9.03: Interés compuesto. En Las matemáticas en la sociedad. LibreTexts Español. https://espanol.libretexts.org/Bookshelves/Matematicas/Matematicas_Aplicadas/Las_matematicas_en_la_sociedad_(Lippman)/09%3A_Finanzas/9.03%3A_Inter%C3%A9s_Compuesto',
      'Lippman, D. (2022b, 30 de octubre). 9.09: Resolviendo por tiempo. En Las matemáticas en la sociedad. LibreTexts Español. https://espanol.libretexts.org/Bookshelves/Matematicas/Matematicas_Aplicadas/Las_matematicas_en_la_sociedad_(Lippman)/09%3A_Finanzas/9.09%3A_Resolviendo_por_tiempo',
      'Ministerio de Economía. (2012). Alfabetización financiera de los emprendedores en Chile [Boletín EME]. https://www.economia.gob.cl/wp-content/uploads/2013/08/Boletin_EME_Alfabetizacion_Financiera.pdf',
      'Olivier, J.-P. (2022a, 30 de octubre). 9.05: Determinar la tasa de interés. En Matemáticas empresariales. LibreTexts Español. https://espanol.libretexts.org/Bookshelves/Matematicas/Matematicas_Aplicadas/Matematicas_Empresariales_(Olivier)/09%3A_Inter%C3%A9s_Compuesto-_Trabajar_con_Pagos_%C3%9Anicos/9.05%3A_Determinar_la_tasa_de_inter%C3%A9s',
      'Olivier, J.-P. (2022b, 30 de octubre). 11.02: Valor futuro de las anualidades. En Matemáticas empresariales. LibreTexts Español. https://espanol.libretexts.org/Bookshelves/Matematicas/Matematicas_Aplicadas/Matematicas_Empresariales_(Olivier)/11%3A_Intereses_compuestos-_Anualidades/11.02%3A_Valor_futuro_de_las_anualidades',
      'Chart.js. (s. f.). Chart.js documentation. https://www.chartjs.org/docs/latest/',
      'GeoGebra. (s. f.). Calculadora gráfica GeoGebra. https://www.geogebra.org/graphing',
      'MDN Web Docs. (s. f.). Módulos JavaScript. https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Modules',
    ],
  },
});

/**
 * Obtiene un valor de CONTENIDO a partir de una ruta con puntos.
 *
 * @param {string} ruta Ej.: 'resultados.duplicacion.regla72'.
 * @returns {string | string[] | undefined} El valor, o `undefined` si la ruta no existe, es '' o es un arreglo vacío
 *   (uiController conserva entonces el texto de respaldo del HTML). También devuelve `undefined` si la ruta
 *   apunta a un grupo de textos (un objeto) en vez de a un texto o una lista.
 * @example obtenerTexto('sitio.titulo') // 'Crecer con números'
 */
export function obtenerTexto(ruta) {
  if (typeof ruta !== 'string' || ruta === '') return undefined;

  let valor = CONTENIDO;
  for (const clave of ruta.split('.')) {
    // Object.hasOwn evita leer propiedades heredadas como 'constructor' o '__proto__'.
    if (valor === null || typeof valor !== 'object' || !Object.hasOwn(valor, clave)) return undefined;
    valor = valor[clave];
  }

  if (typeof valor === 'string') return valor === '' ? undefined : valor;
  if (Array.isArray(valor)) return valor.length === 0 ? undefined : valor;
  return undefined;
}
