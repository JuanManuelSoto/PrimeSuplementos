let productos = [];

document.addEventListener ('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'));
        actualizarCarrito();
    }
});

fetch("./productos.json")
.then((response) => response.json())
.then((data) => {
    productos = data;
    generarCards(productos);
}); 

const botonRegistrarse = document.getElementById ('iniciar-sesion');

const botonCarrito = document.getElementById ('boton-carrito');

const contadorCarrito = document.querySelector ('#carrito-elementos')

const vaciarCarrito = document.getElementById ('eliminar-productos');

const carritoElementos = document.getElementById('carrito-elementos');

const totalCarrito = document.getElementById ('precio-total');

const desaparecer = () => {
    botonRegistrarse.classList.add ('invisible1'); 
}

botonRegistrarse.onclick = () => {
    (async() => {
        const {value : login} =  await Swal.fire({
        confirmButtonColor: '#333',        
        html: '<div class = "A-background" ><div class = "A-content"><div class = "A-C-B1"><input type = "email" class = "A-input-1" placeholder="Usuario"></div><div class = "A-C-B2"><input type="password" class = "A-input-1" placeholder="Contraseña"</div></div></div>'
        })
        if (login) {
            desaparecer();
            Toastify({
                text: "Iniciaste sesión en Prime Suplementos",
                duration: 3000,
                close: true,
                gravity: "top", 
                position: "right", 
                stopOnFocus: true, 
                style: {
                    background: "linear-gradient(to right, #71777a, #9d9c9a)",
                }, 
                
            }).showToast();
        }
    }) ()
}

const carritoStorage = localStorage.getItem ('carrito'); 

let carrito = JSON.parse (carritoStorage) ?? [];

const generarCards = (productos) => {
let acumulador = ``;
productos.forEach((producto) => {
    acumulador += `<div class="col mb-5">
    <div class="card h-100">
    <!-- Product image-->
    <img class="card-img-top" src="${producto.img}" alt="..." />
    <!-- Product details-->
    <div class="card-body p-4">
    <div class="text-center">
    <!-- Product name-->
    <h5 id = "descripcion" class="fw-bolder">${producto.nombre}</h5>
    <!-- Product price-->
    $${producto.precio}
    </div>
    </div>
    <!-- Product actions-->
    <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
    <div class="text-center"><a onclick = "agregarAlCarrito(${producto.id})" 
    class="btn btn-outline-dark mt-auto" href = "#">Agregar al carrito</a></div>
    </div>
    </div>
    </div>`;
    document.getElementById ('card-container').innerHTML = acumulador;
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
    
const existe = carrito.some(producto => producto.id === id);
    
    if (existe) {
        const producto = carrito.map(producto => {
            if (producto.id === id) {
                producto.cantidad ++ ;
            }
        })
    } else {
        var item = productos.find ((producto) => producto.id === id);
        carrito.push (item);
    } 
    actualizarCarrito();
}

const eliminarDelCarrito = (id) => {
    Toastify({
        text: "Eliminaste el producto del carrito",
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
    const item = carrito.find ((producto) => producto.id === id);
    const indice = carrito.indexOf(item);
    carrito.splice(indice, 1);
    actualizarCarrito();
}

vaciarCarrito.onclick = () =>{limpiar()}
function limpiar() {
    Swal.fire({
        title: 'Estás seguro que deseas continuar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#333',
        cancelButtonColor: '#333',
        confirmButtonText: 'Si, borrar carrito!'
    }).then((result) => {
        
        if (result.isConfirmed) {
            carrito.length = 0;
            localStorage.clear();
            actualizarCarrito();
            Swal.fire({
                title:'Eliminado!',
                text: 'Eliminaste todos los productos del carrito',
                icon:'success',
                confirmButtonColor: '#333',
            }
                )
                document.getElementById('carrito-elementos').innerHTML = carrito.length = 0;
            }
        })
    }
    
const actualizarCarrito = () => {
    carritoContenedor.innerHTML = ``;
        
    carrito.forEach((producto) => {
        const div = document.createElement('div');
        div.classList.add ('producto-carrito');
        
        div.innerHTML = `
        <div class= "PC-C-B1"><img class="PC-img-1" id="imagenC" src='${producto.img}'/></div>
        <div class= "PC-C-B2"><p id="nombreC">${producto.nombre}</p></div>
        <div class= "PC-C-B21"><p id="cantidadC">cant. ${producto.cantidad}</p></div>
        <div class= "PC-C-B3"><p id="precioC">$ ${producto.precio}</p></div>
        <div class= "PC-C-B4"><button onclick="eliminarDelCarrito(${producto.id})" id="eliminarProducto"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg></button></div>
        `
        carritoContenedor.append(div);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        })
    carritoElementos.innerText = carrito.length;
    totalCarrito.innerText = carrito.reduce((acumulador,producto) => acumulador + producto.precio * producto.cantidad, 0);
}   
