let user; //variable que almacena el email del usuario
let password; //variable que almacena la contraseña
let emptyFields; //variable que almacena un valor booleano para los inputs
let validData; //variable de tipo booleano para validar el formato del email y contraseña

let loginAccess;//variable de tipo booleano que almacena el resultado de la funcion login()

//variable que almacena el formato del email
const formatEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

//variable que almacena el formato de la contraseña
const formatPassword = /^\w+$/;

const formatPassword2 = /[A-Za-z0-9&@_/+%]+/;

//las cuentas por default de acuerdo a la actividad
var accounts = [
    {email: "Mali28@yahoo.com", password:"mIa715g3" , balance: 200, name: "Meli"},
    {email: "Gera5@outlook.com", password:"a4RerM95", balance: 290, name: "Gera"},
    {email: "Maui34@gmail.com", password:"ami5aJ", balance: 67, name: "Maui"}
];

//FUNCION DE BOTON ENVIAR DATOS
function getInto(){
    user = document.getElementById("email").value;
    password = document.getElementById("password").value;
    
    //validamos si los campos estan vacios o no
    emptyFields = validateFields(user,password);

    if(emptyFields==true){
        messageError("It is necessary to fill in all fields","message");
    }
    else{
        validData = validateData(user,password);

        if(validData){
            //console.log("formato usuario y contraseña correctos");
            loginAccess = login(user,password);

            if(loginAccess==true){
                console.log("ACCESO CONCEDIDO");
                window.location.replace('home.html');
            }
            else{
                messageError("Incorrect Username or Password","message");
                cleanInputs("email","password");
            }
        }
        else{
            messageError("ERROR, incorrect username or password format","message");
            cleanInputs("email","password");
        }
    }
}

//FUNCION PARA VERIFICAR SI LOS CAMPOS ESTAN VACIOS O NO
function validateFields(user, password){
    let result = false;

    if((user == "") && (password=="")){
        result = true;
    }
    else if((user!="") && (password=="")){
        result = true;
    }
    else if((user=="") && (password!="")){
        result = true;
    }

    return result;
}

//FUNCION PARA VALIDAR DATOS DE USUARIO Y CONTRASEÑA CORRECTOS
function validateData(user, password){

    let validEmail = validateEmail(user);
    let validPassword = validatePassword(password);

    if((validEmail == true) && (validPassword == true)){
        return true;
    }
    else{
        return false;
    }
}

//FUNCION PARA VERIFICAR SI EL FORMATO DEL CORREO ES CORRECTO
function validateEmail(user){
    if(formatEmail.test(user)){
        return true;
    }
    else{
        return false;
    }
}

//FUNCION PARA VERIFICAR SI EL FORMATO DE LA CONTRASEÑA ES CORRECTA
function validatePassword(password){
    if(formatPassword.test(password)){
        return true;
    }
    else{
        false;
    }
}

//FUNCION PARA ACCEDER AL SISTEMA
function login(user,password){
    let accessUser = verifyUser(user);
    let accessPass = verifyPassword(password);

    if((accessUser==true) && (accessPass==true)){
        return true;
    }
    else{
        return false;
    }
}

//FUNCION PARA VERIFICAR SI EL USUARIO INGRESADO COINCIDE CON LA TABLA DE VALORES POR DEFAULT
function verifyUser(user){
    let users = [];
    let userFound = false;

    for(let i=0; i<accounts.length; i++){
        users[i] = accounts[i].email;
    }

    for(let j=0; j<users.length; j++){
        if(users[j] == user){
            localStorage.setItem("user",users[j]);
            userFound = true;
            break;
        }
    }

    return userFound;
}

//FUNCION PARA VERIFICAR SI LA CONTRASEÑA INGRESADO COINCIDE CON LA TABLA DE VALORES POR DEFAULT
function verifyPassword(password){
    let passs = [];
    let balances = [];
    let names = [];
    let passwordFound = false;

    for(let i=0; i<accounts.length; i++){
        passs[i] = accounts[i].password;
        balances[i] = accounts[i].balance;
        names[i] = accounts[i].name;
    }

    for(let j=0; j<passs.length; j++){
        if(passs[j] == password){
            localStorage.setItem("pass",passs[j]);
            localStorage.setItem("balance",balances[j]);
            localStorage.setItem("name",names[j]);
            passwordFound = true;
            break;
        }
    }

    return passwordFound;
}

//FUNCION PARA LOS MENSAJES DE ERROR
function messageError(message,identifier){
    console.log(message);
    document.getElementById(identifier).innerText = message;
}

function cleanInputs(identifier1,identifier2){
    document.getElementById(identifier1).value = "";
    document.getElementById(identifier2).value = "";
}