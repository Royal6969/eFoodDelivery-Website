# eFoodDelivery Website - Trabajo de Fin de Grado

- [eFoodDelivery Website - Trabajo de Fin de Grado](#efooddelivery-website---trabajo-de-fin-de-grado)
- [0. Crear una aplicaión de React con Typescript](#0-crear-una-aplicaión-de-react-con-typescript)
  - [0.1. package.json](#01-packagejson)
  - [0.2. Limpiar y reorganizar la arquitectura inicial por defecto del proyecto](#02-limpiar-y-reorganizar-la-arquitectura-inicial-por-defecto-del-proyecto)
    - [Eliminar](#eliminar)
    - [Reorganizar](#reorganizar)
    - [Limpiar](#limpiar)
      - [App.tsx](#apptsx)
      - [index.tsx](#indextsx)
    - [index.html](#indexhtml)
  - [0.3. Instalar Bootstrap y Bootstrap Icons](#03-instalar-bootstrap-y-bootstrap-icons)
    - [src --\> index.tsx](#src----indextsx)
  - [0.4 Primera prueba de ejecución del proyecto](#04-primera-prueba-de-ejecución-del-proyecto)
- [1. Header y Footer](#1-header-y-footer)
  - [1.1. Header.tsx](#11-headertsx)
  - [1.2. Footer.tsx](#12-footertsx)
  - [1.3. index.tsx](#13-indextsx)
  - [1.4. App.tsx](#14-apptsx)
    - [Prueba inicial del Layout (Header y Footer)](#prueba-inicial-del-layout-header-y-footer)
  - [1.5. Obtener los productos a través de la API](#15-obtener-los-productos-a-través-de-la-api)
- [2. Página del Home](#2-página-del-home)
  - [2.1. pages --\> Home.tsx](#21-pages----hometsx)
  - [2.2. components --\> products --\> ProductList.tsx y ProductCard.tsx](#22-components----products----productlisttsx-y-productcardtsx)
  - [2.3. Prueba de ejecución con la API desplegada](#23-prueba-de-ejecución-con-la-api-desplegada)
  - [2.4. Interfaz de la página del Home](#24-interfaz-de-la-página-del-home)
    - [ProductCard.tsx](#productcardtsx)
  - [2.5. Añadiendo el routing y la página 404](#25-añadiendo-el-routing-y-la-página-404)
- [3. Página de los Detalles del Producto](#3-página-de-los-detalles-del-producto)
  - [3.1. Añadir Redux y Redux Toolkit](#31-añadir-redux-y-redux-toolkit)
  - [3.2. Añadir una consulta para buscar los productos](#32-añadir-una-consulta-para-buscar-los-productos)
  - [3.3. LLamar al Slice para buscar los productos](#33-llamar-al-slice-para-buscar-los-productos)
- [Webgrafía y Enlaces de Interés](#webgrafía-y-enlaces-de-interés)
    - [1. What is the meaning of the "at" (@) prefix on npm packages?](#1-what-is-the-meaning-of-the-at--prefix-on-npm-packages)
    - [2. Bootstrap components](#2-bootstrap-components)
    - [3. Enlace a Bootstrap-Icons](#3-enlace-a-bootstrap-icons)
    - [4. Usando el Hook de useState()](#4-usando-el-hook-de-usestate)
    - [5. Usando el Hook de useEffect()](#5-usando-el-hook-de-useeffect)
    - [6. Components and Props](#6-components-and-props)
    - [7. Conditional Rendering](#7-conditional-rendering)
    - [8. BrowserRouter - Routes - NavLink - Link](#8-browserrouter---routes---navlink---link)
    - [9. Redux Toolkit Guide - Creating Slices](#9-redux-toolkit-guide---creating-slices)
    - [10. Redux Toolkit - createApi](#10-redux-toolkit---createapi)
    - [11. Redux Toolkit - fetchBaseQuery](#11-redux-toolkit---fetchbasequery)
    - [12. Redux Toolkit - getDefaultMiddleware](#12-redux-toolkit---getdefaultmiddleware)
- [Pruebas de Ejecución](#pruebas-de-ejecución)
- [Extras](#extras)
  - [Enlace al espacio de trabajo y al tablero del proyecto en Trello](#enlace-al-espacio-de-trabajo-y-al-tablero-del-proyecto-en-trello)
    - [Enlace a Trello - Espacio de trabajo y Tablero del proyecto eFoodDelivery-Website](#enlace-a-trello---espacio-de-trabajo-y-tablero-del-proyecto-efooddelivery-website)


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

**Nota:** como tuve algunos problemas con Azure y eliminé la cuenta con la que desarrollé la API, hasta que no vuelva a re-desplegarla, comenzaré usando la API en local ejecutándola desde su proyecto en el VS2022.

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

# 2. Página del Home

## 2.1. pages --> Home.tsx

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

## 2.2. components --> products --> ProductList.tsx y ProductCard.tsx

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

## 2.3. Prueba de ejecución con la API desplegada

He vuelto a crear una nueva cuenta gratuita de Azure y he vuelto a crear los cinco servicios que tenía.

Entonces he conseguido re-desplegar la API, por lo que voy a hacer una prueba de ejecución, pero esta vez consumiendo directamente la API desplegada en internet. 

Para ello, tan sólo tengo que ir al ProductList.tsx y poner la URL de la API desplegada en la función del useEffect() en su método de fetch("https://efooddelivery-api.azurewebsites.net/api/Product").

Y funciona perfectamente!! 🤩

## 2.4. Interfaz de la página del Home

### ProductCard.tsx

```tsx
function ProductCard(props: Props) { // right here we have to write the product will be getting props
  return (
    <div className='col-md-4 col-12 p-4'>
      {/* *********************************************** PRODUCT CARD STARTS ************************************************ */}
      <div className='card' style={{ boxShadow: '0 1px 7px 0 rgb(0 0 0 / 50%)' }}>
        <div className='card-body pt-2'>
         
          <div className='row col-10 offset-1 p-4'>
            <img src={props.product.image} style={{ borderRadius: '50%' }} className='w-100 mt-5 image-box' alt='' />
          </div>

          {/* in teh case we've got more than one tag, we need to define a consitional rendering */}
          {props.product.tag && props.product.tag.length > 0 && (
            <i className='bi bi-star btn btn-warning'
              style={{
                position: 'absolute',
                top: '15px',
                left: '15px',
                padding: '5px 10px',
                borderRadius: '3px',
                outline: 'none !important',
                cursor: 'pointer',
              }}
            >
              &nbsp; {props.product.tag}
            </i>
          )}

          <i className='bi bi-cart-plus btn btn-outline-danger'
            style={{
              position: 'absolute',
              top: '15px',
              right: '15px',
              padding: '5px 10px',
              borderRadius: '3px',
              outline: 'none !important',
              cursor: 'pointer',
            }}
          ></i>

          <div className='text-center'>
            <p className='card-title m-0 text-warning fs-3'>
              {props.product.name}
            </p>
            <p className='badge bg-secondary' style={{ fontSize: '12px' }}>
              {props.product.category}
            </p>
          </div>
          <p className='card-text' style={{ textAlign: 'center' }}>
            {props.product.description}
          </p>
          <div className='row text-center'>
            <h4>{props.product.price}€</h4>
          </div>
        </div>
      </div>
      {/* *********************************************** PRODUCT CARD STARTS ************************************************ */}
    </div>
  )
}
```

![](./img/14.png)

## 2.5. Añadiendo el routing y la página 404

En este momento, si no lo hubiéramos hecho al principio con el *package.json*, sería el momento de instalar el React Router DOM.

```bash
npm install react-router-dom
```

Para habilitar el routing, tenemos que ir en primer lugar al index.tsx principal, y envolver el contenedor principal de <App/> dentro del tag de <BrowserRouter>

```tsx
...
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```

Luego, en el App.tsx, es donde definiremos las diferentes rutas que vaya a tener nuestra aplicación y que vayamos necesitando a medida que avancemos

```tsx
function App() {
  return (
    <div>
      <Header />
        
        <div className="pb-5">
          <Routes>
            <Route path='/' element={<Home />}></Route>
          </Routes>
        </div>
        
      <Footer />
    </div>
  );
}
```

Por último y para su aplicación final, vamos por ejemplo al componente del Header.tsx para definir bien los enlaces, y sustituímos los antiguos anclas por el tag del <NavLink> y reemplazamos el href="#" por to="/"

```tsx
...
<li className="nav-item">
  <NavLink className="nav-link" aria-current="page" to="/">
    Home
  </NavLink>
</li>
...
```

Ahora para añadir la página del NotFound.tsx, lo creamos rápidamente y tal cual viene lo usaremos. 

Vamos al App.tsx para añadir su nueva ruta (para indicar cualquier página que no se encuntre se pone con un asterisco *).

Luego en el Header.tsx añadimos un nuevo item a la lista del navbar para linkearlo con la nueva ruta y le ponemos un icono de bootstrap de un carrito de la compra...

... y comprobamos que funciona correctamente!!

![](./img/15.png)

# 3. Página de los Detalles del Producto

Lo primero será crear esta nueva página, y acto seguido definiremos su ruta en el App.tsx

```tsx
<Routes>
  <Route path='/' element={<Home />}></Route>
  <Route path='*' element={<NotFound />}></Route>
  <Route path='/ProductDetails/:productId' element={<ProductDetails />}></Route>
</Routes>
```

Como podemos ver, para estaruta particular, al igual que ya hacíamos en la API, necvesitaremos pasar un ID del producto en cuestión.

También vamos a linkear con este nueva ruta, la foto de cada producto en el componente del ProductCard.

```tsx
<div className='row col-10 offset-1 p-4'>
  <Link to={`/ProductDetails/${props.product.id}`}> {/* note that the route here is dynamic for the product ID */}
    <img src={props.product.image} style={{ borderRadius: '50%' }} className='w-100 mt-5 image-box' alt='' />
  </Link>
</div>
```

Y también le añadimos este mismo Link al nombre del producto. 

Ahora vamos a implementar alguna plantilla de bootstrap para esta nueva página de los detalles del producto.

```tsx
function ProductDetails() {
  return (
    <div className="container pt-4 pt-md-5">
      <div className="row">
        <div className="col-7">
          <h2 className="text-warning">NAME</h2>
          
          <span>
            <span className="badge text-bg-dark pt-2" style={{ height: "40px", fontSize: "20px" }}>
              CATEGORY
            </span>
          </span>

          <span>
            <span className="badge text-bg-light pt-2" style={{ height: "40px", fontSize: "20px" }}>
              SPECIAL TAG
            </span>
          </span>
          
          <p style={{ fontSize: "20px" }} className="pt-2">
            DESCRIPTION
          </p>
          
          <span className="h3">$10</span> &nbsp;&nbsp;&nbsp;
          
          <span className="pb-2  p-3" style={{ border: "1px solid #333", borderRadius: "30px" }}>
            <i className="bi bi-dash p-1" style={{ fontSize: "25px", cursor: "pointer" }}></i>
            <span className="h3 mt-3 px-3">XX</span>
            <i className="bi bi-plus p-1" style={{ fontSize: "25px", cursor: "pointer" }}></i>
          </span>
          
          <div className="row pt-4">
            <div className="col-5">
              <button className="btn btn-warning form-control">
                Add to Cart
              </button>
            </div>

            <div className="col-5 ">
              <button className="btn btn-secondary form-control">
                Back to Home
              </button>
            </div>
          </div>
        </div>
        
        <div className="col-5">
          <img src="https://via.placeholder.com/150" width="100%" style={{ borderRadius: "50%" }} alt="No content" />
        </div>
      </div>
    </div>
  )
}
```

![](./img/16.png)

Y ahora nos paramos a plantear el cómo vamos a hacer esto, es decir, en el ProductList habíamos recuperado todos los productos de la BBDD con el hook del useEffect(), pero ahora nos enfrentemos a una nueva situación...

Necesitamos de algún modo poder coger uno de esos productos que tenemos en el ProductList y enviarlo hacia la nueva página del ProductDetails. Pues para hacer esto hay un truco... ¡vamos a utilizar la herramienta de Redux!

Con Redux, podremos tener como un "almacenamiento centralizado" y desde ahí, acceder fácilmente a cualquier objeto que queramos.

## 3.1. Añadir Redux y Redux Toolkit

Para instalar el paquete de Redux necesitamos ejecutar el siguiente comando:

```bash
npm install @reduxjs/toolkit react-redux
```

Ahora vamos a crear dentro de *src* una nueva carpeta llamada *store* por ejemplo, y dentro de ella a su vez, creamos otra para Redux.

Dentro de la carpeta de Redux, vamos a crear dos archivos, un *ReduxStorage.ts* y un *ProductSlice.ts*, los cuales serán los archivos básicos que necesitaremos para la configuración de Redux y su uso por el momento.

Lo primero de ambos, será configurar el ProductSlice

```ts
// First thing that we want to work in the slice here and we will be creating a slice, and we have to import it from Redux Toolkit
import { createSlice } from "@reduxjs/toolkit";


// and inside here we have to think about what will be the slice that we want to manage?
// we want to manage an array or list of products
// so for the initial state, we will set that as product, which is an array
const initialState = {
  product: []
};


// now we have to export the const productSlice and we say it's equal to the createSlice() method
// and here we will configure our reducer or slice
export const productSlice = createSlice({
  name: "Product",
  initialState: initialState,
  reducers: { // here we want the reducers that will be responsible for managing the state
    setProduct: (state, action) => {  // it receives two parameters, first one is the state itself, and the second one is the action
      state.product = action.payload; // we need to set the state for product which will be passed to us from the payload when we invoke this
    }
  }
});


// finally we will export the setProduct action, and we will also export the productReducer from productSlice
export const { setProduct } = productSlice.actions;
export const productReducer = productSlice.reducer;
```

En segundo lugar, ahora tenemos que configurar el ReduxStorage

```ts
// now this store is where we will manage all the slices. To configure the store we need to import the configureStore from Redux Toolkit
import { configureStore } from "@reduxjs/toolkit/dist/configureStore";
import { productReducer } from "./ProductSlice";


const reduxStorage = configureStore({ // we have to configure the objects here
  reducer: {
    productStore: productReducer  // name for the store and the reducer imported
  }
});


// now when we are working with Typescript, we basically have to export the root state and that will be the type os store state
// that way, whatever is the type of the current state of the slice that will be exported in the root state
export type RootState = ReturnType<typeof reduxStorage.getState>;
// getting the state by this way, whenever we are calling the paryicular store, Typescript will expect a type,
// and we can use that as root state that we have exported right here

export default reduxStorage;
```

Y ahora ya tan sólo tendríamos que añadir Redux a nuestra aplicación, por lo cual, iremos al nivel root, el cual es el *index.tsx* y añadiremos ahí el proveedor. Importaremos el Provider de Redux y tenemos que envolver lo que teníamos del BrowserRouter y el App, ahora dentro del tag Provider, indicando cual es el store que vamos a usar.

```tsx
root.render(
  <Provider store={reduxStorage}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
```

Si entonces ahora ejecutamos la aplicación, lo primero es comprobar que no tenemos errores en panatalla o en la consola del inspeccionar... y efectivamente no los tenemos, todo sigue funcionando perfectamente!!

## 3.2. Añadir una consulta para buscar los productos

Ahora que vamos a utilizar Redux, la cosa es que en vez de sobrecargar nuestra aplicación con el hook del useEffect(), vamos a utilizar queries con Redux, lo cual es más eficiente para el rendimiento de la app.

En primer lugar vamos a crear una nueva carpeta dentro de *src*, a la que llamaremos *APIs*, y a su vez dentro de ella, creamos un archivo llamado *ProductAPI.ts*

```ts
// let's add the import statement to import createAPI and fetchBaseQuery
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const productAPI = createApi({
  reducerPath: "productAPI",  // a name to identify it
  baseQuery: fetchBaseQuery({ // to configure the baseQuery and here we want to fetch the baseQuery using a baseURL
    baseUrl: "https://efooddelivery-api.azurewebsites.net/api/" // we set here the same URL that we used in ProductList but without the endpoint
    // when we define the query endpoint, we will append the product there
  }),
  tagTypes: ["Products"],
  endpoints: (builder) => ({  // when we build the endpoint, we have the arrow function where will get the builder object
    // we want to define the endpoints for GetProducts (/api/Product) and GetProductById (/api/Product/{id})
    getProducts: builder.query({
      query: () => ({
        url: "product" // the only parameter that we have is product
      }),
      providesTags: ["Products"] // when we retrieve this query, how we want to catch it, that is using the tag products that we defined in tagTypes before
      // so next time, if you update a product, you have to invalidate this tag and the endpoint will fetch the record again from the API
    }),
    getProductById: builder.query({
      query: (productId) => ({ // when we have to get the product by id here, we will receive the parameter ID
        url: `product/${productId}` // and we will use string interpolation here and add that to the URL here using the productID
      }),
      providesTags: ["Products"]
    }),
  })
});


// now, what we have here, our query, so the action methods are created automatically, but we have to add the name which is used
// then we set the endpoint name, changing the case, and we will have to append query at the end
// and these will be the default actions that are created automatically when we work with our query
export const { useGetProductsQuery, useGetProductByIdQuery } = productAPI;
export default productAPI;
```

Una vez habiendo creado los endpoints, tenemos que anadirlo a nuestro *ReduxStorage.ts*, y también definir un middleware por defecto

```ts
...
const reduxStorage = configureStore({ // we have to configure the objects here
  reducer: {
    productStore: productReducer,  // name for the store and the reducer imported
    [productAPI.reducerPath]: productAPI.reducer
  },
  // now you should remember that when we have to register the API, we also have to add that in the middleware, and it needs a default configuration
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productAPI.middleware)
});
...
```

## 3.3. LLamar al Slice para buscar los productos

Volvemos al *ProductList.tsx* para actualizar el useEffect() y usarlo esta vez con la redux query

```tsx
function ProductsList() {
  // after we created and configure our first Redux Query to fetch the products,
  // now we want to extract the data, and we're going to extract the "isLoading" flag from useGetProductsQuery
  const { data, isLoading } = useGetProductsQuery(null); // remember we had not parameters so we can set it as null, and this line will automatically be execute
  // what we want to do is when isLoading is false, then we want to set the product in our store where we have the product slice so we want to invoke the setProduct
  // so now we don't need the local state before (comment it for the moment) and let's remove the actual useEffect() content

  // for that we will have to add the import for dispath hook and we will have to create a constant for dispatch
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoading) { // that means the data is populated using the redux query, it has fetched it from our API
      // so if that is populated then, we want to dispatch an event to populate or rather call the setProduct
      dispatch(setProduct(data.result)); // when we're dispatching, we need the payload, and that payload will be reiceived in data.result
    }
  // now with this new useEffect() that we have, we don't want it to load every time the component is rendered
  }, [isLoading]); // we only want it to be execute when the value os isLoading is updated
  
  // note that initially, data will not have all the value because it's still loading that using the query right now, so data will be undefined
  // one way to handle this exception that we have, is we can add a condition here
  if (isLoading) {
    return (
      <div>
        Loading products ...
      </div>
    )
  }

  return (
    <div className='container row'>
      {data.result.length > 0 && data.result.map(
        // but now Typescript doesn't know what is the type here
        (product: ProductInterface, index: number) => ( // so it says you can write any here, but we know product will be of type ProductInterface and the index will be a Number
          <ProductCard product={product} key={index} />
        )
      )}
    </div>
  )
}
```

Si ahora ejecutamos la aplicación, mientras se cargan los rpoductos, podremos ver el mensaje de "Loading Products", hasta que se cargan y se presentan todos los productos en pantalla.

![](./img/17.png)
![](./img/18.png)

# Webgrafía y Enlaces de Interés

### [1. What is the meaning of the "at" (@) prefix on npm packages?](https://stackoverflow.com/questions/36667258/what-is-the-meaning-of-the-at-prefix-on-npm-packages)

### [2. Bootstrap components](https://getbootstrap.com/docs/5.3/components/)

### [3. Enlace a Bootstrap-Icons](https://icons.getbootstrap.com/)

### [4. Usando el Hook de useState()](https://es.reactjs.org/docs/hooks-state.html)

### [5. Usando el Hook de useEffect()](https://es.reactjs.org/docs/hooks-effect.html)

### [6. Components and Props](https://legacy.reactjs.org/docs/components-and-props.html)

### [7. Conditional Rendering](https://react.dev/learn/conditional-rendering#logical-and-operator-)

### [8. BrowserRouter - Routes - NavLink - Link](https://reactrouter.com/en/main/start/tutorial)

### [9. Redux Toolkit Guide - Creating Slices](https://redux-toolkit.js.org/api/createSlice)

### [10. Redux Toolkit - createApi](https://redux-toolkit.js.org/rtk-query/api/createApi)

### [11. Redux Toolkit - fetchBaseQuery](https://redux-toolkit.js.org/rtk-query/api/fetchBaseQuery)

### [12. Redux Toolkit - getDefaultMiddleware](https://redux-toolkit.js.org/api/getDefaultMiddleware)

# Pruebas de Ejecución

# Extras

## Enlace al espacio de trabajo y al tablero del proyecto en Trello

### [Enlace a Trello - Espacio de trabajo y Tablero del proyecto eFoodDelivery-Website](https://trello.com/invite/b/jhJydRkf/ATTI1474acfddb1880c784b2467f19f42a7a387BB064/efooddelivery-website)