var user = localStorage.getItem("user");
var password = localStorage.getItem("pass");
var credit = localStorage.getItem("balance");
var firstName = localStorage.getItem("name");

let currentBalance = credit;

const ExpRegOnlyNumbers=/^[0-9]+$/;

console.log(user);
console.log(password);
console.log(credit);
console.log(firstName);

accountStatus(currentBalance);
insertUsername(firstName);

//------------------------------- INICIA OPERACION RETIRO ------------------------------------

//FUNCION PARA REALIZAR RETIROS A CUENTA
function withdraw(){

    let amount = document.getElementById("withdrawal").value;
    
    let emptyField = evaluateEmptyField(amount);

    if(emptyField == true){
        errorMessage("Es necesario llenar el campo","messageWithdrawal");
    }
    else{
        //mensajeOK("campo no vacio", "mensajeRetiro");
        let isWhole = validateIsInteger(amount);

        if(isWhole){
            //mensajeOK("son numeros enteros");
            let greaterThanBalance = validateGreaterThanAvailableBalance(amount);
            if(greaterThanBalance){
                errorMessage("No tienes suficiente saldo disponible","messageWithdrawal");
                clearInputs("withdrawal");
            }
            else{
                //mensajeOK("la cantidad no es mayor que el saldo disponible");
                let minorBalance = validateBalanceLessThan10(amount);

                if(minorBalance){
                    errorMessage("Retiro no procedente, el saldo no puede ser menor a $10.00 pesos","messageWithdrawal");
                    clearInputs("withdrawal");
                }
                else{
                    //mensajeOK("una vez retirado el saldo no sera menor de $10.00 pesos");
                    withdrawalAuthorization(amount);
                }
            }
        }
        else{
            errorMessage("El dato ingresado no es un numero entero","messageWithdrawal");
            clearInputs("withdrawal");
        }
    }
}

//FUNCION QUE EVALUA SI LA CANTIDAD A RETIRAR ES MAYOR AL SALDO DISPONIBLE
function validateGreaterThanAvailableBalance(amount){
    let number = parseInt(amount);
    let result = false;

    if((number>currentBalance)){
        result = true;
    }
    return result;
}

function validateBalanceLessThan10(amount){
    let number = parseInt(amount);
    if((currentBalance-number)<10){
        return true;
    }
    else{
        return false;
    }
}

//FUNCION QUE AUTORIZA EL RETIRO SI LA CANTIDAD NO ES MAYOR QUE EL SALDO
function withdrawalAuthorization(amount){
    currentBalance -= amount;
    updateBalance(currentBalance);
    let message = "saldo retirado: $ "+amount+".00 mx";
    clearInputs("withdrawal");
    messageOK(message, "messageWithdrawal");
}


//------------------------- INICIA SECCION OPERACION DEPOSITO -----------------------------

//FUNCION PARA REALIZAR DEPOSITOS A CUENTA
function toDeposit(){
    let amount = document.getElementById("deposit").value;

    let emptyField = evaluateEmptyField(amount);

    if(emptyField == true){
        errorMessage("Es necesario llenar los campos","deposit-message");
    }
    else{
        //mensajeOK("campo no vacio");
        let isWhole = validateIsInteger(amount);

        if(isWhole){
            //mensajeOK("la cantidad es entero");
            let isOlder = validateDeposit(amount);

            if(isOlder){
                //mensajeOK("EXCELENTE, tu saldo no es mayor que 990 pesos");
                authorizedDeposit(amount);
            }
            else{
                errorMessage("No procedente, tu saldo no puede ser mayor a 990 pesos","deposit-message");
                clearInputs("deposit");
            }

        }
        else{
            errorMessage("El dato ingresado no es un numero entero","deposit-message");
            clearInputs("deposit");
        }
    }
}

//FUNCION PARA EVALUAR SI LA CANTIDAD + SALDO ACTUAL NO ES MAYOR QUE 990 PESOS
function validateDeposit(amount){

    let resultSum = addition(currentBalance,amount);

    if(resultSum < 990){
        return true;
    }
    else{
        return false;
    }
}

//FUNCION PARA LA AUTORIZACION DE DEPOSITO
function authorizedDeposit(amount){
    currentBalance+=parseInt(amount);
    updateBalance(currentBalance);
    let message = "cantidad depositado: $ "+amount+".00 mx";
    clearInputs("deposit");
    messageOK(message,"deposit-message");
}

//--------------------------- INICIA FUNCIONES ADICIONALES POR OPERACION ---------------------

//FUNCION PARA ACTUALIZAR EL SALDO
function updateBalance(currentBalance){
    document.getElementById("balance").innerText = currentBalance;
}

//FUNCION PARA VERIFICAR SI EL FORMATO INGRESADO SOLO SON NUMEROS ENTEROS
function validateIsInteger(amount){

    if(ExpRegOnlyNumbers.test(amount)){
        return true;
    }
    else{
        return false;
    }
}

//FUNCION PARA MOSTRAR MENSAJES DE ERROR
function errorMessage(message, identifier){
    console.log(message);
    document.getElementById(identifier).innerText = message;
}

//FUNCION PARA MOSTRAR EL MENSAJE DE AUTORIZACION DE RETIRO O DEPOSITO
function messageOK(message,identifier){
    console.log(message);
    document.getElementById(identifier).innerText = message;
}

//FUNCION QUE EVALUA SI EL USUARIO INGRESO ALGUN DATO EN EL INPUT
function evaluateEmptyField(amount){
    let empty = false;

    if(amount == ""){
        empty = true;
    }

    return empty;
}

//FUNCION OPERACION SUMA
function addition(currentBalance,amount){
    let number1 = currentBalance;
    let number2 = parseInt(amount);
    let result = number1+number2;
    return result;
}

//FUNCION OPERACION RESTA
function subtraction(currentBalance,amount){
    let number1 = currentBalance;
    let number2 = parseInt(amount);
    let result = number1-number2;
    return result;
}

//FUNCION QUE SE ACTIVA AL INICIO PARA PONER EL SALDO ACTUAL, SOLO SE EJECUTA UNA VEZ
function accountStatus(currentBalance){
    document.getElementById("balance").innerText = currentBalance;
}

//FUNCION PARA LIMPIAR LOS INPUTS
function clearInputs(identifier){
    document.getElementById(identifier).value = "";
}

//FUNCION PARA AGREGAR EL NOMBRE DEL USUARIO EN LA INTERFAZ DE BIENVENIDA
function insertUsername(firstName){
    document.getElementById("username").innerText = firstName;
}

function SignOff(){
    localStorage.getItem("user","");
    localStorage.getItem("pass","");
    localStorage.getItem("balance","");
    localStorage.getItem("name","");
    window.location.replace('index.html');
}

//Al seleccionar una cuenta, debes ingresar el password asociado a la cuenta. Si el password es incorrecto,
    //debes notificar al usuario y permitirle intentarlo nuevamente.

    //Al seleccionar ingresar monto, el usuario debe escribir el monto a ingresar. Al ingresar el monto, debe 
    //mostrarle al usuario el monto ingresado y el nuevo saldo total.

    //Al seleccionar retirar monto, el usuario debe escribir el monto a retirar. Al retirar el monto, debe 
    //mostrarle al usuario el monto retirado y el nuevo saldo total.

    //una cuenta no debe de tener más de $990 y menos de $10