// Función para recibir y guardar cookies en nuestra página.
function setCookie(name, value, maxTime){
    // El tiempo está en milisegundos, por eso la multiplicación por mil.
    // expireAt es para documentar.
    const expireAt = Date.now() + maxTime * 1000;
    // Abajo se definen las acciones.
    // Encriptamos los datos que la cookie guarda, definimos el tiempo de vida de la cookie, le decimos que la guarde y que se pued usar en tódas las páginas del sitio.
    // El único valor que estamos guardando es valor, el nombre es el keyValue para reconocer a la cookie.
    // Todos los signos igual tienen que estar juntitos.
    document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; Max-Age=${maxTime}; Path=/; SameSite=LAx`;
    // Esta segunda cookie es para avisar al usuario el tiempo de vida de la cookie de arriba.
    document.cookie = `${encodeURIComponent(name)}_expireAt= ${expireAt}; Max-Age=${maxTime}; Path=/; SameSite=LAx`;
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
    return document.cookie.split("; ").reduce((acc, c) => {
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
const r_mail = document.getElementById("mail_registro");
const r_clave = document.getElementById("clave_registro");
const form_registro = document.getElementById("formulario_registro");

// Datos de la página catálogo.
const botonesCompra = document.querySelectorAll('.boton_compra');  // Obtener todos los botones con la clase "boton_compra".
const contadorCarrito = document.getElementById('contador-carrito');  // Obtiene el contador de productos en el carrito.
const precioTotal = document.getElementById('precio-total');  // Obtiene va lariable que guarda el precio total del carrito.

// Datos de la página carrito de compras.
const botonVaciarCarrito = document.getElementById("borrar_carrito"); // Borra el carrito.
const listaCarrito = document.getElementById("lista_carrito"); // Lista de productos en el carrito.
const carritoVacio = document.getElementById("carrito_vacio"); // Mensaje que se muestra cuando el carrito está vacío.
const precioCarrito = document.getElementById("costo_carrito"); // Costo total del carrito.


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
        const existing_ini_mail = getCookie("1001");
        const existing_ini_clave = getCookie("2001");
        if (existing_ini_mail && existing_ini_mail === email && existing_ini_clave&& existing_ini_clave===pass) {
            window.location.href = "perfil.html";
            
            return;
        }
    // setCookie("Email", mail,240 * 1); // 1 Min
        msg.textContent = `${existing} y ${email+pass}`; // acá salta el error.
        })

        // Funcionalidad de botón registrase.
        registrar.addEventListener("click", () => {
        window.location.href = "registrarse.html";
        });
    }





    // Funcionalidad página carrito.
    if (botonVaciarCarrito){
        let flag = true;
        if (carrito.length === 0){
            flag = true;
        }else{
            falg = false
        }
        //console.log("el if del boton vaciar funciona")
        // Función para mostrar los productos del carrito.
        // Toma los elementos del carrego "carrito" y genera dinamicamente cada producto que se muestra en pantalla.
        function mostrarCarrito(){
            // Partimos vaciando la lista de productos del carrito.
            listaCarrito.innerHTML = '';
            // Luego verificamos el estado del carrio, si tiene o no productos.
            console.log(carrito.id);
            console.log(carrito.length);
            if (flag){
                console.log("si el carrito tiene longitud 0 se ve esto.")
                // Si el carrito está vacío:
                // Escondemos la lista.
                listaCarrito.style.display = "none";
                console.log("Si se corre todo el codigo hasta aca 1")
                // Mostramos el mensaje.
                carritoVacio.style.display = "block";
                console.log("Si se corre todo el codigo hasta aca 2")
                // Asignamos 0 al costo del carrito.
                precioCarrito.textContent = 0;
                console.log("Si se corre todo el codigo hasta aca 3")
                // Salimos.
                return;
            }
            console.log("Si el carrito tiene longitud más de 0 se ve esto.")
            // Si el carrito tiene productos.
            // Inicializamos el total.
            let total = 0;
            // Nos aseguramos que la lista sea visible.
            listaCarrito.style.display = "block";
            // Escondemos el mensaje.
            carritoVacio.style.display = "none";
            // Recorremos el arreglo carrito.
            // { id, nombre, precio, cantidad: 1, imagen }
            carrito.forEach(producto => {
                // Por cada producto en el carrito.
                // Creamos un elemento 'list item'.
                const li = document.createElement('li');
                // Le asignamos una clase de bootstrap y otra para manipularlo.
                li.classList.add('producto_lista_carrito'); // , 'list-group-item'
                // Le asignamos un id.
                li.id = `${producto.id}`;

                // Creamos un artículo que va air dentro de cada 'li'.
                const articulo = document.createElement('article');
                articulo.classList.add('producto_en_carrito', 'd-flex', 'align-items-center', 'gap-3'); // Opcional, bootstrap.

                // Creamos la imagen.
                const imagen = document.createElement('img');
                imagen.setAttribute('src', producto.imagen); // Usar producto.imagen para la ruta
                imagen.setAttribute('alt', producto.nombre);
                //imagen.classList.add('img-fluid', 'me-2'); // Opcional, bootstrap.
                imagen.style.width = '50px'; // Tamaño fijo para la imagen

                // Nombre
                const nombre = document.createElement('p');
                nombre.textContent = producto.nombre;
                //nombre.classList.add('mb-0', 'me-2'); // Opcional, bootstrap.

                // Precio.
                const precio = document.createElement('p');
                precio.textContent = `$${producto.precio}`;
                //precio.classList.add('mb-0', 'me-2'); // Opcional, bootstrap.

                // Cantidad
                const cantidad = document.createElement('p');
                cantidad.textContent = carrito.cantidad;

                // Subtotal
                const subtotal = document.createElement('p');
                subtotal.textContent = `$${producto.precio * producto.cantidad}`;
                //subtotal.classList.add('mb-0', 'me-2'); // Opcional, bootstrap.

                // Agregar elementos al <article>
                articulo.appendChild(imagen);
                articulo.appendChild(nombre);
                articulo.appendChild(precio);
                articulo.appendChild(cantidad);
                articulo.appendChild(subtotal);

                // Agregar <article> al <li>
                li.appendChild(articulo);

                // Agregar <li> al <ul>
                listaCarrito.appendChild(li);

                // Actualizar el total
                total += producto.precio * producto.cantidad;
            });
            // Actualizar el total en el resumen
            costoCarrito.textContent = total;
        }
        // Función para vaciar el carrito de compras.
        function vaciarCarrito(){
            carrito = []; // Seteamos el carrito a una lista vacía.
            localStorage.setItem('carrito',JSON.stringify(carrito)); // Guardamos los cambios.
            console.log("Productos eliminados del carrito."); // Lanzamos una alerta.
            mostrarCarrito() // Recargamos el carrito y lo mostramos.
        }

        // Escuchadores.
        // Escuchador del botón vaciarCarrito.
        botonVaciarCarrito.addEventListener("click", () => {
            // Si lo precionan llamamos a la función que borra los elementos del carrito.
            vaciarCarrito(); // Borramos elementos del carrito.
        })
        // Escuchador del actualizador del carrito.
        if (listaCarrito) {
            // console.log("el escuchador de la lista funciona.")
            document.addEventListener('DOMContentLoaded', mostrarCarrito);
        }
    }



    // Funcionalidad página catálogo.
    // Si existen botones de compra en la página accedemos a esta funcionalidad.
    if (botonesCompra.length > 0) {
        // Actualizar el contador al cargar la página.
        actualizarContadorCarrito();
        // Función para actualizar el contador del carrito
        function actualizarContadorCarrito() {
            if (contadorCarrito) {
                const totalProductos = carrito.reduce((sum, item) => sum + item.cantidad, 0);
                contadorCarrito.textContent = totalProductos;
                /* // .reduce hace que la linea no se ejecute si no hay algo que reducir. Esta parte no funciona, no se por qué.
                const totalPrecio = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
                precioTotal.textContent = totalPrecio;  */
            }
        }
        // Función que obtiene la info del producto asociado a cada botón asociado a la clase producto.
        function obtenerDetallesProducto(boton) {
            // Usamos el método closest('.producto') para encontrar el elemento <article class="producto"> más cercano que contiene
            // el botón cliqueado. Esto devuelve el contenedor del producto (que incluye la imagen, título, descripción, precio, etc.).
            const article = boton.closest('.producto');
            const nombre = article.querySelector('h4').textContent; // Tomamos el nombre del producto.
            // Aprobechamos el <strong> que usamos para remarcar el precio y lo usamos como marcador para recuperar el precio.
            const precioTexto = article.querySelector('span').textContent; // Tomamos el precio del producto, ejemplo: "Precio: $19.000".
            const precio = parseInt(precioTexto.replace(/[^0-9]/g, '')); // Eliminamos comas y espacios del número.
            // Tomamos la id del botón, usamos esa id en futuras adiciones para revisar si el producto ya existe en el carrito.
            const id = boton.id;
            const imagen = article.querySelector('img').getAttribute('src'); // Tomamos la ruta de la imagen y la guardamos para futuras acciones.
            // Guardamos todo dentro de una lista y la retornamos.
            let cantidad = 1;
            console.log(id);
            console.log(nombre);
            console.log(precio); // El precio sale mal.   arreglado.
            console.log(cantidad);
            console.log(imagen);
            return { id, nombre, precio, cantidad, imagen };
        }
        // Función que agrega un producto al carrito.
        function agregarAlCarrito(producto) {
            console.log(producto.id);
            console.log(producto.nombre);
            console.log(producto.precio); // El precio sale mal.   arreglado.
            console.log(producto.cantidad);
            console.log(producto.imagen);
            
            // Primero revisamos que el producto que queremos agregar no exista ya.
            const existente = carrito.find(item => item.id === producto.id);
            console.log("hasta acá bien 1");
            // Si existe le aumentamos la cantidad.
            if (existente) {
                existente.cantidad += 1;
                console.log("hasta acá bien 2");
            } else {
                // Si no existe le agregamos el nuevo producto al carrito.
                carrito.push(producto);

                let ultimo = carrito.length -1;

                console.log("hasta acá bien 3");
                console.log(carrito.length); // ******Acá tengo el problema, la info no aparece.
                console.log(carrito[ultimo].id);
                console.log(carrito[ultimo].nombre);
                console.log(carrito[ultimo].precio);
                console.log(carrito[ultimo].imagen);
            }
            // Hecho el cambio guardamos el carrito en el local storage como un JSON, llave ('carrito'): valor (info del carrito).
            localStorage.setItem('carrito', JSON.stringify(carrito));
            console.log("hasta acá bien 4");
            // Imprime el carrito en la consola del navegador.
            console.log('Carrito actualizado:', carrito);
            console.log("hasta acá bien 5");
            // Muestra un mensaje en pantalla avisándole al usuario que el producto se agregó al carrito.
            console.log(`${producto.nombre} agregado al carrito!`);
            actualizarContadorCarrito(); // Actualizar el contador después de agregar.   ****acá está el problema.
            console.log("hasta acá bien 6"); 
        }

        // Escuchadores.
        // Escuchador de los botones de compra.
        // Iteramos por cada botón del NodeList 'botonesCompra' usando el método 'forEach'.
        botonesCompra.forEach(boton => {

            let ultimo = carrito.length -1;

            // Por cada botón escuchamos a ver si lo presionan.
            boton.addEventListener('click', () => {
                // Si lo presionan llamamos la funcion que toma la info del producto y la guarda en una variable.
                const producto = obtenerDetallesProducto(boton);
                agregarAlCarrito(producto); // Agregamos esa variable al carrito.
                console.log(carrito.length); // ******Acá también tengo el problema, la info no aparece.
                //console.log(carrito[ultimo].id);
                console.log(carrito[ultimo].nombre);
                console.log(carrito[ultimo].precio);
                console.log(carrito[ultimo].imagen);
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
            const r_mail = document.getElementById("mail_registro").value.trim();
            const r_clave = document.getElementById("clave_registro").value.trim();
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
            existingmail = getCookie("1001");
            if (existingmail && existingmail===r_mail){
                msg.textContent="Ya existe el mail";
                return;

            }
            // Si hay info creamos guardamos los datos en cookies.
            setCookie("1001", r_mail, 30);
            setCookie("2001", r_clave, 30);

            msg.textContent = "Se ha guardado exitosamente.";
        })
    }


    
}





// No tocar.
document.addEventListener("DOMContentLoaded", init);