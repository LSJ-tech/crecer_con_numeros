# Guía de contribución: flujo de trabajo Git

Cuatro personas trabajan en paralelo sin pisarse porque **cada una es dueña exclusiva de sus archivos** (ver [README §5](README.md#5-equipo-y-responsabilidades)) y todo se integra en `dev` mediante Pull Requests.

Los comandos funcionan igual en Git Bash, PowerShell, macOS y Linux.

## Modelo de ramas

```text
main  ← solo versiones estables (entregas). Nadie hace commit directo.
 └── dev  ← integración. Nadie hace commit directo. Destino de todos los PR.
      ├── feat/math-engine     Gianni Antonietti     js/mathEngine.js
      ├── feat/ui-charts       Camilo Sepúlveda      index.html, css/, js/uiController.js, js/chartManager.js, js/main.js
      ├── feat/validation-qa   Maximiliano Montoya   js/validator.js, tests/, package.json
      └── feat/docs-content    Logan Silva           README.md, CONTRIBUTING.md, js/content.js, docs/
```

Las cuatro ramas `feat/*` son **de larga duración**: cada integrante trabaja siempre en la suya y la sincroniza con `dev` después de cada merge.

---

## 0. Preparación del repositorio (una sola vez, la persona que tiene el andamiaje)

> ✅ **Hecho el 2026-11-20** (PR #1 y PR #2).
> - `dev` existe y es la rama por defecto.
> - `main` y `dev` están protegidas: PR, 1 aprobación, revisión de Code Owners, check `npm test` obligatorio, sin excepciones para administradores, sin force-push.
> - `CODEOWNERS` tiene los logins reales.
>
> Esta sección queda como referencia. Cada integrante empieza en el **§1**.

```bash
# Subir el andamiaje a main mediante un PR
git switch -c chore/scaffolding
git add .
git commit -m "chore: andamiaje inicial (arquitectura, contratos, stubs y documentación)"
git push -u origin chore/scaffolding
# GitHub → Pull request: base = main ← compare = chore/scaffolding → Merge

# Crear dev a partir de main
git switch main
git pull origin main
git switch -c dev
git push -u origin dev
git branch -d chore/scaffolding
```

**El dueño del repositorio (`LSJ-tech`)** configura en GitHub:

1. *Settings → Branches → Add rule* para `main` y para `dev`:
   - ✅ Require a pull request before merging (1 aprobación).
   - ✅ Require review from Code Owners (después de completar `.github/CODEOWNERS`).
   - ✅ Do not allow bypassing the above settings.
2. *Settings → General → Default branch* → `dev` (así los PR apuntan a `dev` por defecto).
3. *Settings → Collaborators* → invitar a los 4 integrantes con permiso **Write**.

## 1. Configuración inicial de cada integrante (una sola vez)

```bash
git clone https://github.com/LSJ-tech/crecer_con_numeros.git
cd crecer_con_numeros
git config user.name  "Tu Nombre"
git config user.email "tu-correo-de-github"

git fetch origin
git switch dev                      # crea dev local siguiendo a origin/dev
git switch -c <tu-rama>             # ver tabla
git push -u origin <tu-rama>
```

| Integrante | Comandos |
|---|---|
| Gianni | `git switch -c feat/math-engine` → `git push -u origin feat/math-engine` |
| Camilo | `git switch -c feat/ui-charts` → `git push -u origin feat/ui-charts` |
| Maximiliano | `git switch -c feat/validation-qa` → `git push -u origin feat/validation-qa` |
| Logan | `git switch -c feat/docs-content` → `git push -u origin feat/docs-content` |

> Si tu rama ya existe en GitHub (la creó otra persona): `git switch <tu-rama>` la descarga y la deja siguiendo a `origin/<tu-rama>`.

## 2. Ciclo diario

```bash
git switch <tu-rama>
git fetch origin
git merge origin/dev                # SIEMPRE al empezar: trae lo que ya integraron los demás

# … tomar tu siguiente tarea de AUDITORIA.md §5 (P1 → P2 → P3) …
# … trabajar SOLO en tus archivos …
# … actualizar AUDITORIA.md: marcar [x] la tarea, cerrar hallazgos y agregar una línea al Registro …

git status                          # revisar qué cambió
git add js/mathEngine.js AUDITORIA.md   # agregar archivos por nombre, no "git add ."
git commit -m "feat(math): implementar valorFuturoAportes con caso borde i = 0"
git push
```

### Convención de mensajes (Conventional Commits)

`<tipo>(<ámbito>): <descripción en minúscula y en presente>`

| Tipo | Uso | Ámbitos |
|---|---|---|
| `feat` | Funcionalidad nueva | `math`, `ui`, `chart`, `qa`, `content` |
| `fix` | Corrección de un error | ídem |
| `test` | Casos o ejecutor de pruebas | `qa` |
| `docs` | README, CONTRIBUTING, JSDoc | `docs` |
| `style` | CSS o formato sin cambiar lógica | `ui` |
| `refactor` | Reestructurar sin cambiar comportamiento | cualquiera |
| `chore` | Configuración, contratos, mantenimiento | `repo`, `contracts` |

Ejemplos: `feat(chart): dibujar curvas sin aportes y con aportes`, `test(qa): agregar casos borde con tasa 0 %`, `docs(content): agregar referencias APA`.

## 3. Pull Request a `dev`

```bash
# 1. Sincronizar justo antes de abrir el PR
git fetch origin
git merge origin/dev
git push

# 2. Confirmar que SOLO tocaste tus archivos
git diff --name-only origin/dev...HEAD

# 3. Validar
npm test                            # o abrir /tests/test.html con el servidor local
```

**Crear el PR** en GitHub: botón *Compare & pull request* → **base: `dev`** ← compare: `<tu-rama>`. Completar la plantilla.

Con GitHub CLI (opcional):

```bash
gh pr create --base dev --head feat/math-engine --title "feat(math): duplicación y Regla del 72" --fill
```

### Quién revisa

| PR de | Revisa | Qué mira |
|---|---|---|
| `feat/math-engine` | Maximiliano | Casos A–E en OK, fórmulas iguales a las del README |
| `feat/validation-qa` | Gianni | Que los casos llamen bien a las funciones del motor |
| `feat/docs-content` | Camilo | Que las claves de `content.js` coincidan con los `data-content` del HTML |
| `feat/ui-charts` | Logan | Textos, accesibilidad y que los resultados coincidan con los casos |

[`CODEOWNERS`](.github/CODEOWNERS) aplica esta tabla automáticamente. Cada archivo tiene **dueño + revisor**, porque GitHub no cuenta la aprobación del propio autor. Si un archivo tuviera un solo dueño, sus PR quedarían bloqueados. Para mergear hace falta **1 aprobación de un code owner** y el check **`npm test`** en verde.

**Tipo de merge:** *Create a merge commit* (no *Squash*), porque las ramas `feat/*` siguen vivas.

**Después de cada merge, todos:**

```bash
git switch <tu-rama>
git fetch origin
git merge origin/dev
git push
```

## 4. Orden de integración sugerido

1. **Gianni** abre PR temprano y pequeño (ej.: `tasaMensual`, `saldoSinAportes`, `montoFinalSinAportes`); desbloquea a todos.
2. **Maximiliano** integra `validator.js`: los casos pasan de PENDIENTE a OK a medida que avanza el motor.
3. **Logan** integra `content.js`: los textos aparecen sin tocar el HTML.
4. **Camilo** puede maquetar HTML/CSS desde el día 1 y conectar `simular()` apenas esté en `dev`.

Prefiere **PR pequeños y frecuentes** (1–3 funciones) a un PR gigante al final.

## 5. Cambiar un contrato (excepcional)

`js/contracts.js` y la firma de las funciones exportadas son el acuerdo entre los 4. Si necesitas cambiarlos:

```bash
git fetch origin
git switch -c chore/contracts-<cambio> origin/dev
# editar js/contracts.js (y solo lo mínimo)
git add js/contracts.js
git commit -m "chore(contracts): agregar campo <x> a ResumenSimulacion"
git push -u origin chore/contracts-<cambio>
# PR a dev → necesita la aprobación de los 4 → merge → todos hacen "git merge origin/dev"
```

> **Ojo:** GitHub solo puede exigir **una** aprobación de un code owner. La regla de que aprueben los 4 es un **acuerdo del equipo**: quien abre el PR espera las 4 aprobaciones antes de mergear, aunque GitHub ya habilite el botón.

Si necesitas un cambio en un archivo **de otra persona**, abre un *Issue* o pídeselo; no lo edites en tu rama.

## 6. Entrega: `dev` → `main`

Requisitos: `npm test` sin FALLA/ERROR, curvas verificadas con GeoGebra y README actualizado.

```bash
gh pr create --base main --head dev --title "release: v1.0.0 entrega final" --fill
# después del merge en GitHub:
git fetch origin
git switch main
git merge origin/main
git tag -a v1.0.0 -m "Crecer con números v1.0.0"
git push origin v1.0.0
```

GitHub Pages publica automáticamente desde `main` (ver README §6).

## 7. Si aparece un conflicto

Con archivos exclusivos es raro, pero puede ocurrir al sincronizar:

```bash
git fetch origin
git merge origin/dev
git status                          # lista los archivos en conflicto
# Abrir cada archivo, elegir el contenido correcto y borrar los marcadores <<<<<<< ======= >>>>>>>
git add <archivo-resuelto>
git commit                          # cierra el merge
git push
```

Si te equivocaste a mitad del merge: `git merge --abort` y vuelves al estado anterior.

## 8. Documentación viva y asistentes de IA

- **[`AUDITORIA.md`](AUDITORIA.md)** es la fuente del estado del proyecto: hallazgos, tareas por integrante y prioridad, y registro de cambios. Todos lo actualizan **en el mismo PR** de su cambio:
  - Marcan con `[x]` sus tareas terminadas, con fecha y PR.
  - Cierran o agregan hallazgos.
  - Dejan una línea en el Registro.
- **README:** si tu cambio modifica un comportamiento, un contrato, un comando o la Hoja de ruta, actualízalo en el mismo PR. El dueño (Logan) lo revisa.
- **Asistentes de IA** (Claude, Copilot, ChatGPT, Gemini, Cursor…): las reglas están en [`AGENTS.md`](AGENTS.md).
  - Claude Code y Gemini lo cargan solos gracias a `CLAUDE.md` y `GEMINI.md`.
  - Copilot usa `.github/copilot-instructions.md`.
  - Con otro asistente, pídele explícitamente que lea `AGENTS.md` antes de trabajar.

## Reglas de oro

1. Nunca hacer commit directo en `main` ni en `dev`.
2. Editar solo tus archivos (más `AUDITORIA.md` y la Hoja de ruta del README). Usar `git add <archivo>`, no `git add .`.
3. `git fetch origin && git merge origin/dev` al empezar cada sesión y antes de cada PR.
4. PR pequeños, con la plantilla completa y las pruebas en verde.
5. Nunca `git push --force` en ramas compartidas. Si de verdad lo necesitas en tu propia rama: `git push --force-with-lease`.
6. Cada PR deja `AUDITORIA.md` al día: tus tareas marcadas, los hallazgos actualizados y una línea en el Registro.
