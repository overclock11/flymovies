# FlyMovies

El proyecto está desarrollado con Angular 17 y tiene una libería personalizada llamada fly-movies-ux
https://www.npmjs.com/package/fly-movies-ux cuyo código se encuentra en la carpeta [projects](./projects) esta librería exporta
componentes, estilos y constantes que se reutilizan en el proyecto.


## Levantar proyecto en desarrollo

Levantar localmente el proyecto es muy sencillo solo se requieren dos pasos.

- En la carpeta raíz de proyecto ejecute `npm i`
- En la carpeta raíz de proyecto ejecute `ng serve`



## Levantar proyecto y librería en desarrollo

Los pasos para levantar el proyecto usando la librería en desarrollo con un link simbólico son.

- Navegue hasta la carpeta de la librería [./projects/fly-movies-ux](./projects/fly-movies-ux) y ejecute 'ng build fly-movies-ux'
- En la carpeta de la librería [./projects/fly-movies-ux](./projects/fly-movies-ux) ejecute `npm link`
- Elimine en los node_modules del proyecto principal la carpeta de la librería 'fli-movies-ux' y 
en la carpeta raíz ejecute del proyecto principal `npm link fly-movies-ux`
- Verifique que en el package.json esté la libería y la versión correcta
- Ejecute `ng serve` y el proyecto ya estará apuntando al link simbolico

Con estos paso puede hacer cambios en la librería y verlos reflejados directamente sobre el componente del proyecto principal que esté usando el componente


![Animation.gif](src/assets/Animation.gif)
