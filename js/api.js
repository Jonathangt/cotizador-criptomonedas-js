class API{
    constructor(apikey){
        this.apikey = apikey;
    }
    
    async obtenerMonedasAPI(){
        const url = `https://min-api.cryptocompare.com/data/all/coinlist?api_key=${this.apikey}`;

        const urlObtenerMonedas = await fetch(url);

        const monedas = await urlObtenerMonedas.json();

        return{
            monedas
        }
    }

    async obtenerValores (moneda, criptomoneda){
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}&api_key=${this.apikey}`;
       // const url = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${criptomoneda}&tsyms=${moneda}&api_key=${this.apikey}`;

        /**Consultar en rest api */
        const urlConvertir = await fetch(url);
        const resultado = await urlConvertir.json();

        console.log('dasdad');
        console.log(resultado);
        return{
            resultado
        }
    }

}