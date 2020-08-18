class Interfaz{

    constructor(){
        this.init(); /**inicializando contructor */
    }

    init(){
        this.construirSelect();
    }

    construirSelect(){
        api.obtenerMonedasAPI()
            .then(monedas =>{
                /**Crear un select de opciones */
                const select = document.querySelector('#criptomoneda');

                /**Iterar por los resultados de la api */
                for(const [key, value] of Object.entries(monedas.monedas.Data)){

                   /**Añadir el Symbol y el nombre como opciones */
                    const opcion = document.createElement('option');
                    opcion.value = value.Symbol;
                    opcion.appendChild(document.createTextNode(value.CoinName));
                    select.appendChild(opcion);
                }
              
            })
    }


    mostrarMensajes(mensaje, clases){
        const div = document.createElement('div');
        div.className = clases;
        div.appendChild(document.createTextNode(mensaje));

        /**Seleccionar mensajes */
        const divMensaje = document.querySelector('.mensajes');/**Class 'mensajes' html */
        divMensaje.appendChild(div);

        /**Mostrar contenido */
        setTimeout(() => {
            document.querySelector('.mensajes div').remove();
        }, 3000);
    }

    /**Imprime el resultado de la api (cotizacion)*/
    mostrarResultados(resultado, moneda, crypto){
        console.log(resultado[crypto][moneda]);
        /*En caso de un resultado anterior, lo oculta para que se muestre el spin de carga*/
        const resultadoAnterior = document.querySelector('#resultado > div');

        if(resultadoAnterior) {
            resultadoAnterior.remove();
       }

        const datosMoneda = resultado[crypto][moneda];

        /**Mostrar dos decimales al valor del la criptomoneda */
        let precio = datosMoneda.PRICE.toFixed(2),
            porcentaje = datosMoneda.CHANGEPCTDAY.toFixed(2),
            /**Formula para transformar fecha tipo unix -- siempre es por 1000
             * toLocaleDateString muestra la fecha a un formato segun el codigo de pais que se envie como parametro
             */
            fechaActualizacion = new Date(datosMoneda.LASTUPDATE * 1000).toLocaleDateString('es-EC');

        // construir el template
        /** <img src=${datosMoneda.IMAGEURL} alt=""> */
        let templateHTML = 
        `<div class="card bg-warning">
             <div class="card-body text-light">
                  <h2 class="card-title">Resultado:</h2>
                  <p>El Precio de ${datosMoneda.FROMSYMBOL} a moneda ${datosMoneda.TOSYMBOL} es de: $ ${precio}</p>
                  <p>Variación del último día: %${porcentaje}</p>
                  <p>Última Actualización: ${fechaActualizacion}</p>                 
             </div>
        </div>`;

        this.mostrarOcultarSpinner('block');

        setTimeout(() => {
            /* insertar el resultado*/
           document.querySelector('#resultado').innerHTML = templateHTML;

           /* ocultar el spinner*/
           this.mostrarOcultarSpinner('none');
        }, 3000);    
    }

    /* Mostrar un spinner de carga al enviar la cotización*/
    mostrarOcultarSpinner(vista) {
        const spinner = document.querySelector('.contenido-spinner');
        spinner.style.display = vista;
   }
}