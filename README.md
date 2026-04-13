<p align="center"><br><img src="https://user-images.githubusercontent.com/236501/85893648-1c92e880-b7a8-11ea-926d-95355b8175c7.png" width="128" height="128" /></p>

# PRUEBA FRONT ACCENTURE V 0.1.1

Version Fork inicial sin funcionalidad.

## Version
-Esta version esta construida en la version ionic 7.2.1 actualizable a la version 8.

## Funcionalidad
Se ha creado una sencilla bases de datos en sqlite para almacenar una categoria y una tarea.

Estructura de categoria y una tarea planteada

Categoria
-id_categoria
-nombre
-dt_fecha_creacion
-dt_fecha_modificacion
-b_Activo

Tarea
-id_tarea
-nombre
-dt_fecha_creacion
-dt_fecha_modificacion
-bCheck
-b_Activo
-id_categoria

• Agregar nuevas tareas.
• Marcar tareas como completadas.
• Eliminar tareas.

La aplicación está construida con Ionic y Angular, y utiliza almacenamiento local para
guardar el estado de las tareas.
Añadir la capacidad de categorizar tareas. Los usuarios deben poder:
o Crear, editar y eliminar categorías.
o Asignar una categoría a cada tarea.
o Filtrar las tareas por categoría.

## comandos que usaron para que funcion el proyecto

El proyecto deberia funcionar simplemente dando npm install.

pero se tuvo instalar npm install --save @capacitor-community/sqlite
npm i @capacitor/splash-screen 
tutorial usado https://www.youtube.com/watch?v=BM70fDqUo3c
revisar documentación oficial