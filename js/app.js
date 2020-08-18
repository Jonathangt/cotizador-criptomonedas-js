/**Leer el formulario */
const formulario = document.querySelector('#formulario');

const c = console.log;
const api = new API('567021fadc448dc0e00ebd1e10a87acb103fd7b2a21cfd2c4ae8086e8e6c8ba3');

const ui = new Interfaz();


api.obtenerMonedasAPI();


/*EventListener*/
formulario.addEventListener('submit', (e)=>{
    e.preventDefault();

    /**Leer la moneda seleccionada */
    const monedaSelect = document.querySelector('#moneda');
    const monedaSeleccionada = monedaSelect.options[monedaSelect.selectedIndex].value;

    /**Leer la criptomoneda seleccionada */
    const criptoMonedaSelect = document.querySelector('#criptomoneda');
    const criptoMonedaSeleccionada = criptoMonedaSelect.options[criptoMonedaSelect.selectedIndex].value;

    /**Comprobar que ambos combosbox esten seleccionados */
    if(monedaSeleccionada === '' || criptoMonedaSeleccionada === ''){
        ui.mostrarMensajes('Seleccione una opción en ambos campos', 'alert bg-danger text-center');
    }else{
        /**Consultando a la api */
        api.obtenerValores(monedaSeleccionada, criptoMonedaSeleccionada)
            .then(data =>{
                ui.mostrarResultados(data.resultado.RAW, monedaSeleccionada, criptoMonedaSeleccionada);
                console.log(ui)
            })
    }
});



