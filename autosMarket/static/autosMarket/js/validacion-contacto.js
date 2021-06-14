const d = document;

function contactFormValidations(){
    //Seleccionando todos los elementos del formulario que tengan el atributo 'required'
    const $inputs = d.querySelectorAll(".contact-form [required]");

    console.log($inputs);

    //Recorriendo inputs.
    $inputs.forEach(input => {
        const $span = d.createElement("span");//Creando etiqueta <span>
        $span.id = input.name; //Agregando id a cada <span> con el valor del atributo 'name' de los inputs
        $span.textContent = input.title;//Agregando el valor del atributo 'title' como contenido de texto a los <span>
        // Agregando a cada <span> la clase '.contact-form-error' y la clase '.none'
        $span.classList.add("contact-form-error","none");
        //Agregando cada <span> como hermano siguiente de cada input
        input.insertAdjacentElement("afterend",$span);
    
    });

    //Evento 'keyup' se activa al soltar una tecla
    d.addEventListener("keyup",e => {
        if (e.target.matches(".contact-form [required]")) {//Al escribir en un input...
            let $input = e.target, //Guardando elemento que genera el evento
                //Guardando valor del atributo 'pattern' o el 'data-pattern' creado en el <texarea>
                pattern = $input.pattern || $input.dataset.pattern;
                // console.log($input,pattern);

                 //Si los inputs tienen expresiones regulares y los inputs no estan vacios...
                if (pattern && $input.value !== "") {
                    // console.log("El input tiene patron");
                    let regex = new RegExp(pattern); //Guardando expresion regular de los inputs
                    return !regex.exec($input.value) //Si no existe una coincidencia del RegExp y el texto ingresado
                            //Se agrega id con el valor del 'name' de los inputs y se agrega la clase .is-active
                           ?d.getElementById($input.name).classList.add("is-active")
                           //Se agrega id con el valor del 'name' de los inputs y se elimina la clase .is-active
                           :d.getElementById($input.name).classList.remove("is-active");
                }

        }
    });
     
}

d.addEventListener("DOMContentLoaded",() => {
    contactFormValidations();
});