# Guía de contribución: flujo de trabajo Git

Cuatro personas trabajan en paralelo **sobre la misma rama `dev`, con push directo**. No se pisan porque **cada una es dueña exclusiva de sus archivos** (ver [README §5](README.md#5-equipo-y-responsabilidades)).

Los comandos funcionan igual en Git Bash, PowerShell, macOS y Linux.

## Modelo de ramas

```text
main  ← solo versiones estables (entregas). Se actualiza desde dev al cerrar una entrega (§6).
 └── dev  ← rama de trabajo diaria y rama por defecto. Los 4 hacen push directo aquí.
```

| Integrante | Archivos (dueño exclusivo) | Ámbito de commit |
|---|---|---|
| Gianni Antonietti | `js/mathEngine.js` | `math` |
| Camilo Sepúlveda | `index.html`, `css/`, `js/uiController.js`, `js/chartManager.js`, `js/main.js` | `ui`, `chart` |
| Maximiliano Montoya | `js/validator.js`, `tests/`, `package.json` | `qa` |
| Logan Silva | `README.md`, `CONTRIBUTING.md`, `js/content.js`, `docs/` | `docs`, `content` |
| Los 4 | `js/contracts.js`, `.github/`, `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, configuración | `contracts`, `repo` |

`AUDITORIA.md` lo actualizan todos en el commit de su propio cambio (§8).

> **Decisión del equipo (2026-11-20):** `main` y `dev` **no tienen protección** en GitHub, para que cada uno pueda hacer push directo sin PR ni aprobaciones ([AUDITORIA.md · A-24](AUDITORIA.md)). Por eso las [reglas de oro](#reglas-de-oro) son la única protección del repositorio: respétalas siempre.

---

## 1. Configuración inicial (una sola vez)

```bash
git clone https://github.com/LSJ-tech/crecer_con_numeros.git
cd crecer_con_numeros
git config user.name  "Tu Nombre"
git config user.email "tu-correo-de-github"
git config pull.rebase true         # así "git pull" siempre trae los cambios sin crear commits de merge
git switch dev                      # rama por defecto; si ya estás en dev, no hace nada
```

> Si ya tenías el repositorio clonado de antes: `git fetch origin` y luego `git switch dev`.

## 2. Ciclo diario

```bash
git switch dev
git pull --rebase origin dev        # SIEMPRE al empezar: trae lo que subieron los demás

# … tomar tu siguiente tarea de AUDITORIA.md §5 (P1 → P2 → P3) …
# … trabajar SOLO en tus archivos …
# … actualizar AUDITORIA.md: marcar [x] la tarea, cerrar hallazgos y agregar una línea al Registro …

npm test                            # o abrir /tests/test.html con el servidor local
git status                          # revisar qué cambió
git add js/mathEngine.js AUDITORIA.md   # agregar archivos por nombre, no "git add ."
git commit -m "feat(math): implementar valorFuturoAportes con caso borde i = 0"

git pull --rebase origin dev        # justo antes de subir, por si alguien subió algo mientras trabajabas
git push origin dev
```

**Por qué `--rebase`:** pone tus commits encima de los que subieron los demás. Así el historial queda en línea recta, sin un commit «Merge branch dev» cada vez que alguien sube.

**Si `git push` es rechazado** (`rejected … fetch first`): alguien subió antes que tú. Repite `git pull --rebase origin dev` y vuelve a hacer push. **Nunca** uses `--force`.

### Convención de mensajes (Conventional Commits)

`<tipo>(<ámbito>): <descripción en minúscula y en presente>`

| Tipo | Uso | Ámbitos |
|---|---|---|
| `feat` | Funcionalidad nueva | `math`, `ui`, `chart`, `qa`, `content` |
| `fix` | Corrección de un error | ídem |
| `test` | Casos o ejecutor de pruebas | `qa` |
| `docs` | README, CONTRIBUTING, AUDITORIA, JSDoc | `docs` |
| `style` | CSS o formato sin cambiar lógica | `ui` |
| `refactor` | Reestructurar sin cambiar comportamiento | cualquiera |
| `chore` | Configuración, contratos, mantenimiento | `repo`, `contracts` |

Ejemplos: `feat(chart): dibujar curvas sin aportes y con aportes`, `test(qa): agregar casos borde con tasa 0 %`, `docs(content): agregar referencias APA`.

## 3. Revisión y CI

Como no hay PR obligatorio, **la revisión es posterior**. Cada integrante revisa en GitHub los commits de la persona que le toca, al menos una vez por semana o cuando le avisen que subieron algo importante. Para ver los cambios de alguien: pestaña *Commits* de la rama `dev`, o `git log --author="Nombre" -p origin/dev`.

### Quién revisa

| Revisa | Los cambios de | Qué mira |
|---|---|---|
| Maximiliano | Gianni (`mathEngine.js`) | Casos A–E en OK, fórmulas iguales a las del README |
| Gianni | Maximiliano (`validator.js`, `tests/`) | Que los casos llamen bien a las funciones del motor |
| Camilo | Logan (`content.js`, documentación) | Que las claves de `content.js` coincidan con los `data-content` del HTML |
| Logan | Camilo (interfaz y gráfico) | Textos, accesibilidad y que los resultados coincidan con los casos |

Los comentarios se dejan en el commit en GitHub (botón de comentario en cada línea) o por el grupo del equipo.

- **CI:** GitHub Actions corre `npm test` en cada push a `dev` y `main`, y marca ✔ o ✘ junto al commit. No bloquea el push: **si ves ✘ en tu commit, arréglalo antes de seguir con otra cosa.**
- **PR opcional:** si un cambio es grande o riesgoso, puedes subirlo a una rama propia y abrir un PR hacia `dev` para que te revisen antes. [`CODEOWNERS`](.github/CODEOWNERS) pide la revisión automáticamente al dueño y al revisor de cada archivo.

## 4. Orden de integración sugerido

1. **Gianni** sube pronto una entrega pequeña (ej.: `tasaMensual`, `saldoSinAportes`, `montoFinalSinAportes`), porque desbloquea a todos.
2. **Maximiliano** sube `validator.js`, y los casos pasan de PENDIENTE a OK a medida que avanza el motor.
3. **Logan** sube `content.js`, y los textos aparecen sin tocar el HTML.
4. **Camilo** puede maquetar HTML y CSS desde el día 1, y conectar `simular()` apenas esté en `dev`.

Prefiere **commits pequeños y frecuentes** (1–3 funciones) a un commit gigante al final.

## 5. Cambiar un contrato (excepcional)

`js/contracts.js` y la firma de las funciones exportadas son el acuerdo entre los 4. Si necesitas cambiarlos, **no lo subas directo**: avisa al grupo y abre un PR para que todos vean el cambio.

```bash
git switch dev && git pull --rebase origin dev
git switch -c chore/contracts-<cambio>
# editar js/contracts.js (y solo lo mínimo)
git add js/contracts.js
git commit -m "chore(contracts): agregar campo <x> a ResumenSimulacion"
git push -u origin chore/contracts-<cambio>
# PR a dev → esperar el OK de los 4 → merge → todos hacen "git pull --rebase origin dev"
```

Si necesitas un cambio en un archivo **de otra persona**, pídeselo o abre un *Issue*. No lo edites tú.

## 6. Entrega: `dev` → `main`

Requisitos: `npm test` sin FALLA ni ERROR, curvas verificadas con GeoGebra, README actualizado y **los 4 de acuerdo**.

```bash
git fetch origin
git switch main
git pull --rebase origin main
git merge --no-ff origin/dev -m "release: v1.0.0 entrega final"
git push origin main
git tag -a v1.0.0 -m "Crecer con números v1.0.0"
git push origin v1.0.0
git switch dev
```

GitHub Pages publica automáticamente desde `main` (ver README §6).

## 7. Si aparece un conflicto

Con archivos exclusivos es raro, pero puede pasar durante `git pull --rebase`:

```bash
git status                          # lista los archivos en conflicto
# Abrir cada archivo, elegir el contenido correcto y borrar los marcadores <<<<<<< ======= >>>>>>>
git add <archivo-resuelto>
git rebase --continue
git push origin dev
```

- **Conflicto típico en `AUDITORIA.md`:** dos personas agregaron una línea al Registro al mismo tiempo. Conserva **ambas** líneas.
- **Conflicto en un archivo de otra persona:** conserva su versión y avísale.
- **Si te equivocaste a mitad del rebase:** `git rebase --abort` y vuelves al estado anterior.

## 8. Documentación viva y asistentes de IA

- **[`AUDITORIA.md`](AUDITORIA.md)** es la fuente del estado del proyecto: hallazgos, tareas por integrante y prioridad, y registro de cambios. Todos lo actualizan **en el mismo commit** de su cambio:
  - Marcan con `[x]` sus tareas terminadas y agregan la fecha.
  - Cierran o agregan hallazgos.
  - Dejan una línea en el Registro.
- **README:** si tu cambio modifica un comportamiento, un contrato, un comando o la Hoja de ruta, actualízalo en el mismo commit. El dueño (Logan) lo revisa después.
- **Asistentes de IA** (Claude, Copilot, ChatGPT, Gemini, Cursor…): las reglas están en [`AGENTS.md`](AGENTS.md).
  - Claude Code y Gemini lo cargan solos gracias a `CLAUDE.md` y `GEMINI.md`.
  - Copilot usa `.github/copilot-instructions.md`.
  - Con otro asistente, pídele explícitamente que lea `AGENTS.md` antes de trabajar.

## Reglas de oro

1. Trabaja en `dev`. `main` solo se toca al cerrar una entrega (§6).
2. Edita solo tus archivos, más `AUDITORIA.md` y la Hoja de ruta del README. Usa `git add <archivo>`, no `git add .`.
3. `git pull --rebase origin dev` al empezar y justo antes de cada push.
4. `npm test` antes de cada push. Si el CI marca ✘ en tu commit, arréglalo primero.
5. **Nunca** `git push --force` ni `--force-with-lease` en `dev` o `main`: sin protección, borraría el trabajo de los demás.
6. Commits pequeños y frecuentes, con el mensaje según la convención.
7. Cada commit deja `AUDITORIA.md` al día: tus tareas marcadas, los hallazgos actualizados y una línea en el Registro.
