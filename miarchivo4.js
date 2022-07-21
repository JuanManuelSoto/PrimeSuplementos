const API_URL = 'https://api.mercadolibre.com/';

const endpointProductos = '/sites/MLA/search';

let productos;

const traerDatos = () => {
    fetch(API_URL + endpointProductos+ '?q=proteínawhey')
    .then((response) => response.json())
    .then((data) => {
        productos = data.results;
        generarCards(productos);
    }) 
}

document.getElementById ("tituloDelSitio").innerHTML = "Prime Suplementos"

document.getElementById ("subtituloDelSitio").innerHTML = "Potencia tus resultados al máximo"

const botonRegistrarse = document.getElementById ("iniciar-sesion");

const contenedorLogIn = document.querySelector ('.login');

const botonCarrito = document.getElementById ('boton-carrito');

let usuario = document.getElementById("usuario").value;

let contraseña = document.getElementById("contraseña").value;

let limpiarCarrito = document.getElementById ('eliminar-productos');

botonRegistrarse.onclick = () => {
    contenedorLogIn.classList.add('login-invisible');
    Swal.fire({
        title: 'Iniciaste sesión en Prime Suplementos!',
        icon: 'success',
        showConfirmButton: false,
        timer:2000,
        padding: '2em',
        color: 'black',
    })
} 

document.getElementById ("usuario").onchange = (e) => {
    const usuario = e.target.value;
    const usuarioValido = validarEmail(usuario);
    document.getElementById ("feedback").innerHTML = (usuarioValido)
    ? "Email valido!" : "Email no valido!";
} 

document.getElementById ("usuario").oninput = validarBoton;

document.getElementById ("contraseña").oninput = validarBoton;

function validarBoton () {
    const usuario = document.getElementById("usuario").value;
    const password = document.getElementById("contraseña").value;
    
    if(usuario && password){
        botonRegistrarse.style.background = "lightblack";
        botonRegistrarse.style.color = "black";
        botonRegistrarse.disabled= false;
    } else {
        botonRegistrarse.disabled= true;
    }
}

function validarEmail(email) {
    return String(email)
    .toLowerCase()
    .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };
    
    const carritoStorage = localStorage.getItem ('carrito'); 
    
    const carrito = JSON.parse (carritoStorage) ?? [];
    
//     const arrayDeProductos = [{
//         id: 1,
//         nombre: "Whey Protein",
//         precio: 4500,
//         stock: "hay stock"
//     },
//     {
//         id: 2,
//         nombre: "Creatina",
//         precio: 6500,
//         stock: "sin stock",
//     },
//     {
//         id: 3, 
//         nombre: "Pre-workout",
//         precio: 3000,
//         stock: "sin stock"
//     },
//     {
//         id: 4,
//         nombre: "Aminoacidos BCAA",
//         precio: 1500,
//         stock: "sin stock"
//     }
// ];

const generarCards = (arrayDe) => {
let acumulador = ``;
arrayDe.forEach((producto) => {
    acumulador += `<div class="col mb-5">
    <div class="card h-100">
    <!-- Product image-->
    <img class="card-img-top" src="${producto.thumbnail}" alt="..." />
    <!-- Product details-->
    <div class="card-body p-4">
    <div class="text-center">
    <!-- Product name-->
    <h5 class="fw-bolder">${producto.title}</h5>
    <!-- Product price-->
    $${producto.price}
    </div>
    </div>
    <!-- Product actions-->
    <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
    <div class="text-center"><a onclick = "agregarAlCarrito(${producto.id})" 
    class="btn btn-outline-dark mt-auto" href="#">Agregar al carrito</a></div>
    </div>
    </div>
    </div>`;
    document.getElementById ("card-container").innerHTML = acumulador;
});}


function agregarAlCarrito (id) {
    Toastify({
        text: "Agregaste el producto al carrito",
        duration: 1500,
        close: true,
        gravity: "top", 
        position: "right", 
        stopOnFocus: true, 
        style: {
            background: "linear-gradient(to right, #71777a, #9d9c9a)",
        }, 
        onClick: function(){}
    }).showToast();
    
    // const resultado = arrayDeProductos.find ((producto) => producto.id === id);
    
    carrito.push (resultado);
    
    const carritoJSON = JSON.stringify (carrito);
    
    localStorage.setItem ('carrito',carritoJSON);
    
    const totalCarrito = carrito.reduce ((acumulador,producto) => acumulador + producto.price, 0);
    
    document.getElementById('carrito-elementos').innerHTML = carrito.length + " $ " + totalCarrito;
    
    limpiarCarrito.onclick = () =>{limpiar()}
    function limpiar() {
        localStorage.clear();
        Swal.fire({
            title: 'Estas seguro que deseas continuar?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borrar carrito!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Eliminado!',
                    'Eliminaste todos los productos del carrito',
                    'success'
                    )
                    document.getElementById('carrito-elementos').innerHTML = carrito.length = 0;
                }
            })
        }
        
        botonCarrito.onclick = () => {
            totalCarrito >= 10000 ? Swal.fire('Actualmente tenes ' + carrito.length + ' productos en el carrito, por un valor de ARS$ ' + (totalCarrito) * 0.9) : Swal.fire('Actualmente tenes ' + carrito.length + ' productos en el carrito, por un valor de ARS$ ' + totalCarrito); 
        }
    }
    
    traerDatos();