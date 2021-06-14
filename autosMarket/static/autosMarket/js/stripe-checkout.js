import STRIPE_KEYS from '../assets/stripe-keys.js';

// console.log(STRIPE_KEYS);

const d = document,
      $autos = d.getElementById('autos'), //<section>
      $template = d.getElementById('auto-template').content, //contenido de <template>
      $fragment = d.createDocumentFragment(), //Fragmento
      fetchOptions = { //Guardando cabecera con la clave secreta
        headers: {
            Authorization: `Bearer ${STRIPE_KEYS.secret}`  //Clave secreta de la API
        }
      }

let products,prices;
//Función para formatear el precio del producto, slice() lo que hace es cortar una cadena
const moneyFormat = num => `$${num.slice(0,1)}.${num.slice(1,4)}.${num.slice(4)}`;

//Promise.all() sirve para consumir dos peticiones(Promesas)
Promise.all([
    fetch("https://api.stripe.com/v1/products",fetchOptions), //endpoint de productos de API de Stripe
    fetch("https://api.stripe.com/v1/prices",fetchOptions) //endpoint de precios de API de Stripe
]) //Convirtiendo JSON de cada petición consumida a objeto(cada objeto de la petición se guarda en un arreglo)
.then(responses => Promise.all(responses.map(res => res.json())))
.then(json => { //Obteniendo arreglo  de JSON de cada petición ya convertidos a objetos
    // console.log(json); 
    products = json[0].data; //Guardando arreglo de los datos de los productos
    prices = json[1].data; //Guardando arreglo de los datos de los precios
    console.log(products, prices);

    prices.forEach(el => { //Iterando por cada elemento del arreglo de precios

        //Guardando elementos donde el id del arreglo de productos sea igual al
        //id del producto del arreglo de precios
        let productData = products.filter(product => product.id === el.product);
        // console.log(productData);

        // Agregando al <figure> (.auto) el data-price con el valor de el id del arreglo de precios
        $template.querySelector('.auto').setAttribute('data-price',el.id);
        //Agregando al <img> de cada <template> iterado la URL(src) de cada imagen de los productos de Stripe
        $template.querySelector('img').src = productData[0].images[0];
        //Agregando al <img> de cada <template> iterado el alt con el nombre cada productos de Stripe
        $template.querySelector('img').alt = productData[0].name;
        //Agregando contenido a cada <figcaption> iterado del <template>. Se agrega el nombre del producto,
        //el precio del producto como string y el tipo de moneda como contenido.
        $template.querySelector('figcaption').innerHTML = `
        ${productData[0].name} 
        <br>
        ${moneyFormat(el.unit_amount_decimal)} ${el.currency.toUpperCase()}`;

        let clone = d.importNode($template,true); //Clonando contenido del <template> por cada iteración
        $fragment.appendChild(clone); //Agregando cada clon del contenido del <template> al fragmento
    
    });

    $autos.appendChild($fragment); //Agregando el fragmento con todo lo que contiene al <section> (.autos)
})
.catch(err => {
    console.log(err);
    let message = err.statusText || "Ocurrió un error al conectarse con la API de Stripe";
    $autos.innerHTML = `<p>Error ${err.status}: ${message}</p>`;
})

//Evento Click
d.addEventListener('click',e => {
    if (e.target.matches('.auto *')) { //Si el evento que origina el evento es .taco y sus elementos hijos
        //Guardando el valor de data-prices que contiene el id del precio del producto
        let price = e.target.parentElement.getAttribute('data-price'); 
        console.log(price);

        Stripe(STRIPE_KEYS.public) //Stripe(clave publica) permite generar pagos online(es una Promise)
        .redirectToCheckout({ //redirectToCheckout() redirige al formulario de pago(se pasan configuraciones)
            lineItems: [{price, quantity: 1}],//Se define el id del precio del producto y la cantidad a cobrar
            mode: "payment",//Se define modo payment ya que se puso pago único
            successUrl: "http://127.0.0.1:5501/assets/stripe-success.html",
            cancelUrl: "http://127.0.0.1:5501/assets/stripe-success.html"
        })
        .then(res => {
            console.log(res);
            if (res.error) { //Si la petición es errónea
                //Se inserta Un mensaje de error como hermano siguiente de la <section> (.tacos)
                $autos.insertAdjacentHTML('afterend',res.error.message);
            }
        });
    }
});