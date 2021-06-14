document.addEventListener("DOMContentLoaded", () => {
    //Función que se ejecutará en el ForEach
    const includeHTML = (el, url) => {
        const xhr = new XMLHttpRequest(); //AJAX

        xhr.addEventListener("readystatechange", () => { //Evento AJAX
            if (xhr.readyState !== 4) return;

            //*Nota: recordar que 'outerHTML' hace lo mismo que 'innerHTML' solo que mejora la semántica
            //reemplazando el HTML agregado por el HTML innecesario, en este caso se reemplazan los <div>
            //con los data-include que tienen la URL ya que son innecesarios semánticamente
            if (xhr.status >= 200 && xhr.status < 300) {
                el.outerHTML = xhr.responseText; //Agregando HTML consumido a cada elemento con el 'data-include'
            } else {
                let message = xhr.statusText || "Error al cargar el archivo, verifica que estes haciendo la petición por http o https";
                //Agregando mensaje de error a cada elemento con el 'data-include'
                el.outerHTML = `<div><p>Error ${xhr.status}: ${message}</p></div>`;
            }
        });

        xhr.open("GET", url); //Petición GET(usando endpoint de las URLs del 'data-include')
        xhr.setRequestHeader("Content-type", "text/html; charset=utf8"); //Cabecera de la petición
        xhr.send(); //Enviando Petición
    }

    //Recorriendo todos los elementos que tengan el 'data-include' y ejecutando la función 'includeHTML(el,url)',
    //en la función se pasan como argumentos el elemento recorrido y el valor de cada 'data-include' que se recorra.
    document.querySelectorAll("[data-include]").forEach(el => includeHTML(el, el.getAttribute("data-include")));

});