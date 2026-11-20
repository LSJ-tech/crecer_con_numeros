<!-- Los PR son opcionales: el flujo normal es push directo a dev y nadie tiene que aprobar (CONTRIBUTING §2 y §3).
     Úsalos solo si quieres mostrarle un cambio al equipo antes de integrarlo. -->

## Qué cambia

<!-- Una o dos frases. Ej.: "Implementa tiempoDuplicacion() y regla72(); los casos B1–B5 pasan a OK." -->

## Autor y ámbito

- [ ] Gianni Antonietti (`math`)
- [ ] Camilo Sepúlveda (`ui`, `chart`)
- [ ] Maximiliano Montoya (`qa`)
- [ ] Logan Silva (`docs`, `content`)
- [ ] Cambio compartido (`contracts`, `repo`): avisé al grupo antes

## Hallazgos de la auditoría

<!-- IDs de AUDITORIA.md que este PR cierra o agrega. Ej.: "Cierra A-06, A-07. Agrega A-24." Si no aplica: "Ninguno". -->

## Checklist

- [ ] El PR apunta a **`dev`** (no a `main`, salvo una entrega).
- [ ] Solo modifiqué archivos de los que soy responsable (`git diff --name-only origin/dev...HEAD`), más `AUDITORIA.md` y las casillas de la Hoja de ruta del README.
- [ ] Sincronicé con `origin/dev` justo antes de abrir el PR.
- [ ] `tests/test.html` o `npm test` no muestra casos en **FALLA** ni **ERROR**.
- [ ] Actualicé **`AUDITORIA.md`**: hallazgos cerrados con fecha, tareas marcadas con `[x]`, hallazgos nuevos y una línea en el Registro.
- [ ] Si cambié una firma, un comportamiento o un texto visible, actualicé el JSDoc y el README.
- [ ] Sin `console.log` de depuración ni código comentado sobrante.

## Evidencia

<!-- Captura de pantalla de la UI, del reporte de validación o de la comparación con GeoGebra. -->
