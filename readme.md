# eFoodDelivery Website - Trabajo de Fin de Grado

# 0. Crear una aplicaión de React con Typescript

La segunda parte de este proyecto (la parte web del cliente), voy a desarrollarla en React usando como lenguaje base Typescript.

Para ello, si vamos a la web de [Create React App](https://create-react-app.dev/docs/getting-started#selecting-a-template) y bajamos un poco en ella, podremos encontrar un comando para crear una aplicación de React con una plantilla de base con Typescript.

Cabe mencionar que, la diferencia que hay entre Javascript y Typescript es que: 

- TypeScript dispone de una escritura estática, mientras que JavaScript es un lenguaje dinámico. 
- JavaScript no admite módulos, mientras que TypeScript sí que les da soporte. 
- TypeScript dispone de interfaz, mientras que JavaScript no. 
- En TypeScript sí que hay que compilar el código, en JavaScript no es necesario.

Al fin y al cabo, la razón principal por la que he decidido usar Typescript para la parte principal del proyecto, es porque cuando el proyecto vaya creciendo, si ya de base vamos atando nuestras variables a ciertos tipos, será menos propenso a encontrarse errores al ejecutar la aplicación. 

También en aplicaciones de gran escala, entre la comunidad de desarrolladores y clientes, típicamente se prefiere Typescript, ya que así se fuerza a seguir ciertas reglas y regulaciones.

Está claro que construir aplicaciones con soporte en Typescript conlleva mayor tiempo de desarrollo, pero el código será más limpio, y por lo tanto, el producto final será mucho mejor.

![](img/1.png)
![](img/2.png)

## 0.1. package.json

Antes de nada, debemos tener en cuenta que durante el desarrollo de la parte web cliente, iremos necesitando añadir a nuestra aplicación diferentes paquetes de funciones externas.

A medida que vayamos instalando paquetes con *npm install ...*, éstos se irán añadiendo al *package.json* con el número de la versión que instalemos. Esto a su vez quiere decir que, con el tiempo, estas versiones podrán irse actualizando y cambiando, y por lo cual, podríamos caer en ciertos errores por ello.

Para intentar solventar esas posibles situaciones anómalas de antemano, se recomienda muchísimo predefinir con anterioridad al desarrollo, los diferentes paquetes que vayamos a necesitar con las versiones que queramos mantener de ellos. Y esto lo haremos en el archivo de configuración que tenemos en el *root folder* llamado *package.json*, y a su vez, dentro de él, en la sección de *dependencies*.

```json
...
"dependencies": {
    // default dependencies added when app is created
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "@types/jest": "^27.5.2",
    "@types/node": "^16.18.23",
    "@types/react": "^18.0.33",
    "@types/react-dom": "^18.0.11",
    // regular packages
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    "typescript": "^4.9.5",
    "web-vitals": "^2.1.4",
    "bootstrap": "^5.2.3",
    "bootstrap-icons": "^1.10.2",
    "jwt-decode": "^3.1.2",
    "react-redux": "^8.0.5",
    "react-router-dom": "^6.5.0",
    "react-toastify": "^9.1.1",
    // scoped packages
    "@reduxjs/toolkit": "^1.9.1",
    "@stripe/react-stripe-js": "^1.16.1",
    "@stripe/stripe-js": "^1.46.0"
},
...
```

Tras definir todos los paquetes que utilizaremos durante el desarrollo de esta app y sus versiones, podemos instalarlos todos de una sóla vez, ejecutando el comando:

```bash
npm install
```

![](./img/3.png)

**Nota:** aunque a medida que avance en el desarrollo de la app, iré especificando cómo se instalarían cada uno de los paquetes por separado e independientemente, con sus respectivos comandos de *npm install ...*, así como los usos y diferentes funciones que desempeñarán en el desarrollo.

## 0.2. Limpiar y reorganizar la arquitectura inicial por defecto del proyecto

### Eliminar

Antes de empezar con el desarrollo de esta parte del proyecto, vamos a eliminar los siguientes archivos que se han creado por defecto:

• carpeta *public*:
- logo192.png
- logo512.png
- manifest.json
- robots.txt

• carpeta *src*:
- App.css
- App.test.tsx
- logo.svg
- react-app-env.tsx
- reportWebVital.ts
- setupTest.ts

### Reorganizar

• carpeta *src*:
- creamos una nueva carpeta llamada *app*, y en ella metemos el archivo del App.tsx, el cual es básicamente el principal contenedor de nuestra aplicación
- el archivo index.tsx contiene a su vez el App.tsx y es el esqueleto original de toda la aplicación de React
- para sustituir las imágenes de los logos que hemos eliminado antes, vamos a crear una nueva carpeta llamada *assets*, y a su vez, dentro de ella crearemos otra nueva carpeta para las imágenes llamada *images* (no le ponemos img porque podría confundirse con la misma del root folder del proyecto para las imágenes del readme.md), y en esta nueva carpeta metemos la imagen del logo de nuestra aplicación

### Limpiar

Por último, vamos a limpiar un poco el código de los archivo del *App.tsx* y el *index.tsx* de la carpeta *src*, y el *index.html* de la carpeta *public*

#### App.tsx

```tsx
import React from 'react';

function App() {
  return (
    <div className="App">
      eFoodDelivery
    </div>
  );
}

export default App;
```

#### index.tsx

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app/App';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <App />
);
```

### index.html

```html
<!DOCTYPE html>
<html lang="en">
  
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="Web site created using create-react-app" />
    <title>React App</title>
  </head>

  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>

</html>
```

Y en estos momentos, la arquitectura del proyecto con la que partiremos de base debería de verse tal que así:

![](./img/4.png)

## 0.3. Instalar Bootstrap y Bootstrap Icons

Como framework de CSS básico e inicial utilizaré Bootstrap.

Para implementar Bootstrap en nuestra aplicación, si bien es cierto que a través de su misma web oficial, podemos coger el CDN del CSS y del JS, y pegarlo en nuestro *index.html* de la carpeta *public*, como estoy trabajando en React, lo suyo es instalarlo, y para ello voy a ejecutar el comando de *npm* que podemos encontrar en el mismo home de la web de Bootstrap:

```bash
npm i bootstrap@5.3.0-alpha3
```

Si navegamos a su sección de *Icons*, igualmente encontraremos el comando para instalar los iconos de Bootstrap:

```bash
npm i bootstrap-icons
```

### src --> index.tsx

Vamos a añadir las importaciones de Bootstrap aquí para que funcione en todo la aplicación

```tsx
...
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap-icons/font/bootstrap-icons.css";
...
```

## 0.4 Primera prueba de ejecución del proyecto

Para lanzar nuestro proyecto y ver en local cómo llevamos el desarrollo del mismo, tan sólo necesitamos ejecutar el siguiente comando:

```bash
npm start
```

![](./img/5.png)
![](./img/6.png)

# 1. Header y Footer

En la carpeta de *src* vamos a crear a su vez dos subcarpetas más, una llamada *components* y otra llamada *pages* (las páginas estrán compuestas de componentes).

Para el caso de este apartado, el Header y el Footer serán componentes, ya que no constituyen ninguna página en sí mismos.

Pero sí serán estructuras fijas y estáticas que y estarán presentes en todas las páginas, lo cual es un elemento que popularmente se conoce como "layout".

Así que dentro de la carpeta de *components* creamos otra carpeta más llamada *layout*.

Y ahora sí, dentro de esta carpeta creamos los componentes del Header.tsx y el Footer.tsx.

**Nota:** cada vez que creamos un nuevo componente, con la extensión de VScode de "ES7+ React/Redux/React-Native snippets" podemos snipear el esqueleto inicial básico de partida escribiendo simplemente *rfce* (react functional export component) y pulsando *intro*

## 1.1. Header.tsx

```tsx
import React from 'react'

let appLogo = require("../../assets/images/eFoodDeliveryLogo.png");

function Header() {
  return (
    <div>
      <nav style={{background:'#ffbd40'}} className="navbar navbar-expand-lg text-black">
        <div className="container-fluid">
          <img src={appLogo} style={{height:'40px'}} className='m-1' />
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="#">Home</a>
              </li>

              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Admin
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">Action</a></li>
                  <li><a className="dropdown-item" href="#">Another action</a></li>
                  <li><a className="dropdown-item" href="#">Something else here</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Header
```

**Nota:** para la cabecera he copiado y pegado el primer componente de ejemplo de Bootstrap y lo he retocado básicamente.

## 1.2. Footer.tsx

```tsx
import React from 'react'

function Footer() {
  return (
    <div style={{background:'#ffbd40'}} className='footer fixed-bottom text-center p-3 text-black'>
      Copyright<i className="bi bi-c-circle"></i>2023&nbsp;-&nbsp;
      <i className="bi bi-mortarboard"></i>&nbsp;Trabajo de Fin de Grado realizado por Sergio Díaz Campos&nbsp;
      <i className="bi bi-person-check"></i>
    </div>
  )
}

export default Footer
```

## 1.3. index.tsx

Es una buena práctica y muy recomendable que, dentro de cada carpeta de componentes creemos un *index.tsx* para importar todos los componentes de esa misma carpeta para después importarlos todos en una sóla línea.

```tsx
import Header from "./Header";
import Footer from "./Footer";

export {Header, Footer}
```

## 1.4. App.tsx

Ahora ya tan sólo tenemos que llamar al Header y al Footer en el *App.tsx*

```tsx
function App() {
  return (
    <div>
      <Header />
        eFoodDelivery
      <Footer />
    </div>
  );
}
```

### Prueba inicial del Layout (Header y Footer)

![](./img/7.png)

## 1.5. Obtener los productos a través de la API

Ahora ha llegado el momento de empezar a consumir la API que ya había desarrollado en la primera parte de este TFG.

Comenzaremos haciendo una prueba para obtener los productos de la BBDD en el mismo *App.tsx* (aunque después lo moveremos a un componente propio).

Vamos a utilizar un par de hooks de React. Para traer los productos de la BBDD usaremos el *UseEffect* y para almacenarlos localmente usaremos el *UseState*.

**Nota:** toda la lógica del componente va dentro de la función, pero antes del return. En el return solo va el frontend, y antes de él, va el backend.

```tsx
...
function App() {
  // I will create a local state here with the name of my products and the function that will set it will be setProducts
  // and it will be equal to an empty array
  const [products, setProducts] = useState<ProductInterface[]>([]); // we can define the type here for ProductInterface

  // after that we will use the useEffect hook and we will load that
  // we will have the arrow function here and right now we can use the default fetch function and there we have to pass the URL
  useEffect(() => {
    fetch("https://localhost:7240/api/Product") // we can get this URL from the API response when we execute the GET produt's endpoint
      // we have a promise here so we use then(), and when the fetch completes, we will be getting a response here,
      .then((response) => response.json()) // so we add the arrow function and we want to convert that to JSON
        // after that. we can add another then block here and we can get the data that is being retrieved
        .then((data) => { // and write a console.log to test if we're getting the products correctly
          console.log(data);
          setProducts(data.result); // setting the data with the useState
        })
  }, []); // when this useEffect needs to be executed, we will keep that empty. That way it will be executed evedry time the component renders

  return (
    <div>
      <Header />
        eFoodDelivery
      <Footer />
    </div>
  );
}
...
```

**Nota:** este no es el verdadero uso del useState(), pero me valía para esta prueba rápida. El useState() se usa para definir y almacenar los posibles estados en los que puede encontrarse un objeto, y proceder así con unas funciones u otras.

![](./img/8.png)

Como podemos apreciar hasta ahora, estamos guardando los productos con el useState localmente en un array vacío. Pero recordando las buenas prácticas que aprendí en la asignatura de Angular, las entidades (como el producto en este caso) deben partir de una interfaz de origen donde se define el objeto que se recibe y se quiere sacar por pantalla.

Para definir rápido la interfaz y no equivocarnos añadiendo más/menos campos, vamos a hacer el siguiente truco.

Pegamos la URL del endpoint del GET de productos en el Chrome, y veremos el JSON de respuesta, y copiamos sólo el primer producto.

Ahora vamos a alguna web tipo que convierta un JSON en Typescript. Por ejemplo, [transform.tools](https://transform.tools/json-to-typescript), y pegamos el objeto en JSON y lo transformamos a su interfaz correspondiente en Typescript.

![](./img/9.png)
![](./img/10.png)

Y ahora ya tan sólo tenemos que crear una nueva carpeta dentro de *src*, a la que llamaremos *interfaces*, y crearemos la interfaz del producto (ProductInterface.ts) con lo que nos ha transforma la web de antes.

```ts
export default interface ProductInterface {
    md_uuid: string
    md_date: string
    id: number
    name: string
    description: string
    tag: string
    category: string
    price: number
    image: string
}
```

**Nota:** recuerda seguir la buena práctica de crear un index en cada carpeta para exportarlo todo junto.

## 1.7. pages --> Home.tsx

Como no sería una buena práctica que empecemos a meterlo todo en el App.tsx, para lo que hemos hecho antes de obtener los productos a través de la API, lo suyo es que creemos ahora una nueva página para ello... el Home page.

Para ello, por un lado, crearemos dentro de la carpeta *page* un nuevo archivo llamado Home.tsx. 
Y por otro lado, dentro de la carpeta de *components*, vamos a crear otra llamada *view*, y a su vez dentro de ella, otra llamada *products*, y finalmente aquí creamos el archivo del ProductList.tsx.

Lo primero que haremos será cortar/pegar la lógica que hicimos en el App.tsx en el nuevo ProductList.tsx.

```tsx
import React, { useEffect, useState } from 'react'
import { ProductInterface } from '../../../interfaces';


function ProductsList() {
  // I will create a local state here with the name of my products and the function that will set it will be setProducts
  // and it will be equal to an empty array
  const [products, setProducts] = useState<ProductInterface[]>([]); // we can define the type here for ProductInterface

  // after that we will use the useEffect hook and we will load that
  // we will have the arrow function here and right now we can use the default fetch function and there we have to pass the URL
  useEffect(() => {
    fetch("https://localhost:7240/api/Product") // we can get this URL from the API response when we execute the GET produt's endpoint
      // we have a promise here so we use then(), and when the fetch completes, we will be getting a response here,
      .then((response) => response.json()) // so we add the arrow function and we want to convert that to JSON
        // after that. we can add another then block here and we can get the data that is being retrieved
        .then((data) => { // and write a console.log to test if we're getting the products correctly
          console.log(data);
          setProducts(data.result); // setting the data with the useState
        })
  }, []); // when this useEffect needs to be executed, we will keep that empty. That way it will be executed evedry time the component renders

  
  return (
    <div>ProductsList</div>
  )
}


export default ProductsList
```

Después ponemos el componente del ProductList.tsx dentro de la nueva página del Home.tsx

```tsx
import React from 'react'
import { ProductsList } from '../components/view/products'


function Home() {
  return (
    <div>
      <div className='container p-2'>
        <ProductsList />
      </div>
    </div>
  )
}


export default Home
```

Y por último ponemos el Home.tsx entre el Header y el Footer del App.tsx

```tsx
function App() {
  return (
    <div>
      <Header />
        <Home />
      <Footer />
    </div>
  );
}
```

De modo que la nueva estructura del proyecto debería de quedar tal que así:

![](./img/11.png)

Y de nuevo comprobamos que la aplicación sigue funcionando perfectamente como antes:

![](./img/12.png)

## 1.8. components --> products --> ProductList.tsx y ProductCard.tsx

```tsx
import React from 'react'
import { ProductInterface } from '../../../interfaces'


// right now we're only passing product, but we might also be passing more things along the road
// like we're using typescript it's better to define a type for this prop here
function ProductCard(props: Props) { // right here we have to write the product will be getting props
  return (
    <div>
        {props.product.name}
    </div>
  )
}


export default ProductCard


// so I'll define a local interface here called Props
interface Props {
    product: ProductInterface;
}
```

```tsx
function ProductsList() {
  ...
  return (
    <div className='container row'>
      {/* we want to work if the products length is greater that 0, and in that case, we want the conditional rendering and iterate through the products */}
      {products.length > 0 && products.map((product, index) => (
        // we have the product card here and we'll say product is equal to this product, we'll give a unique ID with index
        <ProductCard product={product} key={index} />
      ))}
    </div>
  )
}
```

Al iterar la lista de los productos del useState() con cada carta de producto, obtendremos el siguiente resultado:

![](./img/13.png)

# Webgrafía y Enlaces de Interés

[1. What is the meaning of the "at" (@) prefix on npm packages?](https://stackoverflow.com/questions/36667258/what-is-the-meaning-of-the-at-prefix-on-npm-packages)

[2. Bootstrap components](https://getbootstrap.com/docs/5.3/components/)

# Pruebas de Ejecución

# Extras

## Enlace al espacio de trabajo y al tablero del proyecto en Trello

### [1. Enlace a Trello - Espacio de trabajo y Tablero del proyecto eFoodDelivery-Website](https://trello.com/invite/b/jhJydRkf/ATTI1474acfddb1880c784b2467f19f42a7a387BB064/efooddelivery-website)

### [2. Enlace a Bootstrap-Icons](https://icons.getbootstrap.com/)

### [3. Usando el Hook de useState()](https://es.reactjs.org/docs/hooks-state.html)

### [4. Usando el Hook de useEffect()](https://es.reactjs.org/docs/hooks-effect.html)

### [5. Components and Props](https://legacy.reactjs.org/docs/components-and-props.html)

