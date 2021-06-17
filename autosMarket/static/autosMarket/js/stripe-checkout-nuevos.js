/// llamar al archivo keys en la variable STRIPE_KEYS 
import STRIPE_KEYS from '../js/stripe-keys-nuevo.js';

//console.log(STRIPE_KEYS);
// print para revisar que las claves se importaron correctamente 


// declara la constante d donde se cargara el DOM
const d = document,
// Variable del DOM donde se obtendran los productos cargados desde el ID de la section del album  
$autos = d.getElementById("autos"),
// Variable del template
$template = d.getElementById("template-auto").content,
// creacion de un fragmento del DOM 
$fragment = d.createDocumentFragment(),

// Objeto de configuracion del fetch 
// Para no repetir la funcion dos veces, se crea la variable fetchOptions que almacena las PK de la API
fetchOptions ={
    headers: {
        Authorization: `Bearer ${STRIPE_KEYS.secret}`,
    },
};

// Se crean dos variables de inicio donde se guardaran las solicitudes fetch
let  products, prices;

//Creacion de funcion para dar formato peso al precio del producto
// recibe un numero, num y devuelve (=>) 
//funcion slice(posicion, cantidad de numeros desde el inicio o fin de la string que se mostraran desde la posicion)
const moneyFormat = num => `$${num.slice(0,2)}.${num.slice(2,5)}.${num.slice(4,8)}`

// Se crea la promesa con el metodo all Promise.all, este metodo recibe las peticiones de los dos lados y las une como lista de arreglo que se transformaran a JSON
// Obtendra la informacion de cada endpoint y solamente cuando reciba ambas respuestas pasa a then
// then= cuando tenga las respuestas del promise.all 
// La funcion responses retornara los datos de la promesa (=> Promise.all()) mas
// Por cada una de las respuestas de va a crear un arreglo (variable "res") con el metodo map el cual sera formateado a JSON
// se concatenan las solicitudes y se muestran por consola en un console.log
// se utliza el metodo catch para que en caso de que haya algun error lo imprima en la consola 
// y se cree un mensaje de cuadro de dialogo
Promise.all([
    fetch("https://api.stripe.com/v1/products", fetchOptions),
    fetch("https://api.stripe.com/v1/prices", fetchOptions),
])
.then(responses => Promise.all(responses.map(res => res.json())))
.then(json => {
    //console.log(json);
    // Imprimira los arreglos en la posicion extraida de la consola y mostraran la respuesta JSON de la data traida de la API 
        products = json[0].data;
        prices = json[1].data;
        console.log(products, prices);
        // Utilizacion de la variable template declarada en el archivo HTML
        // El siguiente foreach recorre el arreglo prices (element), ya que este contiene el ID precio como clave unica y el ID producto como clave foranea. 
        // El ID producto permitira consultar en el arreglo products los datos necesarios para llenar el template HTML 
        prices.forEach(element =>{
            // variable productData almacena el idProducto
            // en el filtro por cada producto que tenga el arreglo products, el product.id, coincida con el product ID del prices.
            let productData = products.filter((product) => product.id === element.product);
            console.log(productData);

            // Manipulacion del template para desplegar las imagenes y textos de los productos desde la API
            //(MQ) Accede al template, busca el selector de la clase auto y le establecera un atributo nuevo 
            // se le asigna un nuevo data attribute que sera el id del precio    
            $template.querySelector(".auto").setAttribute("data-price", element.id);
            $template.querySelector("img").src= productData[0].images[0];
            // extraccion de figura desde el elemento html alt mostrado por consola
            $template.querySelector("img").alt= productData[0].name;

            // modificacion de los elementos de la etiqueta figcaption
            // obteniendo el valor numerico del precio para luego darle formato con la funcion money format
            $template.querySelector("figcaption").innerHTML = `
                ${productData[0].name}
                <br>
                ${moneyFormat(element.unit_amount_decimal)} ${element.currency}
            `;
            //crear variable clone, importar el nodo HTML de la media query template, el true determina que sera la estructura completa HTML   
            let $clone = d.importNode($template, true);
            // los precios seran asignados al fragmento 
            $fragment.appendChild($clone);        
        });        
        // cuando termine el ciclo, al elemento autos se le agrega el fragmento de precios
        $autos.appendChild($fragment);
    })
    // catch control de errores, en el caso que no se pueda obtener los datos desde la API
    .catch((err)=>{
        console.log(err);
        let message = err.statusText || "Ocurrio un error al conectarse con la API de stripe";
        $autos.innerHTML = `<p> Error ${err.status}: ${message}</p>`;
    });
    
    // Programacion del evento click, para el momento en que las imagenes sean seleccionadas
    // click queda asignado a la constante document declarada 
    // si el elemento seleccionado, (target) coincide con la clase .auto u otro elemento *, se debe enviar el ID de precio hacia 
    // la api para indicar que ese es el producto que se esta comprando 

    d.addEventListener("click", (e) =>{
        if (e.target.matches(".auto *")) {
        //alert("hola");
        //El metodo stripe obtiene la llave publica
        // la funcion se redireccionara los parametros hacia el checkout y devolvera una promesa
        // Crea la variable price donde se almacena desde el elemento padre el atributo data price 
            // lineitems, este parametro es un arreglo en el que se establece un objeto que contiene los precios, quantity (cantidad) del producto seleccionado
            // quantity queda en 1 porque sera un producto por seleccion
        
        let price = e.target.parentElement.getAttribute("data-price"); 
        //console.log(price);
       
        Stripe(STRIPE_KEYS.public)
        .redirectToCheckout({
            lineItems:[{price, quantity:1}],
            // medio de pago definido como pago unico
            mode: "payment", 
            successUrl: "http://127.0.0.1:5000/autosMarket/templates/autosMarket/assets/stripe-success.html",
            cancelUrl: "http://127.0.0.1:5000/autosMarket/templates/autosMarket/assets/stripe-cancel.html"
            
        })
        .then(res => {
            console.log(res);
            if(res.error){
            // si hay un error el mensaje se insertara al final del elemento HTML del elemento autos 
            $autos.insertAdjacentHTML("afterend", res.error.message);
            }
        });
        }
    });