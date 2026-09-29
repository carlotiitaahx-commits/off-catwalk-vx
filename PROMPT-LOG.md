# PROMPT-LOG — OFF-CATWALK

## Memoria del proceso de desarrollo con inteligencia artificial

**Proyecto:** OFF-CATWALK  
**Eslogan:** Behind every great fashion event.  
**Tipo:** MVP de gestión de eventos de moda.  
**Herramientas de IA:** ChatGPT y v0.  
**Periodo documentado:** septiembre de 2026.

---

## 1. Objetivo del documento

Este documento recoge el proceso de creación de OFF-CATWALK mediante herramientas de inteligencia artificial generativa.

Su objetivo es mostrar cómo utilicé la IA para definir el proyecto, diseñar la aplicación, generar código, realizar modificaciones y preparar su publicación.

También recoge las decisiones que tomé personalmente, las pruebas realizadas y las dificultades encontradas.

## 2. Sesión 1 — Definición de la idea

**Herramienta:** ChatGPT.

**Objetivo:** seleccionar una idea de MVP para el trabajo final del curso de IA Generativa.

**Instrucción inicial:**

"Me gustaría hacerlo de Fashion Event Planner."

**Proceso:**

Tras explorar diferentes propuestas relacionadas con el marketing y la moda, elegí desarrollar una aplicación para organizar eventos de moda.

Con ayuda de ChatGPT, definí el problema que quería resolver: la dispersión de la información durante la planificación de eventos, como listas de invitados, presupuestos, tareas y cronogramas.

Decidí orientar el proyecto a agencias de comunicación, marcas de moda y profesionales de las relaciones públicas.

**Resultado:**

Definición del concepto inicial de Fashion Event Planner y de sus cinco áreas principales: Dashboard, Guest List, Task Manager, Budget Control y Event Timeline.

**Decisión personal:**

Elegí desarrollar una aplicación de gestión de eventos de moda por su relación con mis intereses profesionales y por la posibilidad de crear una herramienta con utilidad práctica.

---

## 3. Sesión 2 — Identidad visual y funcionalidades

**Herramienta:** ChatGPT.

**Objetivo:** definir la identidad visual y la estructura de la aplicación.

**Prompt utilizado:**

"Elijo el estilo Luxury Editorial. Vamos a continuar con el proyecto."

**Proceso:**

Seleccioné una estética Luxury Editorial inspirada en las revistas de moda y en la comunicación visual de las firmas de lujo.

Definimos una paleta de colores basada en negro, blanco, marfil y taupe, con tipografías serif para los títulos y sans serif para los textos.

También concretamos las seis secciones de la aplicación:

1. Dashboard.
2. Event Details.
3. Guest List.
4. Task Manager.
5. Budget Control.
6. Event Timeline.

**Resultado:**

Una propuesta de diseño y una estructura funcional para el MVP.

**Decisión personal:**

Prioricé una interfaz elegante y profesional, con navegación sencilla, indicadores visuales y un diseño adaptable a diferentes dispositivos.

---

## 4. Sesión 3 — Generación del MVP

**Herramienta:** v0.

**Objetivo:** desarrollar la primera versión funcional de la aplicación.

**Instrucciones principales:**

Se proporcionó a v0 un prompt detallado en inglés que comenzaba con:

"Build a fully functional, responsive web application called Fashion Event Planner, a luxury editorial event management platform for fashion PR agencies, fashion brands and event professionals."

El prompt incluía los siguientes requisitos:

- Estética Luxury Editorial.
- Paleta de colores negro, blanco, marfil y taupe.
- Desarrollo con Next.js, React, TypeScript y Tailwind CSS.
- Componentes shadcn/ui e iconos Lucide.
- Almacenamiento local mediante localStorage.
- Creación y edición de eventos.
- Dashboard con estadísticas dinámicas.
- Gestión de invitados, tareas, gastos y cronograma.
- Formularios funcionales con validación.
- Búsquedas y filtros.
- Diseño adaptable a dispositivos móviles.

Se especificó que la aplicación debía funcionar realmente y no ser únicamente una maqueta visual.

El prompt completo se conserva en el historial de conversación de v0.

**Resultado comunicado por v0:**

El agente generó las seis páginas solicitadas y un evento de demostración denominado FW26 Collection Launch.

También informó de que había realizado pruebas de formularios, persistencia de datos, búsqueda de invitados y actualización del progreso de tareas.

**Decisión personal:**

Elegí generar una primera versión completa con almacenamiento local, sin cuentas de usuario ni base de datos externa, para mantener el alcance del proyecto dentro del tiempo disponible.

---

## 5. Sesión 4 — Pruebas funcionales

**Herramientas:** ChatGPT y navegador web.

**Objetivo:** comprobar que las funcionalidades generadas por v0 funcionaban correctamente.

**Pruebas realizadas:**

1. Añadir una invitada, asignarle una categoría y confirmar su asistencia.
2. Comprobar que el Dashboard actualizaba las estadísticas de invitados.
3. Crear y completar una tarea y comprobar la actualización del progreso.
4. Registrar un gasto de 1.500 euros y comprobar el cálculo del presupuesto restante.
5. Actualizar el navegador y verificar que los datos introducidos se conservaban.

**Resultado:**

Completé las cinco pruebas propuestas y confirmé su funcionamiento.

**Aprendizaje:**

La respuesta del agente de IA no sustituye la comprobación manual. Es necesario interactuar con la aplicación para verificar que las funcionalidades se comportan como se esperaba.

---

## 6. Sesión 5 — Cambio de identidad a OFF-CATWALK

**Herramientas:** ChatGPT y v0.

**Objetivo:** sustituir el nombre provisional por una identidad de marca definitiva.

**Prompt enviado a v0:**

"Rename the entire application from Fashion Event Planner to OFF-CATWALK. Update the sidebar branding, page titles, browser tab title, metadata and all visible references to the previous name. Keep the existing Luxury Editorial design, functionality, data and navigation exactly as they are. Use OFF-CATWALK as the main brand name and 'Behind every great fashion event.' as the brand tagline. Do not modify or remove any existing features."

**Resultado comunicado por v0:**

El agente actualizó el nombre en la barra lateral, la cabecera móvil, los títulos del navegador y los metadatos.

También sustituyó el antiguo texto de marca por el nuevo eslogan.

El agente mantuvo la clave de localStorage para evitar que los datos previamente guardados se perdieran durante el cambio de nombre.

**Decisión personal:**

Elegí OFF-CATWALK como nombre definitivo y decidí conservar el diseño y las funcionalidades ya desarrolladas.

---

## 7. Sesión 6 — Publicación en Vercel

**Herramientas:** v0 y Vercel.

**Objetivo:** publicar el MVP y obtener una dirección web para que otras personas pudieran probarlo.

**Proceso:**

Utilicé la opción Publish de v0, configuré la visibilidad para permitir el acceso mediante enlace y publiqué la aplicación con el dominio off-catwalk.vercel.app.

**Resultado:**

Vercel mostró el estado Ready y confirmó que el despliegue se había completado.

**Enlace:**

https://off-catwalk.vercel.app

**Decisión personal:**

Elegí publicar la aplicación para facilitar su evaluación y realizar la demostración del MVP durante la presentación final.

---

## 8. Sesión 7 — Conexión con GitHub

**Herramientas:** ChatGPT, GitHub y v0.

**Objetivo:** disponer de un repositorio con el código fuente del proyecto.

**Dificultad encontrada:**

Inicialmente creé manualmente un repositorio llamado OFF-CATWALK, pero este permaneció vacío.

Durante la conexión entre v0 y GitHub surgieron dudas porque el repositorio que había creado manualmente no mostraba los archivos de la aplicación.

**Proceso de comprobación:**

Revisé la configuración de GitHub y el menú de la rama main en v0.

Al abrir el enlace asociado a la rama, descubrí que v0 había creado otro repositorio denominado off-catwalk-vx.

Este sí contenía las carpetas y los archivos del proyecto, además del historial de cambios.

**Resultado:**

Identifiqué el repositorio correcto y comprobé visualmente que contenía el código fuente.

**Repositorio:**

https://github.com/carlotiitaahx-commits/off-catwalk-vx

**Aprendizaje:**

Aprendí a diferenciar un repositorio vacío de uno que contiene el código de la aplicación y a comprobar qué repositorio está vinculado al proyecto.

---

## 9. Sesión 8 — Documentación

**Herramientas:** ChatGPT y GitHub.

**Objetivo:** preparar la documentación obligatoria para la entrega.

**Proceso:**

Utilicé ChatGPT para estructurar el README.md, incluyendo el problema que resuelve OFF-CATWALK, el público objetivo, las funcionalidades, las tecnologías utilizadas, las instrucciones de ejecución y el enlace a la aplicación publicada.

Después incorporé el archivo al repositorio de GitHub.

También preparé esta memoria del proceso de desarrollo con IA, diferenciando las decisiones personales, las instrucciones dadas a los agentes y los resultados obtenidos.

---

## 10. Conclusiones del proceso

El desarrollo de OFF-CATWALK me ha permitido utilizar la inteligencia artificial como herramienta de apoyo a la creación de un producto digital.

ChatGPT me ayudó a estructurar la idea, definir las funcionalidades, preparar instrucciones y organizar la documentación.

v0 generó el código inicial de la aplicación y realizó las modificaciones solicitadas.

Mi participación consistió en elegir el concepto, definir la identidad visual, decidir las funcionalidades, proporcionar instrucciones a los agentes, probar la aplicación, revisar los resultados y gestionar su publicación.

Una de las principales conclusiones del proyecto es que utilizar IA para programar no consiste únicamente en generar código. También requiere definir objetivos, comunicar requisitos claros, verificar resultados y tomar decisiones durante el proceso.

## 11. Posibles mejoras futuras

- Incorporar un asistente de IA para generar propuestas de planificación de eventos.
- Añadir cuentas de usuario.
- Implementar una base de datos para sincronizar información entre dispositivos.
- Permitir la colaboración entre diferentes miembros del equipo.
- Incorporar exportación de listas de invitados y presupuestos.
