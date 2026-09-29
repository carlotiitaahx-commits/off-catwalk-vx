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

Su objetivo es mostrar cómo utilicé la IA para definir la idea, diseñar la aplicación, preparar instrucciones de programación, generar código, realizar modificaciones y gestionar la publicación del proyecto.

También recoge las decisiones que tomé personalmente, las pruebas funcionales realizadas, las dificultades encontradas y los aprendizajes adquiridos.

Durante el desarrollo utilicé dos herramientas principales:

- **ChatGPT:** para definir el proyecto, concretar las funcionalidades, diseñar la identidad visual, preparar los prompts y estructurar la documentación.
- **v0:** como agente de IA para generar el código de la aplicación e implementar las modificaciones solicitadas.

Mi función consistió en dirigir el proceso, tomar las decisiones sobre el producto, proporcionar instrucciones a las herramientas y comprobar los resultados obtenidos.

---

## 2. Sesión 1 — Definición de la idea

**Herramienta:** ChatGPT.

**Objetivo:** seleccionar una idea de MVP para el trabajo final del curso de IA Generativa.

### Prompts utilizados

**Prompt 1:**

"Hola chat, que tal si empezamos a crear este proyecto"

**Prompt 2:**

"me gustaria hacerlo de fashion event planner"

**Prompt 3:**

"okey vamos a hacerlo"

### Proceso

Tras explorar diferentes propuestas relacionadas con el marketing y la moda, elegí desarrollar una aplicación para organizar eventos de moda.

Con ayuda de ChatGPT, definí el problema que quería resolver: la dispersión de la información durante la planificación de un evento, como las listas de invitados, los presupuestos, las tareas y los cronogramas.

Decidí orientar el proyecto a agencias de comunicación, marcas de moda y profesionales de las relaciones públicas y la organización de eventos.

La propuesta consistía en reunir las principales herramientas de planificación en una única aplicación web.

### Resultado

Definición del concepto inicial de Fashion Event Planner y de sus seis secciones principales:

1. Dashboard.
2. Event Details.
3. Guest List.
4. Task Manager.
5. Budget Control.
6. Event Timeline.

### Decisión personal

Elegí desarrollar una aplicación de gestión de eventos de moda por su relación con mis intereses profesionales y por la posibilidad de crear una herramienta con utilidad práctica.

---

## 3. Sesión 2 — Identidad visual y funcionalidades

**Herramienta:** ChatGPT.

**Objetivo:** definir la identidad visual y la estructura de la aplicación.

### Prompt utilizado

"Elijo el estilo Luxury Editorial. Vamos a continuar con el proyecto."

### Proceso

Seleccioné una estética Luxury Editorial inspirada en las revistas de moda y en la comunicación visual de las firmas de lujo.

Definimos una identidad visual con las siguientes características:

- Paleta de colores basada en negro, blanco, marfil y taupe.
- Tipografías serif de estilo editorial para los títulos.
- Tipografías sans serif para los textos y la navegación.
- Diseño minimalista, elegante y profesional.
- Espacios amplios, bordes finos y una jerarquía visual clara.
- Interfaz adaptable a ordenadores, tabletas y dispositivos móviles.

También concretamos las funcionalidades de las seis secciones:

**Dashboard:** resumen del evento con indicadores de invitados, tareas, presupuesto y próximas actividades.

**Event Details:** información general del evento, como nombre, marca, fecha, ubicación, descripción y presupuesto.

**Guest List:** gestión de invitados, categorías, estados de confirmación, búsquedas y filtros.

**Task Manager:** creación y seguimiento de tareas, responsables, prioridades y fechas límite.

**Budget Control:** registro de gastos y cálculo del presupuesto disponible.

**Event Timeline:** organización cronológica de las actividades del evento.

### Resultado

Una propuesta de diseño y una estructura funcional definidas para el MVP.

### Decisión personal

Prioricé una interfaz elegante y profesional, con navegación sencilla, indicadores visuales y una identidad coherente con el sector de la moda.

---

## 4. Sesión 3 — Generación del MVP

**Herramientas:** ChatGPT y v0.

**Objetivo:** desarrollar la primera versión funcional de la aplicación.

### Prompt utilizado en ChatGPT

"vale ya la tengo abierta que hago"

Con ayuda de ChatGPT, preparé un prompt detallado en inglés para introducirlo en v0. La instrucción incluía tanto los requisitos técnicos como las funcionalidades y la identidad visual de la aplicación.

### Prompt principal preparado para v0

```text
Build a fully functional, responsive web application called "Fashion Event Planner", a luxury editorial event management platform for fashion PR agencies, fashion brands and event professionals.

VISUAL IDENTITY

The design must look like a sophisticated luxury fashion editorial, inspired by high-end fashion magazines.

- Minimalist, elegant and professional.
- Color palette: black (#171717), white (#FFFFFF), ivory (#F5F3EF), taupe (#B5A18B).
- Large editorial serif typography for headings and clean sans-serif typography for navigation and body text.
- Generous whitespace, fine borders, elegant cards and subtle animations.
- Avoid generic SaaS styling, bright colors, gradients and rounded colorful buttons.
- Fully responsive for desktop, tablet and mobile.
- All interface text must be in English.

TECHNOLOGY

Use Next.js, React, TypeScript and Tailwind CSS.
Use shadcn/ui components and Lucide icons where appropriate.
Use localStorage to persist user data between browser sessions.
No authentication, external database or paid APIs are required for this MVP.

CORE FUNCTIONALITY

1. EVENT CREATION

Allow users to create an event with its name, brand, event type, date, location, description and total budget.
Allow editing existing event details.
Provide a demo event called "FW26 Collection Launch" with sample data.
All data must be editable and persist in localStorage.

2. DASHBOARD

Create a luxury editorial dashboard with:
- A prominent event title and date.
- Total guests and confirmed guests.
- Total budget, expenses and remaining budget.
- Completed and pending tasks.
- A dynamic event progress bar based on completed tasks.
- Upcoming activities from the event timeline.

All statistics must be calculated from actual application data, not hardcoded values.

3. GUEST LIST

Create a functional guest management section.
Users must be able to add, edit and delete guests.
Each guest has a name, email, category (Influencer, Press, VIP, Celebrity or Other), invitation status (Pending, Invited, Confirmed or Declined) and optional notes.
Include search and filtering by category and invitation status.
Update dashboard statistics automatically when guest data changes.

4. TASK MANAGER

Users must be able to add, edit and delete tasks.
Each task has a title, description, assigned person, deadline, priority and status.
Allow users to mark tasks as completed.
Automatically update the dashboard progress bar.

5. BUDGET CONTROL

Users must be able to add, edit and delete expenses.
Each expense has a description, category, amount and optional notes.
Show total budget, total expenses and remaining budget.
Calculate all totals dynamically and format currency in euros.

6. EVENT TIMELINE

Users must be able to create, edit and delete timeline activities.
Each activity has a title, start time, end time, location and description.
Display activities chronologically.

NAVIGATION

Create an elegant sidebar with Dashboard, Event Details, Guest List, Tasks, Budget and Timeline.
Use the Fashion Event Planner name as the main brand identity.

IMPORTANT REQUIREMENTS

This must be a working application, not just a static UI mockup.
Every add, edit, delete, search and filter interaction must work.
All relevant data must persist after refreshing the browser.
Use accessible forms, validation and clear empty states.
Keep the code modular and easy to understand.
Do not add fake AI functionality or buttons that do nothing.
Prioritize reliability, functionality and excellent visual design over unnecessary complexity.

Start by implementing the complete MVP with the demo event and functional navigation.
```

### Resultado comunicado por v0

El agente generó la primera versión de la aplicación con las seis páginas solicitadas y un evento de demostración denominado FW26 Collection Launch.

También informó de que había implementado formularios funcionales, búsquedas, filtros, estadísticas dinámicas y persistencia de datos mediante localStorage.

v0 comunicó que había realizado sus propias comprobaciones sobre diferentes funcionalidades. Posteriormente, realicé pruebas manuales para verificar su funcionamiento.

### Decisión técnica

Elegí desarrollar una primera versión con almacenamiento local, sin cuentas de usuario ni base de datos externa, para mantener el alcance del proyecto dentro del tiempo disponible.

El uso de localStorage permite conservar la información entre sesiones del navegador sin necesidad de configurar un servidor.

Su principal limitación es que los datos se almacenan en cada navegador y no se sincronizan automáticamente entre distintos usuarios o dispositivos.

---

## 5. Sesión 4 — Pruebas funcionales

**Herramientas:** ChatGPT y navegador web.

**Objetivo:** comprobar que las funcionalidades generadas por v0 funcionaban correctamente.

### Pruebas realizadas

**Prueba 1. Gestión de invitados**

Añadí una invitada llamada Anna Martínez, le asigné la categoría Influencer y cambié su estado de asistencia a Confirmed.

**Prueba 2. Actualización del Dashboard**

Comprobé que, al confirmar la asistencia de la invitada, el Dashboard actualizaba automáticamente las estadísticas correspondientes.

**Prueba 3. Gestión de tareas**

Creé una tarea, la marqué como completada y comprobé que se actualizaba el porcentaje de progreso del evento.

**Prueba 4. Control presupuestario**

Registré un gasto de 1.500 euros correspondiente al catering y comprobé que la aplicación actualizaba el presupuesto restante.

**Prueba 5. Persistencia de datos**

Actualicé la página del navegador y comprobé que los datos introducidos se conservaban.

### Prompt de seguimiento en ChatGPT

"He completado las cinco pruebas del Fashion Event Planner. Vamos al siguiente paso."

### Resultado

Completé las cinco pruebas propuestas y confirmé su funcionamiento.

### Aprendizaje

Comprendí que la respuesta de un agente de IA no sustituye la comprobación manual. Es necesario interactuar con la aplicación para verificar que las funcionalidades se comportan como se esperaba.

---

## 6. Sesión 5 — Cambio de identidad a OFF-CATWALK

**Herramientas:** ChatGPT y v0.

**Objetivo:** sustituir el nombre provisional por una identidad de marca definitiva.

### Prompt utilizado en ChatGPT

"le vamos a poner este nombre OFF-CATWALK"

### Prompt completo enviado a v0

```text
Rename the entire application from Fashion Event Planner to OFF-CATWALK. Update the sidebar branding, page titles, browser tab title, metadata and all visible references to the previous name. Keep the existing Luxury Editorial design, functionality, data and navigation exactly as they are. Use OFF-CATWALK as the main brand name and 'Behind every great fashion event.' as the brand tagline. Do not modify or remove any existing features.
```

### Resultado comunicado por v0

El agente actualizó el nombre de la aplicación en la barra lateral, la cabecera móvil, los títulos del navegador y los metadatos.

También incorporó el eslogan "Behind every great fashion event." a la identidad de marca.

v0 informó de que había conservado la clave original de localStorage para evitar que los datos previamente guardados se perdieran durante el cambio de nombre.

### Decisión personal

Elegí OFF-CATWALK como nombre definitivo y decidí conservar el diseño y las funcionalidades ya desarrolladas.

El prompt especificaba que únicamente debían modificarse los elementos relacionados con la identidad de marca, sin eliminar ni alterar las funciones existentes.

---

## 7. Sesión 6 — Publicación en Vercel

**Herramientas:** v0 y Vercel.

**Objetivo:** publicar el MVP y obtener una dirección web para que otras personas pudieran probarlo.

### Proceso

Utilicé la opción Publish de v0 para publicar la aplicación.

Configuré su visibilidad para permitir el acceso mediante enlace y utilicé el dominio off-catwalk.vercel.app.

### Resultado

Vercel mostró el estado Ready y confirmó que el despliegue se había completado.

**Aplicación publicada:**

https://off-catwalk.vercel.app

### Decisión personal

Elegí publicar la aplicación para facilitar su evaluación y disponer de una versión accesible durante la presentación final.

---

## 8. Sesión 7 — Conexión con GitHub

**Herramientas:** ChatGPT, GitHub y v0.

**Objetivo:** disponer de un repositorio con el código fuente del proyecto.

### Dificultad encontrada

Inicialmente creé manualmente un repositorio llamado OFF-CATWALK, pero este permaneció vacío.

Durante la conexión entre v0 y GitHub surgieron dudas porque el repositorio que había creado manualmente no mostraba los archivos de la aplicación.

### Proceso de comprobación

Revisé la configuración de GitHub y el menú de la rama main en v0.

Al abrir el enlace asociado a la rama, descubrí que v0 había creado otro repositorio denominado off-catwalk-vx.

Este sí contenía las carpetas y los archivos del proyecto, además del historial de cambios.

### Resultado

Identifiqué el repositorio correcto y comprobé visualmente que contenía el código fuente.

**Repositorio del proyecto:**

https://github.com/carlotiitaahx-commits/off-catwalk-vx

### Aprendizaje

Aprendí a diferenciar un repositorio vacío de uno que contiene el código de la aplicación y a comprobar qué repositorio está vinculado al proyecto.

Esta dificultad también me permitió comprender mejor la relación entre el entorno de desarrollo, el repositorio de código y la aplicación publicada.

---

## 9. Sesión 8 — Documentación del proyecto

**Herramientas:** ChatGPT y GitHub.

**Objetivo:** preparar la documentación obligatoria para la entrega.

### Prompts utilizados en ChatGPT

**Prompt 1:**

"Vamos a preparar el README.md de OFF-CATWALK paso a paso."

**Prompt 2:**

"perfecto dimelo"

### Proceso

Utilicé ChatGPT para estructurar el archivo README.md, incluyendo:

- El problema que resuelve OFF-CATWALK.
- El público objetivo.
- Las funcionalidades de la aplicación.
- Las tecnologías utilizadas.
- Las instrucciones de instalación y ejecución local.
- El enlace a la aplicación publicada.
- Las limitaciones del MVP y las posibles mejoras futuras.

Después incorporé el README.md al repositorio de GitHub.

También preparé el presente PROMPT-LOG.md a partir de las sesiones de trabajo, los prompts utilizados y los resultados obtenidos.

Por último, elaboré un informe de reflexión sobre el proceso de desarrollo, diferenciando las tareas realizadas por la IA de mis decisiones y comprobaciones personales.

### Resultado

Preparación de la documentación necesaria para facilitar la revisión del proyecto y explicar su proceso de desarrollo.

---

## 10. Conclusiones del proceso

El desarrollo de OFF-CATWALK me ha permitido utilizar la inteligencia artificial como herramienta de apoyo a la creación de un producto digital.

ChatGPT me ayudó a estructurar la idea, definir las funcionalidades, preparar instrucciones y organizar la documentación.

v0 generó el código inicial de la aplicación y realizó las modificaciones solicitadas.

Mi participación consistió en elegir el concepto, definir la identidad visual, decidir las funcionalidades, proporcionar instrucciones a los agentes, probar la aplicación, revisar los resultados y gestionar su publicación.

Una de las principales conclusiones del proyecto es que utilizar IA para programar no consiste únicamente en generar código. También requiere definir objetivos, comunicar requisitos claros, verificar resultados y tomar decisiones durante el proceso.

El proyecto me ha permitido experimentar con un flujo de trabajo en el que la IA facilita el desarrollo técnico, mientras que las decisiones sobre el producto y la evaluación de los resultados siguen siendo responsabilidad de la persona que dirige el proyecto.

---

## 11. Posibles mejoras futuras

Aunque OFF-CATWALK cumple el alcance establecido para este MVP, en futuras versiones podrían incorporarse nuevas funcionalidades:

- Un asistente de IA para generar propuestas de planificación de eventos.
- Cuentas de usuario y un sistema de autenticación.
- Una base de datos para sincronizar información entre dispositivos.
- Herramientas de colaboración entre diferentes miembros de un equipo.
- Exportación de listas de invitados, presupuestos y cronogramas.

Estas funcionalidades no forman parte de la versión actual, pero permitirían ampliar la aplicación para un uso profesional con varios usuarios.
