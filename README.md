# Monk Mode · Anderson

PWA de una sola página: rutina de **6 días/semana mixta (gym + casa)** con
**HIIT al final de cada día**, registro de peso corporal y macros con déficit.
Sin dependencias, sin build. Funciona offline e instalable.

## Rutina (6 días · 4 semanas de progresión)
1. Piernas + HIIT
2. Pecho + tríceps + HIIT
3. Espalda + bíceps + HIIT
4. Femoral / glúteo + HIIT
5. Hombro + torso + HIIT
6. Full body + core + HIIT
7. Descanso (activo)

**Cada día trae dos versiones**: Casa (mancuernas, dominadas, abs, peso corporal) y
Gym (máquinas, barra, poleas). Un botón **Casa / Gym** arriba cambia entre ellas
(**Casa por defecto**). El circuito HIIT final (30/10) es el mismo en ambas.

## Pestañas
- **Rutina** — log de peso/reps por ejercicio + timer de intervalos.
- **Peso** — registro con gráfica de tendencia.
- **Comida** — calculadora de déficit (Mifflin-St Jeor, versión hombre) + macros.
- **Guía** — el "por qué" del plan.

## Estructura
`index.html` · `app.js` · `manifest.json` · `sw.js` · `icons/`

## Publicar en GitHub Pages
1. Repo nuevo → sube estos archivos a la raíz (o a `/docs`).
2. Settings → Pages → Source: `main` / raíz.
3. Abre la URL. En el móvil: "Añadir a pantalla de inicio".

## Personalizar
- Color del tema: `--accent` y `--accent-2` en el `<style>` de `index.html` (hoy azul).
- Al editar archivos, sube el número de `CACHE` en `sw.js` (v1 → v2).

## Datos (localStorage, prefijo `mm_a_`)
`mm_a_week`, `mm_a_day`, `mm_a_log_<semana>_<idEjercicio>`,
`mm_a_weight`, `mm_a_macro`, `mm_a_food_<fecha>`, `mm_a_mode` (casa/gym)
