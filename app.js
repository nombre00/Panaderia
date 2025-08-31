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

/* correo = "correo";
function setCookie(correo,mail,){
    
} */

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
    }, null);
};


// Inicialización de un carrito de compras.
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];


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

// Datos de la página catálogo.
const botonesCompra = document.querySelectorAll('.boton_compra');  // Obtener todos los botones con la clase "boton_compra".
const contadorCarrito = document.getElementById('contador-carrito');  // Obtiene el contador de productos en el carrito.
const precioTotal = document.getElementById('precio-total');  // Obtiene va lariable que guarda el precio total del carrito.


function init(){
    // Antes de acceder a cualquier funcionalidad se pregunta si existe un elemento exclusivo de cada página, cosa de asegurarnos
    // que estemos en la página con los datos necesarios para que cada código corra, sino, no funciona.
    
    
    // Funcionalidad página inicio.
    // Si existe la forma de inicio se accede a esta funcionalidad.
    if (form_inicio){
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
    }





    // Funcionalidad página carrito.



    // Funcionalidad página catálogo.
    // Si existen botones de compra en la página accedemos a esta funcionalidad.
    if (botonesCompra.length > 0) {
        // Actualizar el contador al cargar la página.
        actualizarContadorCarrito();
        // Función para actualizar el contador del carrito
        function actualizarContadorCarrito() {
            if (contadorCarrito && precioTotal) {
                const totalProductos = carrito.reduce((sum, item) => sum + item.cantidad, 0);
                contadorCarrito.textContent = totalProductos;
                // .reduce hace que la linea no se ejecute si no hay algo que reducir. Esta parte no funciona, no se por qué.
                const totalPrecio = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
                precioTotal.textContent = totalPrecio; 
            }
        }
        // Función que obtiene la info del producto asociado a cada botón asociado a la clase producto.
        function obtenerDetallesProducto(boton) {
            // Usamos el método closest('.producto') para encontrar el elemento <article class="producto"> más cercano que contiene
            // el botón cliqueado. Esto devuelve el contenedor del producto (que incluye la imagen, título, descripción, precio, etc.).
            const article = boton.closest('.producto');
            const nombre = article.querySelector('h4').textContent; // Tomamos el nombre del producto.
            // Aprobechamos el <strong> que usamos para remarcar el precio y lo usamos como marcador para recuperar el precio.
            const precioTexto = article.querySelector('p strong').textContent; // Tomamos el precio del producto, ejemplo: "Precio: $19.000".
            const precio = parseInt(precioTexto.replace(/[^0-9]/g, '')); // Eliminamos comas y espacios del número.
            // Tomamos la id del botón, usamos esa id en futuras adiciones para revisar si el producto ya existe en el carrito.
            const id = boton.id;
            // Guardamos todo dentro de una lista y la retornamos.
            return { id, nombre, precio, cantidad: 1 };
        }
        // Función que agrega un producto al carrito.
        function agregarAlCarrito(producto) {
            // Primero revisamos que el producto que queremos agregar no exista ya.
            const existente = carrito.find(item => item.id === producto.id);
            // Si existe le aumentamos la cantidad.
            if (existente) {
                existente.cantidad += 1;
            } else {
                // Si no existe le agregamos el nuevo producto al carrito.
                carrito.push(producto);
            }
            // Hecho el cambio guardamos el carrito en el local storage como un JSON, llave ('carrito'): valor (info del carrito).
            localStorage.setItem('carrito', JSON.stringify(carrito));
            // Imprime el carrito en la consola del navegador.
            console.log('Carrito actualizado:', carrito);
            // Muestra un mensaje en pantalla avisándole al usuario que el producto se agregó al carrito.
            alert(`${producto.nombre} agregado al carrito!`);
            actualizarContadorCarrito(); // Actualizar el contador después de agregar.
        }
        // Iteramos por cada botón del NodeList 'botonesCompra' usando el método 'forEach'.
        botonesCompra.forEach(boton => {
            // Por cada botón escuchamos a ver si lo presionan.
            boton.addEventListener('click', () => {
                // Si lo presionan llamamos la funcion que toma la info del producto y la guarda en una variable.
                const producto = obtenerDetallesProducto(boton);
                agregarAlCarrito(producto); // Agregamos esa variable al carrito.
            });
        });
    }


    // Funcionalidad página perfil.



    // Funcionalidad página registrarse.
    // Si existe la forma de registro se accede a esta funcionalidad.
    if (form_registro){
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


    
}





// No tocar.
document.addEventListener("DOMContentLoaded", init);