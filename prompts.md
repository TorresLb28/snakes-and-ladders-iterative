Crea cuatro archivos Markdown (.md) en la raíz del proyecto para definir los estándares de desarrollo:

1. `html-best-practices.md`:
   - Estructura semántica HTML5 (<header>, <main>, <section>, CSS Grid para tableros).
   - Accesibilidad (atributos ARIA, alt text, navegación básica por teclado).
   - Separación estricta de responsabilidades (sin estilos ni scripts inline).

2. `css-best-practices.md`:
   - Uso obligatorio de CSS Custom Properties (variables CSS) para tematización.
   - Nombres de clases limpios y descriptivos.
   - Diseño responsivo con Flexbox y CSS Grid.
   - Transiciones y animaciones fluidas para fichas y tiro de dados.

3. `js-best-practices.md`:
   - JavaScript ES6+ modular y limpio (Vanilla JS, sin librerías externas).
   - Programación Orientada a Objetos o modular para el juego (estado, dado, jugadores, tablero).
   - Manejo de eventos centralizado y funciones puras.
   - Nombramiento en camelCase y comentarios descriptivos.

4. `AGENTS.md`:
   - Definición del rol del agente como Senior Frontend Developer.
   - Referencia explícita a la ubicación y lectura obligatoria de:
     * `./html-best-practices.md`
     * `./css-best-practices.md`
     * `./js-best-practices.md`
   - Instrucciones de revisar y validar el código contra estos documentos antes de entregar.

## Arquitectura y Planificación del Juego
   [META ORIGINAL]
Diseñar e implementar el juego Serpientes y Escaleras en HTML, CSS y JavaScript Vanilla siguiendo los estándares definidos en AGENTS.md.

[OBJETIVO DE LA ITERACIÓN ACTUAL]
Diseñar la arquitectura técnica, la estructura de datos del tablero (100 casillas) y la lógica de juego antes de codificar.

[INSTRUCCIONES DE DISEÑO]
Por favor genera un documento de diseño claro que detalle:
1. Estrategia de Renderizado del Tablero: Mapeo de 100 casillas (matriz 10x10 en CSS Grid con dirección zigzag).
2. Estructura del Estado del Juego (State Management):
   - Posición de jugadores (Jugador 1 y Jugador 2 / Bot).
   - Mapeo de Serpientes (ej. { inicio: 98, fin: 78 }).
   - Mapeo de Escaleras (ej. { inicio: 4, fin: 14 }).
   - Estado del turno actual y valor del dado.
3. Componentes de la Interfaz: Tablero interactivo y panel lateral de control (botón lanzar dado, historial, indicador de turno).

## Implementación del Juego Base (Iteración 1)
[META ORIGINAL]
Implementar un juego completo de Serpientes y Escaleras en HTML5, CSS3 y JavaScript Vanilla.

[REFINAMIENTOS ANTERIORES]
- Definición de archivos de buenas prácticas y AGENTS.md.
- Planificación y arquitectura del estado del juego en modo PLAN.

[OBJETIVO DE LA ITERACIÓN ACTUAL - ITERACIÓN 1]
Generar el código fuente base (`index.html`, `styles.css`, `script.js`) completamente funcional.

[REQUISITOS FUNCIONALES]
1. Tablero de 100 casillas numeradas del 1 al 100 en formato zigzag.
2. Mínimo 5 serpientes y 5 escaleras visibles y funcionales.
3. Soporte para 2 jugadores (o 1 Jugador vs CPU).
4. Botón "Lanzar Dado" con animación e indicador numérico (1 a 6).
5. Movimiento automático de las fichas casilla por casilla al tirar el dado.
6. Detección automática de caída en serpiente (desciende) o escalera (asciende).
7. Condición de victoria al alcanzar exactamente la casilla 100.

[RESTRICCIONES TÉCNICAS]
- Aplica estrictamente las normas definidas en `AGENTS.md` y sus guías `.md` correspondientes.

## Mejora Visual con Referencia (Iteración 2)
[META ORIGINAL]
Implementar el juego Serpientes y Escaleras en HTML, CSS y JS con un acabado visual profesional.

[REFINAMIENTOS ANTERIORES]
- Iteración 0: Creación de guías de best practices y AGENTS.md.
- Iteración 1: Implementación de la lógica funcional base del juego.

[OBJETIVO DE LA ITERACIÓN ACTUAL - ITERACIÓN 2 (MEJORA VISUAL POR REFERENCIA)]
Rediseñar la interfaz de usuario (UI/UX) tomando como referencia la imagen adjunta.

[CAMBIOS Y MEJORAS REQUERIDAS]
1. Paleta de Colores y Estilo:
   - Ajustar los colores del tablero, tipografías y paneles de control según la estética de la imagen adjunta.
   - Aplicar sombras (box-shadow) y bordes redondeados a las casillas y contenedores.
2. Fichas y Animaciones:
   - Representar jugadores con avatares/fichas estilizadas y transiciones CSS al desplazarse.
3. Componente del Dado:
   - Reemplazar el dado numérico plano por una representación visual con puntos (dots) o estilo 3D animado.
4. Historial de Eventos:
   - Agregar un panel lateral que registre cada movimiento ("Jugador 1 subió por escalera a la casilla 14").

[RESTRICCIONES]
- Mantener intacta la lógica de juego funcional construida en la Iteración 1.
- Verificar cumplimiento con `css-best-practices.md`.

## Selección de 3 Escenarios/Temas (Iteración 3)
[META ORIGINAL]
Implementar el juego Serpientes y Escaleras en HTML, CSS y JS.

[REFINAMIENTOS ANTERIORES]
- Iteración 1: Lógica funcional base.
- Iteración 2: Mejora visual según imagen de referencia.

[OBJETIVO DE LA ITERACIÓN ACTUAL - ITERACIÓN 3 (SISTEMA DE ESCENARIOS/TEMAS)]
Implementar un selector que permita elegir entre 3 escenarios temáticos distintos.

[REQUISITOS DE LOS ESCENARIOS]
1. Escenario 1: "Clásico" (Tablero tradicional de mesa).
2. Escenario 2: "Selva / Jungla" (Tonos verdes/marrón, lianas y serpientes tropicales).
3. Escenario 3: "Espacio Cyberpunk" (Estilo neón/oscuro, portales de teletransporte y agujeros negros).

[REQUISITOS TÉCNICOS]
- Incluir un menú desplegable `<select>` o botones de selección en la interfaz.
- Implementar los cambios mediante variables CSS (`--bg-primary`, `--cell-color`, etc.) cambiando un atributo `data-theme` en `<body>`.
- Modificar visualmente los íconos/símbolos de serpientes y escaleras de acuerdo con el tema activo...