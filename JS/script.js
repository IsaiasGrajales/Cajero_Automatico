let usuario; //variable que almacena el email del usuario
let contrasenia; //variable que almacena la contraseña
let camposVacios; //variable que almacena un valor booleano para los inputs
let existenEspaciosVacios; //variable que almacena un valor booleano si existen espacios en los datos
let sinEspacios=false; //variable de tipo booleano que determina el resultado final de los campos
//si no existen campos vacios
let datoValido; //variable de tipo booleano para validar el formato del email y contraseña

let loginAcceso;//variable de tipo booleano que almacena el resultado de la funcion login()

//variable que almacena el formato del email
const formatEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

//variable que almacena el formato de la contraseña
const formatPassword = /^\w+$/;

const formatPassword2 = /[A-Za-z0-9&@_/+%]+/;

//las cuentas por default de acuerdo a la actividad
var cuentas = [
    {correo: "Mali28@yahoo.com", contrasenia:"mIa715g3" , saldo: 200, nombre: "Meli"},
    {correo: "Gera5@outlook.com", contrasenia:"a4RerM95", saldo: 290, nombre: "Gera"},
    {correo: "Maui34@gmail.com", contrasenia:"ami5aJ", saldo: 67, nombre: "Maui"}
];

//FUNCION DE BOTON ENVIAR DATOS
function ingresar(){
    usuario = document.getElementById("email").value;
    contrasenia = document.getElementById("password").value;
    
    //validamos si los campos estan vacios o no
    camposVacios = validarCampos(usuario,contrasenia);

    if(camposVacios==true){
        mensajeError("Es necesario llenar todos los campos","mensaje");
    }
    else{
        //console.log("ambos campos tienen datos");

        //validamos si existen espacios vacios en los campos ingresados
        existenEspaciosVacios = espaciosVacios(usuario,contrasenia);
        if(existenEspaciosVacios==true){
            mensajeError("Usuario o Contraseña Incorrectos","mensaje");
            limpiarInputs("email","password");
        }
        else{
            //console.log("excelente, no existen espacios vacios en los campos ingresados");
            sinEspacios = true;
        }
    }

    if(sinEspacios==true){
        datoValido = validarDatos(usuario,contrasenia);

        if(datoValido){
            //console.log("formato usuario y contraseña correctos");
            loginAcceso = login(usuario,contrasenia);

            if(loginAcceso==true){
                //console.log("ACCESO CONCEDIDO");
                window.location.replace('home.html');
            }
            else{
                mensajeError("Usuario o Contraseña Incorrectos","mensaje");
                limpiarInputs("email","password");
            }
        }
        else{
            mensajeError("ERROR, formato usuario o contraseña incorrectos","mensaje");
            limpiarInputs("email","password");
        }
    }
    
}

//FUNCION PARA VERIFICAR SI LOS CAMPOS ESTAN VACIOS O NO
function validarCampos(usuario, contrasenia){
    let resultado = false;

    if((usuario == "") && (contrasenia=="")){
        resultado = true;
    }
    else if((usuario!="") && (contrasenia=="")){
        resultado = true;
    }
    else if((usuario=="") && (contrasenia!="")){
        resultado = true;
    }

    return resultado;
}

//FUNCION PARA VERIFICAR SI EXISTE ESPACIOS EN BLANCO EN LOS DATOS
function espaciosVacios(usuario, contrasenia){
    let espaciosUser = false;
    let espaciosPass = false;
    let cont = 0;

    while (!espaciosUser && (cont < usuario.length)) {
        if (usuario.charAt(cont) == " ")
        espaciosUser = true;
        cont++; 
    }

    cont = 0;
   
    while (!espaciosPass && (cont < contrasenia.length)) {
        if (contrasenia.charAt(cont) == " ")
        espaciosPass = true;
        cont++;
    }

    if((espaciosUser==true) && (espaciosPass==false)){
        return true;
    }
    else if((espaciosUser==false) && (espaciosPass==true)){
        return true;
    }
    else if((espaciosUser==true) && (espaciosPass==true)){
        return true;
    }
    else if((espaciosUser==false) && (espaciosPass==false)){
        return false;
    }
}

//FUNCION PARA VALIDAR DATOS DE USUARIO Y CONTRASEÑA CORRECTOS
function validarDatos(usuario, contrasenia){

    let emailValido = validarEmail(usuario);
    let contraseniaValido = validarPassword(contrasenia);

    if((emailValido == true) && (contraseniaValido == true)){
        return true;
    }
    else{
        return false;
    }
}

//FUNCION PARA VERIFICAR SI EL FORMATO DEL CORREO ES CORRECTO
function validarEmail(usuario){

    if(formatEmail.test(usuario)){
        return true;
    }
    else{
        return false;
    }
}

//FUNCION PARA VERIFICAR SI EL FORMATO DE LA CONTRASEÑA ES CORRECTA
function validarPassword(contrasenia){
    if(formatPassword.test(contrasenia)){
        return true;
    }
    else{
        false;
    }
}

//FUNCION PARA ACCEDER AL SISTEMA
function login(usuario,contrasenia){
    let accesoUser = verificarUsuario(usuario);
    let accesoPass = verificarPassword(contrasenia);

    if((accesoUser==true) && (accesoPass==true)){
        return true;
    }
    else{
        return false;
    }
}

//FUNCION PARA VERIFICAR SI EL USUARIO INGRESADO COINCIDE CON LA TABLA DE VALORES POR DEFAULT
function verificarUsuario(usuario){
    let usuarios = [];
    let usuarioEncontrado = false;

    for(let i=0; i<cuentas.length; i++){
        usuarios[i] = cuentas[i].correo;
    }

    for(let j=0; j<usuarios.length; j++){
        if(usuarios[j] == usuario){
            localStorage.setItem("user",usuarios[j]);
            usuarioEncontrado = true;
            break;
        }
    }

    return usuarioEncontrado;
}

//FUNCION PARA VERIFICAR SI LA CONTRASEÑA INGRESADO COINCIDE CON LA TABLA DE VALORES POR DEFAULT
function verificarPassword(contrasenia){
    let passs = [];
    let saldos = [];
    let nombres = [];
    let passwordEncontrado = false;

    for(let i=0; i<cuentas.length; i++){
        passs[i] = cuentas[i].contrasenia;
        saldos[i] = cuentas[i].saldo;
        nombres[i] = cuentas[i].nombre;
    }

    for(let j=0; j<passs.length; j++){
        if(passs[j] == contrasenia){
            localStorage.setItem("pass",passs[j]);
            localStorage.setItem("saldo",saldos[j]);
            localStorage.setItem("nombre",nombres[j]);
            passwordEncontrado = true;
            break;
        }
    }

    return passwordEncontrado;
}

//FUNCION PARA LOS MENSAJES DE ERROR
function mensajeError(mensaje,identificador){
    console.log(mensaje);
    document.getElementById(identificador).innerText = mensaje;
}

function limpiarInputs(identificador1,identificador2){
    document.getElementById(identificador1).value = "";
    document.getElementById(identificador2).value = "";
}