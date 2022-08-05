const contenedorModal = document.querySelector('.carrito-contenedor');

const botonCerrar = document.querySelector('.CC-btn-1')

const carritoContenedor = document.querySelector ('.productos-agregados')

botonCarrito.addEventListener ('click', () => {
    contenedorModal.classList.toggle ('modal-activo')
}) 

botonCerrar.addEventListener ('click', () => {
    contenedorModal.classList.toggle ('modal-activo')
})

