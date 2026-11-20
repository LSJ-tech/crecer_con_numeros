# Instrucciones para GitHub Copilot · Crecer con números

Las reglas completas están en [`AGENTS.md`](../AGENTS.md), en la raíz del repositorio. **Léelo antes de proponer cambios.** Resumen:

- Responde en español de Chile.
- Identifica para qué integrante trabajas (`git config user.name`) y edita **solo sus archivos** (`AGENTS.md` §2). `js/contracts.js` está congelado.
- Todos trabajan en `dev` con push directo, y las ramas no tienen protección. Por eso:
  - Corre `git pull --rebase origin dev` antes de cada push.
  - **Nunca** uses `--force`.
  - **Nunca** hagas push a `main`.
- Toma las tareas del integrante en [`AUDITORIA.md`](../AUDITORIA.md) §5 en orden **P1 → P2 → P3**.
- En **cada commit**, actualiza `AUDITORIA.md`:
  - Estado de los hallazgos que cierras.
  - Tareas completadas marcadas con `[x]` + `✅ AAAA-MM-DD`.
  - Hallazgos nuevos.
  - Una línea en el Registro.
- Actualiza también el `README.md` si cambia un comportamiento, un contrato o la Hoja de ruta.
- `mathEngine.js` son funciones puras sin redondeo. Solo `uiController.js` formatea. Texto con `textContent`, nunca `innerHTML`. Sin dependencias npm.
- Corre `npm test` antes del push, revisa que el CI quede en ✔ y no inventes datos, citas ni hashes.
