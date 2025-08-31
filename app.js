// Función para recibir y guardar cookies en nuestra página.
function setCookie(name, value, maxTime){
    // El tiempo está en milisegundos, por eso la multiplicación por mil.
    // expireAt es para documentar.
    const expireAt = Date.now() + maxTime * 1000;
    // Abajo se definen las acciones.
    // Encriptamos los datos que la cookie guarda, definimos el tiempo de vida de la cookie, le decimos que la guarde y que se pued usar en tódas las páginas del sitio.
    // El único valor que estamos guardando es valor, el nombre es el keyValue para reconocer a la cookie.
    // Todos los signos igual tienen que estar juntitos.
    document.cookie = ` ${encodeURIComponent(name)}=${encodeURIComponent(value)}; Max-Age=${maxTime}; Path=/; SameSite=LAx`;
    // Esta segunda cookie es para avisar al usuario el tiempo de vida de la cookie de arriba.
    document.cookie = ` ${encodeURIComponent(name)}_expireAt= ${expireAt}; Max-Age=${maxTime}; Path=/; SameSite=LAx`;
};
correo = "correo";
function setCookie(correo,mail,){
    
}

// Esta función es para conseguir la información dentro de la cookie.
function getCookie(name){
    const target = encodeURIComponent(name) + "=";
    // Una promesa es una función o una acción que va a esperar a un resultado para ejecutarse.
    // Mientras espera el resultado de la promesa se ejecuta la siguiente linea de código.
    // 'acc' sería un objeto de la cadena y 'c' sería la cadena entera.
    document.cookie.split("; ").reduce((acc, c) => {
        // Retorna una subcadena que se todos los datos despues del nombre de la cookie.
        if(c.startsWith(target)) return decodeURIComponent(c.substring(target.length));
        return acc;
    }
        , null);
};


// Estos serían los parámetros de una función, así se le pasan las variables.
// Lo que hace document es recorrer el dump del html, la estructura del dump es un arbol.
// Por buenas prácticas lo que se toma del dump se hace antes de las funciones, como las variables globajes en java.

// Datos de la página inicio.
const boton_ingreso = document.getElementById("boton");
const mail = document.getElementById("mail");
const clave = document.getElementById("clave");
const registrar = document.getElementById("registrarse");
const form_inicio = document.getElementById("inicio")
const msg = document.getElementById("msg");
// Datos de la página registrarse.
const r_mail = document.getElementById("mail_regitro");
const r_clave = document.getElementById("clave_registro");
const form_registro = document.getElementById("formulario_registro");


function init(){
    
    
    // Funcionalidad página inicio.
    // Funcionalidad para ingresar al perfil.
    form_inicio.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("mail").value.trim();
    const pass = document.getElementById("clave").value.trim();
        if (!email) {
      msg.textContent = "Por favor, escribe un email válido.";
      return;
    }
      if (!pass) {
      msg.textContent = "Por favor, escribe una contraseña válido.";
      return;
    }
    const existing = getCookie("1001");
    if (existing) {
        msg.textContent = `Ya tenemos tu email (“${existing}”). Puedes ir a tu perfil.`;
    }
   // setCookie("Email", mail,240 * 1); // 1 Min
    msg.textContent = `${existing} y ${email+pass}`;
    })

    // Funcionalidad de botón registrase.
    registrar.addEventListener("click", () => {
    window.location.href = "registrarse.html";
    });





    // Funcionalidad página carrito.



    // Funcionalidad página catálogo.



    // Funcionalidad página perfil.



    // Funcionalidad página registrarse.
    form_registro.addEventListener("submit", (e) => {
        e.preventDefault();
        // Tomamos la información del formulario.
        const r_mail = document.getElementById("mail_regitro").trim();
        const r_clave = document.getElementById("clave_registro").trim();
        msg.textContent= r_mail+r_clave;
        // Revisamos que haya información en los campos.
        if (!r_mail) {
        msg.textContent = "Por favor, escribe un email válido.";
        return;
        }
        if (!r_clave) {
        msg.textContent = "Por favor, escribe una contraseña válido.";
        return;
        }
        // Si hay info creamos guardamos los datos en cookies.
        setCookie("1001", r_mail, 30);
        setCookie("2001", r_clave, 30);
        
        msg.textContent= r_mail+r_clave;
    })


    
}


// No tocar.
document.addEventListener("DOMContentLoaded", init);