# Instrucciones para GitHub Copilot · Crecer con números

Las reglas completas están en [`AGENTS.md`](../AGENTS.md), en la raíz del repositorio. **Léelo antes de proponer cambios.** Resumen:

- Responde en español de Chile.
- Identifica para qué integrante trabajas (rama actual) y edita **solo sus archivos** (`AGENTS.md` §2). `js/contracts.js` está congelado.
- Nunca commit directo a `main` ni `dev`. Trabaja en la rama `feat/*` y abre un PR hacia `dev`.
- Toma las tareas del integrante en [`AUDITORIA.md`](../AUDITORIA.md) §5 en orden **P1 → P2 → P3**.
- En **cada PR**, actualiza `AUDITORIA.md`:
  - Estado de los hallazgos que cierras.
  - Tareas completadas marcadas con `[x]` + `✅ AAAA-MM-DD · PR #N`.
  - Hallazgos nuevos.
  - Una línea en el Registro.
- Actualiza también el `README.md` si cambia un comportamiento, un contrato o la Hoja de ruta.
- `mathEngine.js` son funciones puras sin redondeo. Solo `uiController.js` formatea. Texto con `textContent`, nunca `innerHTML`. Sin dependencias npm.
- Corre `npm test` antes del PR y no inventes datos, citas ni hashes.
