/* ********** ContactForm ********** */

(() => {
    const $form = document.querySelector('.contact-form'), //<form>
          $loader = document.querySelector('.contact-form-loader'), //<div> que contiene el .svg del loader
          $response = document.querySelector('.contact-form-response'); //<article> que contiene el mensaje con emoticon(respuesta del form.)

    //Evento 'submit' para envío de formulario
    $form.addEventListener("submit",e => {
        e.preventDefault(); //Quitando evento por defecto
        $loader.classList.remove('none'); //Eliminando clase 'none' del loader
        fetch("https://formsubmit.co/ajax/josu.aguileraa@duocuc.cl",{
            method: "POST", //Enviando formulario por el método POST
            //El objeto FormData envía el formulario(el elemento que origina el evento) al servidor(la API)
            body: new FormData(e.target)
        }) //Si la petición es correcta devuelve el json como objeto
        .then(res => res.ok?res.json:Promise.reject(res))
        .then(json => { //JSON convertido ya a objeto
            console.log(json);
            $loader.classList.add('none');
            location.hash = "#gracias"; //'hash' define las anclas de un sitio web
            $form.reset(); //'reset' restaura los elementos de un formulario a sus valores por defecto. 
        })
        .catch(err => {
            console.log(err);
            let message = err.statusText || "Ocurrió un error al enviar, intenta nuevamente";
            $response.querySelector('h3').innerHTML = `Error ${err.status}: ${message}`;
        })
        .finally(() => {
            $loader.classList.add('none'); //Agregando la clase 'none'

            //Se demora 3 segundos en ejecutar este temporizador
            setTimeout(() => {
                location.hash = "#close"; //Agregando ancla '#close'
            }, 3000);
        });

        
    });

})(document);