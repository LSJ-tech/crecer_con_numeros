# Instrucciones para asistentes de IA · Crecer con números

Este archivo es para cualquier asistente de IA que trabaje en este repositorio (Claude, Copilot, ChatGPT, Gemini, Cursor, Codex u otro). Cuatro personas trabajan en paralelo sobre la misma rama `dev`, cada una con su propio asistente. Estas reglas evitan que se pisen y mantienen la documentación al día.

**Responde y escribe siempre en español de Chile.**

## 1. Antes de cualquier cambio

1. **Identifica para qué integrante trabajas** con `git config user.name`. Si no queda claro, **pregúntale a tu humano**.
2. **Lee estos archivos:**
   - [`AUDITORIA.md`](AUDITORIA.md): hallazgos abiertos y tareas por prioridad.
   - [`README.md`](README.md): modelo, arquitectura y contratos.
   - [`CONTRIBUTING.md`](CONTRIBUTING.md): flujo Git.
3. **Sincroniza:** `git switch dev` y luego `git pull --rebase origin dev`.
4. **Elige la tarea:** toma la siguiente sin marcar de su lista en `AUDITORIA.md` §5, en orden **P1 → P2 → P3**. Si depende de otra persona que aún no termina, propone la siguiente que esté disponible.

## 2. Quién es dueño de qué

Todos trabajan en la rama **`dev`**. Cada integrante edita solo sus archivos:

| Integrante | Login GitHub | Ámbito de commit | Archivos que puede editar |
|---|---|---|---|
| Gianni Antonietti | `gntonietti89-code` | `math` | `js/mathEngine.js` |
| Camilo Sepúlveda | `digicamilo-lgtm` | `ui`, `chart` | `index.html`, `css/`, `js/uiController.js`, `js/chartManager.js`, `js/main.js` |
| Maximiliano Montoya | `true-max-02` | `qa` | `js/validator.js`, `tests/`, `package.json` |
| Logan Silva | `LSJ-tech` | `docs`, `content` | `README.md`, `CONTRIBUTING.md`, `js/content.js`, `docs/` |
| Los 4 | — | `contracts`, `repo` | `js/contracts.js`, `.github/`, `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, configuración |

**Archivos que todos actualizan** (en el commit de su propio cambio): `AUDITORIA.md` y las casillas de la Hoja de ruta (README §8).

## 3. Reglas obligatorias

- **Push directo solo a `dev`.** Es la decisión del equipo y las ramas no tienen protección (`AUDITORIA.md` · A-24). **No hagas push a `main`:** solo se actualiza al cerrar una entrega, con el acuerdo de los 4 (CONTRIBUTING §6).
- **Haz commit y push solo cuando tu humano lo pida.**
- **Sin protección, la disciplina es la única defensa:**
  - Edita **solo** los archivos del integrante (tabla de §2). Si hace falta cambiar un archivo de otra persona, no lo toques: díselo a tu humano para que se lo pida.
  - `git pull --rebase origin dev` justo antes de cada push. Si el push es rechazado, vuelve a hacer `pull --rebase`.
  - **Nunca** `git push --force` ni `--force-with-lease`, ni reescribas commits ya subidos.
  - Si un conflicto aparece en un archivo de otra persona, conserva su versión. En el Registro de `AUDITORIA.md`, conserva ambas líneas.
- **`js/contracts.js` está congelado.** Nunca se sube directo: va en una rama `chore/contracts-*` con PR y el OK de los 4 (CONTRIBUTING §5).
- **Arquitectura** (README §4.2):
  - Solo `main.js` importa los demás módulos.
  - `mathEngine.js` son funciones puras, sin DOM y sin redondear.
  - Solo `uiController.js` convierte unidades y formatea.
  - Texto siempre con `textContent`, nunca con `innerHTML`.
  - `content.js` contiene solo datos.
- **Sin dependencias nuevas:** nada de npm, bundlers ni frameworks. Solo ES Modules y Chart.js 4.4.1 desde el CDN.
- **Commits:** `git add <archivo>` (nunca `git add .`), con [Conventional Commits](CONTRIBUTING.md#convención-de-mensajes-conventional-commits) en español.
- **Nunca** te saltes hooks.
- **No inventes nada:** ni datos, ni citas, ni hashes SRI, ni resultados de pruebas. Si no puedes verificar algo, dilo.

## 4. Mantener la documentación viva (en CADA commit)

En el **mismo commit** del cambio:

1. **`AUDITORIA.md`:**
   - Cambia el estado de los hallazgos que cierras (`✅ Resuelto · AAAA-MM-DD`).
   - Marca con `- [x]` las tareas completadas del integrante en §5 y agrega `✅ AAAA-MM-DD`. Marca solo las del integrante para el que trabajas.
   - Agrega los hallazgos nuevos con el siguiente ID libre, con evidencia (archivo y línea) y solución.
   - Agrega una línea al Registro (§8): fecha · persona + IA usada · qué cambió.
2. **`README.md`:** actualízalo si cambia un comportamiento, un contrato (datos o DOM), un comando, la estructura de carpetas o la Hoja de ruta (§8). Si el README no es del integrante, limita el cambio a lo que tu commit afecta; el dueño lo revisa después.
3. **JSDoc:** al día en cada función que modifiques.
4. **Referencias:** `content.js` y README §9 deben decir lo mismo.
5. **Cambios que afectan a otra persona** (ej.: una firma nueva): díselo a tu humano para que avise al equipo.

No borres hallazgos ni renumeres IDs.

## 5. Antes de hacer push

- `npm test`: sin casos en **FALLA** ni **ERROR**. PENDIENTE está permitido mientras existan stubs.
- `git diff --cached --name-only`: solo archivos del integrante, más `AUDITORIA.md` y la Hoja de ruta del README.
- `AUDITORIA.md` actualizado según §4.
- `git pull --rebase origin dev` y después `git push origin dev`.
- **Después del push:** revisa que el CI quede en ✔ (pestaña *Actions*, o `gh run list --branch dev --limit 1`). Si queda en ✘, arréglalo antes de seguir.

## 6. Comandos útiles

```bash
git grep -n "TODO: \[Gianni"            # tareas pendientes en el código (o Camilo, Maximiliano, Logan)
git log --oneline -10 origin/dev        # últimos cambios del equipo
python -m http.server 8000              # servidor local → http://localhost:8000 (los ES Modules no funcionan con file://)
npm test                                # validación en la terminal (Node ≥ 18)
```
