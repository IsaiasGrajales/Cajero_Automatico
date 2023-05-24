var usuario = localStorage.getItem("user");
var contrasenia = localStorage.getItem("pass");
var saldo = localStorage.getItem("saldo");
var nombre = localStorage.getItem("nombre");

let saldoActual = saldo;

const ExpRegSoloNumeros=/^[0-9]+$/;

console.log(usuario);
console.log(contrasenia);
console.log(saldo);
console.log(nombre);

estadoCuenta(saldoActual);
insertarNombreUsuario(nombre);

//------------------------------- INICIA OPERACION RETIRO ------------------------------------

//FUNCION PARA REALIZAR RETIROS A CUENTA
function retirar(){

    let cantidad = document.getElementById("retiro").value;
    
    let campoVacio = evaluarCampoVacio(cantidad);

    if(campoVacio == true){
        errorMesage("Es necesario llenar el campo","mensajeRetiro");
    }
    else{
        //mensajeOK("campo no vacio", "mensajeRetiro");
        let esEntero = validarEsEntero(cantidad);

        if(esEntero){
            //mensajeOK("son numeros enteros");
            let mayorQueSaldo = evaluarMayorSaldoDisponible(cantidad);
            if(mayorQueSaldo){
                errorMesage("No tienes suficiente saldo disponible","mensajeRetiro");
                limpiarInputs("retiro");
            }
            else{
                //mensajeOK("la cantidad no es mayor que el saldo disponible");
                let saldoNoMenor = saldoNoMenorDiez(cantidad);

                if(saldoNoMenor){
                    errorMesage("Retiro no procedente, el saldo no puede ser menor a $10.00 pesos","mensajeRetiro");
                    limpiarInputs("retiro");
                }
                else{
                    //mensajeOK("una vez retirado el saldo no sera menor de $10.00 pesos");
                    autorizacionRetiro(cantidad);
                }
            }
        }
        else{
            errorMesage("El dato ingresado no es un numero entero","mensajeRetiro");
            limpiarInputs("retiro");
        }
    }
}

//FUNCION QUE EVALUA SI LA CANTIDAD A RETIRAR ES MAYOR AL SALDO DISPONIBLE
function evaluarMayorSaldoDisponible(cantidad){
    let numero = parseInt(cantidad);
    let resultado = false;

    if((numero>saldoActual)){
        resultado = true;
    }
    return resultado;
}

function saldoNoMenorDiez(cantidad){
    let numero = parseInt(cantidad);
    if((saldoActual-numero)<10){
        return true;
    }
    else{
        return false;
    }
}

//FUNCION QUE AUTORIZA EL RETIRO SI LA CANTIDAD NO ES MAYOR QUE EL SALDO
function autorizacionRetiro(cantidad){
    saldoActual -= cantidad;
    actualizarSaldo(saldoActual);
    let mensaje = "saldo retirado: $ "+cantidad+".00 mx";
    limpiarInputs("retiro");
    mensajeOK(mensaje, "mensajeRetiro");
}


//------------------------- INICIA SECCION OPERACION DEPOSITO -----------------------------

//FUNCION PARA REALIZAR DEPOSITOS A CUENTA
function depositar(){
    let cantidad = document.getElementById("deposito").value;

    let campoVacio = evaluarCampoVacio(cantidad);

    if(campoVacio == true){
        errorMesage("Es necesario llenar el campo","mensajeDeposito");
    }
    else{
        //mensajeOK("campo no vacio");
        let esEntero = validarEsEntero(cantidad);

        if(esEntero){
            //mensajeOK("la cantidad es entero");
            let seraMayor = evaluarDeposito(cantidad);

            if(seraMayor){
                //mensajeOK("EXCELENTE, tu saldo no es mayor que 990 pesos");
                autorizacionDeposito(cantidad);
            }
            else{
                errorMesage("No procedente, tu saldo no puede ser mayor a 990 pesos","mensajeDeposito");
                limpiarInputs("deposito");
            }

        }
        else{
            errorMesage("El dato ingresado no es un numero entero","mensajeDeposito");
            limpiarInputs("deposito");
        }
    }
}

//FUNCION PARA EVALUAR SI LA CANTIDAD + SALDO ACTUAL NO ES MAYOR QUE 990 PESOS
function evaluarDeposito(cantidad){

    let resultadoSuma = suma(saldoActual,cantidad);

    if(resultadoSuma < 990){
        return true;
    }
    else{
        return false;
    }
}

//FUNCION PARA LA AUTORIZACION DE DEPOSITO
function autorizacionDeposito(cantidad){
    saldoActual+=parseInt(cantidad);
    actualizarSaldo(saldoActual);
    let mensaje = "cantidad depositado: $ "+cantidad+".00 mx";
    limpiarInputs("deposito");
    mensajeOK(mensaje,"mensajeDeposito");
}

//--------------------------- INICIA FUNCIONES ADICIONALES POR OPERACION ---------------------

//FUNCION PARA ACTUALIZAR EL SALDO
function actualizarSaldo(saldoActual){
    document.getElementById("disponible").innerText = saldoActual;
}

//FUNCION PARA VERIFICAR SI EL FORMATO INGRESADO SOLO SON NUMEROS ENTEROS
function validarEsEntero(cantidad){

    if(ExpRegSoloNumeros.test(cantidad)){
        return true;
    }
    else{
        return false;
    }
}

//FUNCION PARA MOSTRAR MENSAJES DE ERROR
function errorMesage(mensaje, identificador){
    console.log(mensaje);
    document.getElementById(identificador).innerText = mensaje;
}

//FUNCION PARA MOSTRAR EL MENSAJE DE AUTORIZACION DE RETIRO O DEPOSITO
function mensajeOK(mensaje,identificador){
    console.log(mensaje);
    document.getElementById(identificador).innerText = mensaje;
}

//FUNCION QUE EVALUA SI EL USUARIO INGRESO ALGUN DATO EN EL INPUT
function evaluarCampoVacio(cantidad){
    let vacio = false;

    if(cantidad == ""){
        vacio = true;
    }

    return vacio;
}

//FUNCION OPERACION SUMA
function suma(saldoActual,cantidad){
    let numero1 = saldoActual;
    let numero2 = parseInt(cantidad);
    let resultado = numero1+numero2;
    return resultado;
}

//FUNCION OPERACION RESTA
function resta(saldoActual,cantidad){
    let numero1 = saldoActual;
    let numero2 = parseInt(cantidad);
    let resultado = numero1-numero2;
    return resultado;
}

//FUNCION QUE SE ACTIVA AL INICIO PARA PONER EL SALDO ACTUAL, SOLO SE EJECUTA UNA VEZ
function estadoCuenta(saldoActual){
    document.getElementById("disponible").innerText = saldoActual;
}

//FUNCION PARA LIMPIAR LOS INPUTS
function limpiarInputs(identificador){
    document.getElementById(identificador).value = "";
}

//FUNCION PARA AGREGAR EL NOMBRE DEL USUARIO EN LA INTERFAZ DE BIENVENIDA
function insertarNombreUsuario(nombre){
    document.getElementById("nombre-usuario").innerText = nombre;
}

function cerrarSesion(){
    localStorage.getItem("user","");
    localStorage.getItem("pass","");
    localStorage.getItem("saldo","");
    localStorage.getItem("nombre","");
    window.location.replace('index2.html');
}

//Al seleccionar una cuenta, debes ingresar el password asociado a la cuenta. Si el password es incorrecto,
    //debes notificar al usuario y permitirle intentarlo nuevamente.

    //Al seleccionar ingresar monto, el usuario debe escribir el monto a ingresar. Al ingresar el monto, debe 
    //mostrarle al usuario el monto ingresado y el nuevo saldo total.

    //Al seleccionar retirar monto, el usuario debe escribir el monto a retirar. Al retirar el monto, debe 
    //mostrarle al usuario el monto retirado y el nuevo saldo total.

    //una cuenta no debe de tener más de $990 y menos de $10