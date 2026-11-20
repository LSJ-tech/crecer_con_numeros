# Instrucciones para asistentes de IA · Crecer con números

Este archivo es para cualquier asistente de IA que trabaje en este repositorio (Claude, Copilot, ChatGPT, Gemini, Cursor, Codex u otro). Cuatro personas trabajan en paralelo y cada una usa su propio asistente. Estas reglas evitan que se pisen y mantienen la documentación al día.

**Responde y escribe siempre en español de Chile.**

## 1. Antes de cualquier cambio

1. **Identifica para qué integrante trabajas.** Revisa la rama actual (`git branch --show-current`) y `git config user.name`. Si no queda claro, **pregúntale a tu humano**.
2. **Lee estos archivos:**
   - [`AUDITORIA.md`](AUDITORIA.md): hallazgos abiertos y tareas por prioridad.
   - [`README.md`](README.md): modelo, arquitectura y contratos.
   - [`CONTRIBUTING.md`](CONTRIBUTING.md): flujo Git.
3. **Sincroniza la rama del integrante:** `git fetch origin` y luego `git merge origin/dev`.
4. **Elige la tarea:** toma la siguiente sin marcar de su lista en `AUDITORIA.md` §5, en orden **P1 → P2 → P3**. Si depende de otra persona que aún no termina, propone la siguiente que esté disponible.

## 2. Quién es dueño de qué

| Integrante | Login GitHub | Rama | Archivos que puede editar |
|---|---|---|---|
| Gianni Antonietti | `gntonietti89-code` | `feat/math-engine` | `js/mathEngine.js` |
| Camilo Sepúlveda | `digicamilo-lgtm` | `feat/ui-charts` | `index.html`, `css/`, `js/uiController.js`, `js/chartManager.js`, `js/main.js` |
| Maximiliano Montoya | `true-max-02` | `feat/validation-qa` | `js/validator.js`, `tests/`, `package.json` |
| Logan Silva | `LSJ-tech` | `feat/docs-content` | `README.md`, `CONTRIBUTING.md`, `js/content.js`, `docs/` |
| Los 4 | — | `chore/*` | `js/contracts.js`, `.github/`, `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, configuración |

**Archivos que todos actualizan** (en el PR de su propio cambio): `AUDITORIA.md` y las casillas de la Hoja de ruta (README §8).

## 3. Reglas obligatorias

- **Nunca commit ni push directo a `main` o `dev`** (están protegidas). Trabaja en la rama `feat/*` del integrante y abre un PR hacia `dev`.
- **Haz commit y push solo cuando tu humano lo pida.**
- **Edita solo los archivos del integrante** (tabla de §2). Si hace falta cambiar un archivo de otra persona, no lo toques: propón el cambio en la descripción del PR o en un Issue.
- **`js/contracts.js` está congelado.** Solo se cambia en una rama `chore/contracts-*` con el acuerdo de los 4 (CONTRIBUTING §5).
- **Arquitectura** (README §4.2):
  - Solo `main.js` importa los demás módulos.
  - `mathEngine.js` son funciones puras, sin DOM y sin redondear.
  - Solo `uiController.js` convierte unidades y formatea.
  - Texto siempre con `textContent`, nunca con `innerHTML`.
  - `content.js` contiene solo datos.
- **Sin dependencias nuevas:** nada de npm, bundlers ni frameworks. Solo ES Modules y Chart.js 4.4.1 desde el CDN.
- **Commits:** `git add <archivo>` (nunca `git add .`), con [Conventional Commits](CONTRIBUTING.md#convención-de-mensajes-conventional-commits) en español.
- **Nunca** `git push --force` en ramas compartidas, ni saltarse hooks.
- **No inventes nada:** ni datos, ni citas, ni hashes SRI, ni resultados de pruebas. Si no puedes verificar algo, dilo.

## 4. Mantener la documentación viva (en CADA PR)

En el **mismo PR** del cambio:

1. **`AUDITORIA.md`:**
   - Cambia el estado de los hallazgos que cierras (`✅ Resuelto · AAAA-MM-DD · PR #N`).
   - Marca con `- [x]` las tareas completadas del integrante en §5 y agrega `✅ AAAA-MM-DD · PR #N`. Marca solo las del integrante para el que trabajas.
   - Agrega los hallazgos nuevos con el siguiente ID libre, con evidencia (archivo y línea) y solución.
   - Agrega una línea al Registro (§8): fecha · persona + IA usada · qué cambió · PR.
2. **`README.md`:** actualízalo si cambia un comportamiento, un contrato (datos o DOM), un comando, la estructura de carpetas o la Hoja de ruta (§8). Si el README no es del integrante, limita el cambio a lo que tu PR afecta; el dueño lo revisa.
3. **JSDoc:** al día en cada función que modifiques.
4. **Referencias:** `content.js` y README §9 deben decir lo mismo.
5. **Cambios que afectan a otra persona** (ej.: una firma nueva): avísalo en la descripción del PR.

No borres hallazgos ni renumeres IDs.

## 5. Antes de abrir el PR

- `npm test`: sin casos en **FALLA** ni **ERROR**. PENDIENTE está permitido mientras existan stubs.
- `git diff --name-only origin/dev...HEAD`: solo archivos del integrante, más `AUDITORIA.md` y la Hoja de ruta del README.
- `AUDITORIA.md` actualizado según §4.
- Plantilla de PR completa, incluidos los **IDs de hallazgos** que cierra o agrega.
- PR hacia **`dev`**. Necesita la aprobación del revisor (CODEOWNERS) y el check `npm test` en verde.

## 6. Comandos útiles

```bash
git grep -n "TODO: \[Gianni"            # tareas pendientes en el código (o Camilo, Maximiliano, Logan)
python -m http.server 8000              # servidor local → http://localhost:8000 (los ES Modules no funcionan con file://)
npm test                                # validación en la terminal (Node ≥ 18)
```
