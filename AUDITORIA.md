<!--
  NOTA PARA ASISTENTES DE IA (Claude, Copilot, ChatGPT, Gemini, Cursor, Codex u otro):
  Este archivo es la auditoría VIVA del proyecto y debe mantenerse al día.
  Cada vez que hagas un cambio en el repositorio, en el MISMO Pull Request:
    1. Actualiza aquí el estado de los hallazgos que tu cambio cierra (§3) y agrega los nuevos que detectes.
       Si tu cambio completa una tarea de §5, márcala con [x] y agrega "✅ AAAA-MM-DD · PR #N".
       Trabaja las tareas de tu integrante en orden de prioridad (P1 → P2 → P3).
    2. Agrega una línea al Registro (§8): fecha · persona (+ IA usada) · qué cambió · PR.
    3. Actualiza README.md si cambia un comportamiento, un contrato, un comando o la Hoja de ruta.
    4. Sigue las reglas de AGENTS.md (cada archivo tiene dueño, nunca commit directo a main/dev, npm test antes del PR).
  No borres hallazgos ni renumeres IDs. No marques nada como resuelto sin evidencia (PR, salida de npm test o captura).
-->

# Auditoría del proyecto · Crecer con números

| | |
|---|---|
| **Auditoría inicial** | 2026-11-20 · Logan Silva con Claude (Opus 5.5) |
| **Última actualización** | 2026-11-20 · PR #2 |
| **Versión auditada** | `v0.1.0` (andamiaje, commit `c03f153`) |
| **Alcance** | Código (`js/`, `index.html`, `css/`), pruebas (`tests/`), configuración, documentos de `docs/` (Etapas 1 y 2 y presentación) y configuración del repositorio en GitHub |

## Índice

1. [Cómo mantener este documento](#1-cómo-mantener-este-documento)
2. [Resumen](#2-resumen)
3. [Hallazgos](#3-hallazgos)
4. [Detalle de cada hallazgo](#4-detalle-de-cada-hallazgo)
5. [Tareas por integrante (en orden de prioridad)](#5-tareas-por-integrante-en-orden-de-prioridad)
6. [Verificación matemática](#6-verificación-matemática)
7. [Lo que está bien](#7-lo-que-está-bien)
8. [Registro de cambios](#8-registro-de-cambios)

---

## 1. Cómo mantener este documento

Este archivo es **compartido**: cualquiera de los 4 lo actualiza dentro del PR de su propio cambio. Así la auditoría refleja siempre el estado real de `dev`.

- **Al cerrar un hallazgo:** cambia su estado a `✅ Resuelto · AAAA-MM-DD · PR #N`. No lo borres.
- **Si un hallazgo no aplica:** `⛔ Descartado · AAAA-MM-DD`, con la razón en una frase en el detalle (§4).
- **Si queda a medias:** `🟨 Parcial`, con lo que falta en el detalle.
- **Hallazgo nuevo:** usa el siguiente ID libre (`A-24`, `A-25`…). Agrégalo a la tabla de §3 y su detalle a §4, con **evidencia** (archivo y línea) y **solución propuesta**.
- **Al terminar una tarea de §5:** márcala `- [x]` y agrega `✅ AAAA-MM-DD · PR #N`. Marca solo tus propias tareas.
- **Siempre:** una línea en el [Registro](#8-registro-de-cambios).
- **Si cambia `js/mathEngine.js` o `tests/validationCases.js`:** vuelve a correr `npm test` y revisa la tabla de §6.

Severidad: 🔴 crítico (bloquea al equipo o afecta la nota) · 🟠 importante · 🟡 menor.

## 2. Resumen

El andamiaje está bien diseñado: contratos claros, módulos que no se pisan y una matemática **verificada**, porque todos los casos A–E coinciden con las fórmulas (§6). Los riesgos al 2026-11-20 están en tres frentes:

1. **Repositorio:** Maximiliano aún no tiene acceso (A-01).
2. **Coherencia académica:** la presentación describe otro producto (A-04) y la Etapa 2 tiene un error de razonamiento (A-05).
3. **Ruta crítica:** el motor matemático está sin implementar (A-23), y de él dependen la validación y la interfaz.

## 3. Hallazgos

| ID | Sev. | Área | Hallazgo | Dueño | Estado |
|---|:---:|---|---|---|---|
| A-01 | 🔴 | Repo | Maximiliano no tiene acceso: su invitación está pendiente | Maximiliano | Pendiente |
| A-02 | 🔴 | Repo | No existía `dev`, `main` estaba sin protección y la rama por defecto era `main` | Logan | ✅ Resuelto · 2026-11-20 · PR #2 |
| A-03 | 🔴 | Repo | `CODEOWNERS` con un solo dueño por archivo habría bloqueado los PR | Los 4 | ✅ Resuelto · 2026-11-20 · PR #2 |
| A-04 | 🔴 | Docs | La presentación (`.pptx`) describe otro producto, con otras referencias y otro cronograma | Logan + Gianni | Pendiente |
| A-05 | 🔴 | Docs | Etapa 2, respuesta 4: «Los aportes suman $6.000.000, por lo que el interés es $2.411.123,47» no cuadra | Logan | Pendiente |
| A-06 | 🟠 | QA | `npm test` termina en verde aunque el validador no exista | Maximiliano | Pendiente |
| A-07 | 🟠 | QA | El caso borde X3 (`Infinity`) nunca puede pasar con el contrato actual | Maximiliano | Pendiente |
| A-08 | 🟠 | QA | El patrón sugerido para X5 convierte un PENDIENTE en FALLA | Maximiliano | Pendiente |
| A-09 | 🟠 | UX | Las tarjetas de duplicación y de tasa no cambian al mover el aporte `M` | Logan + Camilo | Pendiente |
| A-10 | 🟠 | Accesibilidad | `aria-live` sobre toda la sección de resultados | Camilo | Pendiente |
| A-11 | 🟠 | Seguridad | Chart.js se carga desde el CDN sin `integrity` (SRI) | Camilo | Pendiente |
| A-12 | 🟠 | Repo | No había CI que corriera las pruebas | Los 4 | ✅ Resuelto · 2026-11-20 · PR #2 |
| A-13 | 🟠 | Repo | GitHub Pages no está activado (el README promete la URL) | Logan | Pendiente |
| A-14 | 🟡 | UI | Detalles de `Intl.NumberFormat` en los formateadores | Camilo | Pendiente |
| A-15 | 🟡 | UI | La tabla mensual llega a 481 filas con 40 años | Camilo | Pendiente |
| A-16 | 🟡 | UI | El slider de capital tiene 10.000 posiciones y le falta `aria-valuetext` | Camilo | Pendiente |
| A-17 | 🟡 | UI | Los colores del gráfico no cambian si el sistema cambia de tema | Camilo | Pendiente |
| A-18 | 🟡 | Docs | Citas APA: referencias sin cita en el texto y años sin a/b | Logan | Pendiente |
| A-19 | 🟡 | Docs | `TODO` del README: curso, institución, docente y enlace | Logan | 🟨 Parcial |
| A-20 | 🟡 | Repo | Nombres `(1)` en `docs/`, falta `LICENSE` y no se borró la rama `chore/scaffolding` | Logan | Pendiente |
| A-21 | 🟡 | Privacidad | Repo público con correos institucionales en los commits | Cada integrante | Pendiente (opcional) |
| A-22 | 🟡 | Contenido | `content.js`: 14 textos y 6 listas vacías | Logan | Pendiente |
| A-23 | 🟠 | Motor | `mathEngine.js` sin implementar (14 funciones): es la ruta crítica | Gianni | Pendiente |

## 4. Detalle de cada hallazgo

### A-01 · Maximiliano no tiene acceso al repositorio 🔴

- **Evidencia:** la invitación a `true-max-02` (permiso *write*) sigue pendiente desde el 2026-11-16. Mientras no la acepte, no puede hacer push y GitHub ignora su usuario en `CODEOWNERS`.
- **Solución:** Maximiliano acepta en <https://github.com/LSJ-tech/crecer_con_numeros/invitations> o desde el correo de GitHub. Las invitaciones vencen a los 7 días. Si vence, Logan la reenvía en *Settings → Collaborators*.

### A-02 · Ramas y protección 🔴 · ✅

- **Evidencia:** en GitHub solo existían `main` y `chore/scaffolding`. `main` no tenía protección y era la rama por defecto.
- **Solución aplicada:** se creó `dev` desde `main` y quedó como rama por defecto. `main` y `dev` quedaron protegidas: PR obligatorio, 1 aprobación, revisión de Code Owners, check `npm test` requerido, sin excepciones para administradores, sin force-push ni borrado. Cada integrante crea su rama `feat/*` con CONTRIBUTING.md §1.

### A-03 · Diseño de `CODEOWNERS` 🔴 · ✅

- **Evidencia:** el diseño original daba un solo dueño por archivo y pedía activar «Require review from Code Owners». GitHub no cuenta la aprobación del autor del PR, así que cada persona habría quedado bloqueada en sus propios PR. Además, con varios dueños en una línea GitHub exige la aprobación de **uno**, no de los 4.
- **Solución aplicada:** `.github/CODEOWNERS` lista **dueño + revisor** según la tabla «Quién revisa» de CONTRIBUTING §3. La regla de que los 4 aprueben un cambio de contrato queda como **acuerdo del equipo** (CONTRIBUTING §5), porque GitHub no la puede imponer.

### A-04 · La presentación no coincide con el producto 🔴

- **Evidencia:** `docs/Crecer con números (1).pptx` contradice a las Etapas 1 y 2 y al código:
  - **Diapositivas 3, 5 y 7:** describen un selector de «qué variable calcular» y cálculos según una **meta** o capital objetivo, con periodicidad configurable. El producto real tiene 4 parámetros fijos (P, r, M, t), capitalización mensual y calcula la **duplicación**.
  - **Diapositivas 6 y 8:** llaman `A` al aporte y usan fórmulas genéricas en `C/P`. El proyecto usa `M` y `C(k)`.
  - **Diapositiva 4:** el cronograma (S2 modelar, S3 diseñar, S4 programar) no coincide con la bitácora de la Etapa 2 (S2 interfaz y programación, S3 pruebas, S4 redacción, S5 video).
  - **Diapositiva 11:** las referencias (OpenStax, Stewart, Gitman, MDN) no son las de las Etapas 1 y 2 (La Tercera, Ministerio de Economía, Lippman, Olivier, Levin).
- **Por qué importa:** si se usa en el video de la semana 5, la profesora verá dos productos distintos.
- **Solución recomendada:** rehacer las diapositivas 3–8 y 11 según el producto real (README §1 y §3) y el cronograma de la bitácora. La alternativa, agregar un modo «meta» al producto, exige cambiar `contracts.js` y no está en las Etapas 1 y 2, así que no se recomienda.

### A-05 · Error de razonamiento en la Etapa 2, respuesta 4 🔴

- **Evidencia:** `docs/Tabla_Etapa_2_v4 (1).docx` dice: «Los aportes suman $6.000.000, por lo que el interés generado es de $2.411.123,47». Pero 9.411.123,47 − 6.000.000 = **3.411.123,47**. El valor 2.411.123,47 es correcto solo si también se resta el capital inicial: 9.411.123,47 − (1.000.000 + 6.000.000).
- **Estado del código:** correcto. `totalAportado = P + M·n` (README §3.2 y nota en `tests/validationCases.js`).
- **Solución:** en el video, en la defensa y en cualquier versión nueva del documento, decir: «Los aportes mensuales suman $6.000.000; sumando el capital inicial, lo aportado en total es $7.000.000, por lo que el interés generado es de $2.411.123,47».

### A-06 · `npm test` en verde sin probar nada 🟠

- **Evidencia:** [`tests/run.js`](tests/run.js) captura el error y solo muestra una advertencia, así que el proceso sale con código 0. El CI (A-12) queda en verde aunque `validator.js` no exista.
- **Solución:** después de implementar `validator.js`, poner `process.exitCode = 1;` en el `catch`. Los casos PENDIENTE siguen sin hacer fallar la ejecución, porque los cuenta el reporte, no el `catch`.

### A-07 · El caso X3 (`Infinity`) nunca pasa 🟠

- **Evidencia:** el JSDoc de `dentroDeTolerancia` exige que ambos números sean finitos. Además, `|Infinity − Infinity|` es `NaN`, y `NaN ≤ tolerancia` es `false` (comprobado en Node). X3 (`tiempoDuplicacion(0) === Infinity`) saldría siempre como FALLA.
- **Solución:** en `dentroDeTolerancia`, devolver `true` si `Object.is(obtenido, esperado)` **antes** de exigir valores finitos, y actualizar su JSDoc. Coordinar con Gianni que el motor devuelva `Infinity` (no `NaN`) cuando r = 0.

### A-08 · X5 puede ocultar un PENDIENTE 🟠

- **Evidencia:** el `TODO` sugiere que `calcular` devuelva 1 si `simular()` lanza. Si `calcular` captura **cualquier** error, también captura el `NoImplementadoError` del stub, y el caso sale como FALLA en vez de PENDIENTE.
- **Solución:** relanzar todo lo que no sea `RangeError`:
  ```js
  calcular: (m) => { try { m.simular({ P, r: R, M: 0, t: 0 }); return 0; } catch (e) { if (e instanceof RangeError) return 1; throw e; } }
  ```

### A-09 · Tarjetas que ignoran el aporte mensual 🟠

- **Evidencia:** `tiempoDuplicacion` y `tasaParaDuplicar` son del escenario **sin aportes** (Etapa 2, respuestas 1 y 3). Al mover el slider de `M`, esas tarjetas no cambian y la persona puede creer que es un error.
- **Solución:** Logan escribe `resultados.duplicacion.nota` y `resultados.tasaRequerida.nota` en `content.js` aclarando «Escenario sin aportes: no depende del aporte mensual». Camilo evalúa agregar «(sin aportes)» en el título de la tarjeta.

### A-10 · `aria-live` sobre toda la sección de resultados 🟠

- **Evidencia:** `index.html`, `<section id="resultados" … aria-live="polite">`. Con cada movimiento del slider, un lector de pantalla volvería a leer las 4 tarjetas.
- **Solución:** quitar `aria-live` de la sección y agregar un `<p class="visualmente-oculto" aria-live="polite">` con un resumen breve (ej.: «Monto final: $9.411.123»), actualizado con *debounce* de unos 500 ms cuando el slider se detiene.

### A-11 · Chart.js sin SRI 🟠

- **Evidencia:** `index.html` carga `chart.js@4.4.1` desde jsDelivr con `crossorigin` pero sin `integrity` (ya hay un `TODO`).
- **Solución:** copiar el hash SHA-384 oficial desde la página del paquete en jsDelivr y agregarlo como `integrity="sha384-…"`. No inventar el hash.

### A-12 · Sin integración continua 🟠 · ✅

- **Solución aplicada:** `.github/workflows/pruebas.yml` corre `npm test` en cada PR y push a `dev` y `main`, y es un check requerido para mergear. Solo es útil de verdad cuando se cierre A-06.

### A-13 · GitHub Pages no activado 🟠

- **Solución:** cuando `main` tenga la primera versión funcional, activar *Settings → Pages → Deploy from a branch → `main` / `(root)`* y agregar el enlace al README (A-19).

### A-14 · Detalles de formato con `Intl` 🟡

Comprobado en Node 22 con `es-CL`:

| Llamada | Resultado |
|---|---|
| `currency CLP` sin opciones | `$1.647.009` ✔ |
| `currency CLP` con solo `maximumFractionDigits: 2` | `$1.647.009,5` ✘ (falta `minimumFractionDigits: 2`) |
| `percent` con 2 decimales | `13,94%` (sin espacio; el JSDoc dice `13,94 %`) |

- **Solución:** en `formatearCLP(valor, decimales)`, pasar `minimumFractionDigits` y `maximumFractionDigits` iguales a `decimales`. Decidir si se acepta `13,94%` (y corregir el JSDoc) o se inserta un espacio no separable. Lo importante es ser consistente.

### A-15 · Tabla mensual de 481 filas 🟡

- **Solución:** que la vista **anual** sea la predeterminada en la tabla, o paginar la vista mensual. El gráfico ya muestra el detalle mensual.

### A-16 · Slider de capital 🟡

- **Evidencia:** el rango va de 0 a 100.000.000 con paso 10.000, es decir, 10.000 posiciones, y es difícil de manejar con el mouse o el teclado. Los lectores de pantalla leen «1000000» sin formato.
- **Solución:** agregar `aria-valuetext` con el monto formateado. Para el paso, discutir en un PR `chore/contracts-*` si el slider usa un paso mayor que el input numérico.

### A-17 · Colores del gráfico y tema 🟡

- **Solución:** en `chartManager`, escuchar `matchMedia('(prefers-color-scheme: dark)').addEventListener('change', …)`, volver a leer las variables CSS y llamar a `grafico.update('none')`.

### A-18 · Citas APA 🟡

- **Evidencia:** el README §9 lista Levin (2022), Lippman (2022a) y Olivier (2022b), pero el texto del README no las cita. En la Etapa 2 se escribe «Lippman, 2022» y «Olivier, 2022», y cada autor tiene **dos** obras de 2022.
- **Solución:** citar cada referencia en el texto del README (por ejemplo, en §3.1, §3.2 y §3.4) y usar siempre las letras a/b. Mantener `content.js` sincronizado con README §9.

### A-19 · `TODO` del README 🟡 · 🟨 Parcial

- **Hecho (PR #2):** se agregaron la carrera (Ingeniería en Informática), la asignatura (MVFM01) y la docente (Giselle Mora Ocares), tomados de la portada de la presentación.
- **Falta:** confirmar la institución y agregar el enlace a GitHub Pages (A-13).

### A-20 · Orden del repositorio 🟡

- **Solución:**
  - Renombrar con `git mv` los archivos de `docs/` sin el sufijo ` (1)`.
  - Acordar una licencia y agregar `LICENSE` (el README sugiere MIT).
  - Borrar la rama ya integrada con `git push origin --delete chore/scaffolding`.

### A-21 · Correos en commits públicos 🟡 (opcional)

- **Evidencia:** el repositorio es público y los commits muestran correos institucionales.
- **Solución (hacia adelante):** cada integrante activa *GitHub → Settings → Emails → Keep my email addresses private* y usa `git config user.email "<id>+<login>@users.noreply.github.com"`. No se recomienda reescribir el historial.

### A-22 · Contenido vacío en `content.js` 🟡

- **Evidencia (script de cruce HTML ↔ `content.js`):**
  - Textos vacíos: `contexto.descripcion`, `parametros.{P,r,M,t}.ayuda`, `resultados.{montoFinal,duplicacion,tasaRequerida}.nota`, `modelos.{sinAportes,conAportes,duplicacion}.descripcion`, `grafico.descripcion`, `grafico.geogebra.instrucciones` y `sitio.pie`.
  - Listas vacías: `contexto.datos`, `modelos.*.formulas`, `supuestos.lista` y `referencias.lista`.
  - Además, `obtenerTexto()` devuelve siempre `undefined`.
- Todas las claves `data-content` del HTML existen en `content.js`. `grafico.ejeX`, `ejeY` y `serie*` no se usan en el HTML porque llegan a `chartManager` a través de `CONTENIDO.grafico`, así que es correcto.

### A-23 · Motor matemático sin implementar (ruta crítica) 🟠

- **Evidencia:** las 14 funciones de `js/mathEngine.js` lanzan `NoImplementadoError`. Mientras eso siga así, todos los casos de Maximiliano quedan en PENDIENTE y Camilo no puede mostrar resultados.
- **Solución:** PR pequeños en el orden de §5 (Gianni), empezando por los que desbloquean más casos.

## 5. Tareas por integrante (en orden de prioridad)

Cada integrante trabaja su lista **de arriba hacia abajo**. Cuando termina una tarea, la marca en el **mismo PR** en que la entrega: cambia `- [ ]` por `- [x]` y agrega al final `✅ AAAA-MM-DD · PR #N`. GitHub muestra esas casillas como ✔. Si la tarea cierra un hallazgo, también se actualiza su estado en §3.

| Prioridad | Significado |
|---|---|
| **P1** | Hacer primero: bloquea a otra persona o vence pronto |
| **P2** | Hacer cuando estén listas tus P1 |
| **P3** | Cierre: hacer cuando estén listas tus P1 y P2 |

**Dependencias entre personas:**
- Max acepta la invitación y Gianni entrega el PR 1 del motor, lo que desbloquea a Max y a Camilo.
- Camilo implementa `renderizarContenido()` y Logan `obtenerTexto()`, y con eso aparecen los textos en la página.
- Todo se integra en `dev` y luego se entrega `v1.0.0` en `main`.

### Gianni Antonietti · motor matemático (`feat/math-engine`)

Su trabajo desbloquea a todos: conviene que abra el **primer PR lo antes posible**. Reglas del motor: funciones puras, sin DOM, **sin redondear** y tasas en decimal.

- [ ] **P1** · Crear su rama `feat/math-engine` (CONTRIBUTING §1).
- [ ] **P1** · **PR 1, sin aportes** (A-23):
  - `tasaMensual`, `mesesTotales` y `saldoSinAportes`.
  - `montoFinalSinAportes`, reutilizando `saldoSinAportes(P, r, 12 * t)`.
  - Pasan a OK los casos A1–A4, D1 y E1–E5.
- [ ] **P1** · **PR 2, logaritmos** (A-23):
  - `tiempoDuplicacion` con `Math.log1p(r / 12)`. Con r = 0 debe dar `Infinity`, nunca `NaN`.
  - `regla72`.
  - `tasaParaDuplicar`, que lanza `RangeError` si t ≤ 0.
  - Pasan a OK los casos B1–B5 y C1–C3.
- [ ] **P2** · **PR 3, con aportes** (A-23):
  - `siguienteSaldo` y `serieSaldos`.
  - `valorFuturoAportes`, **con el caso i = 0 → M·n**. Sin ese caso la fórmula da `NaN`.
  - `montoFinalConAportes`.
  - Pasan a OK los casos D2–D4.
- [ ] **P2** · **PR 4, API** (A-23):
  - `validarParametros`: `Number.isFinite`, rangos de `LIMITES`, `Number.isInteger(t)`, y mensajes que nombren el parámetro.
  - `simular` y `resumenAnual`.
  - Pasan a OK los casos D5, D6 y el grupo X.
- [ ] **P2** · Acordar con Maximiliano el comportamiento en los casos borde (A-07, A-08).
- [ ] **P2** · Revisar el PR de `validator.js` de Maximiliano (CONTRIBUTING §3).
- [ ] **P3** · Preparar el **video de la semana 5** (bitácora de la Etapa 2):
  - Usar los números reales del producto.
  - Decir correctamente la frase de los $6.000.000 (A-05).
  - Usar la presentación corregida (A-04, con Logan).

### Maximiliano Montoya · validación y QA (`feat/validation-qa`)

- [ ] **P1** · **Aceptar la invitación al repositorio** (A-01). Sin esto no puede hacer push. Vence a los 7 días de enviada (2026-11-16).
- [ ] **P1** · Crear su rama `feat/validation-qa` (CONTRIBUTING §1).
- [ ] **P1** · Implementar `dentroDeTolerancia` (aceptando `Infinity === Infinity`, A-07), `ejecutarCaso`, `ejecutarTodos` e `imprimirReporte`.
- [ ] **P1** · Hacer que `tests/run.js` salga con código 1 ante un error real (A-06).
- [ ] **P2** · Agregar los casos X1–X7 en `tests/validationCases.js`, relanzando lo que no sea `RangeError` (A-08).
- [ ] **P2** · Implementar `renderizarReporte` y los estilos de `tests/test.html` por estado.
- [ ] **P2** · Revisar los PR de Gianni.
- [ ] **P3** · Con Camilo, verificar ambas curvas en GeoGebra (caso D).

### Camilo Sepúlveda · interfaz, gráfico e integración (`feat/ui-charts`)

Puede empezar **ya** con HTML y CSS. Conecta `simular()` cuando el motor esté en `dev`.

- [ ] **P1** · Crear su rama `feat/ui-charts` (CONTRIBUTING §1).
- [ ] **P1** · `styles.css`: tokens, layout, componentes, utilidades y responsive.
- [ ] **P1** · `uiController.js`:
  - `renderizarContenido` (desbloquea los textos de Logan) y `mostrarError`.
  - Los formateadores (A-14).
  - `inicializarUI`, `leerParametros` y `establecerParametros`.
- [ ] **P2** · `main.js`: `iniciar`, `recalcular`, `renderizarFilas` y `alCambiarModoTabla` (cuando `simular()` esté en `dev`).
- [ ] **P2** · `chartManager.js`: `crearGrafico` y `actualizarGrafico`, con colores que respondan al tema (A-17) y el SRI de Chart.js (A-11).
- [ ] **P2** · `renderizarTabla` y `renderizarResumen`, con la vista anual por defecto (A-15).
- [ ] **P2** · Accesibilidad: anuncio con `aria-live` acotado (A-10) y `aria-valuetext` en los sliders (A-16).
- [ ] **P2** · Revisar los PR de Logan.
- [ ] **P3** · `generarComandosGeoGebra` y verificación de curvas con Maximiliano.
- [ ] **P3** · Etiquetar «(sin aportes)» las tarjetas de duplicación y tasa (A-09, con Logan).

### Logan Silva · documentación y contenidos (`feat/docs-content`)

- [x] **P1** · Crear `dev`, proteger `main` y `dev`, configurar `CODEOWNERS` en pares y el CI (A-02, A-03, A-12). ✅ 2026-11-20 · PR #2
- [ ] **P1** · Crear su rama `feat/docs-content` (CONTRIBUTING §1).
- [ ] **P1** · Confirmar que Maximiliano aceptó la invitación y reenviarla si venció (A-01).
- [ ] **P1** · Implementar `obtenerTexto()` en `content.js` (A-22).
- [ ] **P1** · Avisar al equipo de la frase correcta de los $6.000.000 para el video y la defensa (A-05).
- [ ] **P2** · Rehacer con Gianni las diapositivas 3–8 y 11 de la presentación (A-04).
- [ ] **P2** · Completar los textos de `content.js` (A-22):
  - Contexto, ayudas de parámetros y notas de las tarjetas (A-09).
  - Modelos, supuestos y referencias.
- [ ] **P2** · Corregir las citas APA en el README (A-18).
- [ ] **P2** · Revisar los PR de Camilo.
- [ ] **P3** · Renombrar los archivos de `docs/`, agregar `LICENSE` y borrar la rama `chore/scaffolding` (A-20).
- [ ] **P3** · Activar GitHub Pages y completar la institución y el enlace en el README (A-13, A-19).

### Los 4

- [ ] **P1** · Leer `AUDITORIA.md` y `AGENTS.md`, o pedirle a su asistente de IA que los lea antes de trabajar.
- [ ] **P3** · Revisión cruzada final: cada uno ejecuta y explica el producto completo.
- [ ] **P3** · PR `dev → main`, etiqueta `v1.0.0` y publicación en GitHub Pages (CONTRIBUTING §6).
- [ ] Opcional · Usar el correo privado de GitHub en los commits (A-21).

## 6. Verificación matemática

Valores recalculados en Node 22 con las fórmulas del README §3. Todos los casos de la Etapa 2 coinciden dentro de la tolerancia («media unidad del último dígito informado»).

| Caso | Valor exacto | Esperado (Etapa 2) | Resultado |
|---|---|---|:---:|
| A1 · A(5) | 1.283.358,68 | 1.283.359 | ✔ |
| A2 · A(10) | 1.647.009,4977 | 1.647.009,50 | ✔ |
| A3 · A(15) | 2.113.703,93 | 2.113.704 | ✔ |
| A4 · A(20) | 2.712.640,29 | 2.712.640 | ✔ |
| B1 · t(3 %) | 23,134 años | 23,1 | ✔ |
| B2 · t(5 %) | 13,892 años | 13,9 | ✔ |
| B3 · Regla del 72 (5 %) | 14,4 años | 14,4 | ✔ |
| B4 · t(8 %) | 8,693 años | 8,7 | ✔ |
| B5 · t(10 %) | 6,960 años | 7,0 | ✔ (margen 0,01) |
| C1 · r para duplicar en 5 años | 0,139433 | 0,139 | ✔ (margen 0,00007) |
| C2 · i para duplicar en 5 años | 0,011619 | 0,0116 | ✔ |
| C3 · r para duplicar en 10 años | 0,069515 | 0,0695 | ✔ |
| D2 · S | 7.764.113,972 | 7.764.113,97 | ✔ |
| D3/D4 · total (cerrada = recurrencia) | 9.411.123,470 | 9.411.123,47 | ✔ |
| D6 · interés generado | 2.411.123,470 | 2.411.123,47 | ✔ |
| E1–E5 · C(1), C(2), C(3), C(6), C(12) | 1.004.166,67 · 1.008.350,69 · 1.012.552,16 · 1.025.261,87 · 1.051.161,90 | 1.004.167 · 1.008.351 · 1.012.552 · 1.025.262 · 1.051.162 | ✔ |

Otros datos de la Etapa 2 también verificados: los incrementos entre intervalos de 5 años (363.651 · 466.694 · 598.936) y la relación «más de tres veces» entre 23,1 y 7,0 años.

> C1 y B5 pasan con poco margen, pero de forma coherente con la regla de tolerancia. Si se quiere más rigor, se puede agregar un caso con más decimales (ej.: C1 → 0,1394 ± 0,00005).

## 7. Lo que está bien

- **Arquitectura:**
  - Solo `main.js` importa los demás módulos.
  - El motor no depende del navegador, así que se prueba igual en Node.
  - Solo la UI formatea y redondea.
  - Los textos llegan por `data-content` sin editar el HTML.
- **Contratos consistentes** (verificado con un script):
  - Cada `data-output` existe en `ResumenSimulacion`.
  - Los `min/max/step` del HTML coinciden con `LIMITES`, incluida la tasa ×100.
  - Todo lo que importa `main.js` existe.
- **Seguridad:** la regla de usar solo `textContent` (nunca `innerHTML`) evita XSS. Sin dependencias npm.
- **Accesibilidad base:** *skip link*, `noscript`, `caption` y `scope` en la tabla, `role="alert"` para errores, y `aria-describedby` en los controles.
- **Repositorio:** `.gitattributes` normaliza a LF y marca los binarios, `.editorconfig`, sin BOM ni CRLF, y una plantilla de PR.

## 8. Registro de cambios

| Fecha | Quién | Qué cambió | PR |
|---|---|---|---|
| 2026-11-20 | Logan Silva + Claude (Opus 5.5) | Auditoría inicial (A-01 a A-23). Se crea `dev` (rama por defecto), `CODEOWNERS` en pares, CI con `npm test`, protección de `main` y `dev`, instrucciones para asistentes de IA (`AGENTS.md`) y `AUDITORIA.md`. Se cierran A-02, A-03 y A-12; A-19 queda parcial. | #2 |
