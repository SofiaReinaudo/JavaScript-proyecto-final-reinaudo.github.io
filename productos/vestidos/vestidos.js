let productosEnCarrito = [];
let productos = [];

const  fechtProductos= async ()=>{

    try{
        const productos = await fetch('data.json')
        const data = await productos.json()
        // subir productos
        data.forEach((productoSolo)=>{
            let contenedor = document.createElement("div")
            contenedor.innerHTML = `
                    <div id="productoItem" class="card">
                        <img src="${productoSolo.img}" class="card-img-top" alt="${productoSolo.nombre}">
                        <div class="card-body">
                            <span><h2 style="font-size: 30px; margin-top: -5px;">${productoSolo.nombre}</h2></span>
                            <span><p style="margin-top: -5px;">$${productoSolo.precio}</p></span> 
                            <button id="${productoSolo.id}" class="btn btn-dark" style="margin-top: -10px;">Comprar</button>                   
                        </div>
                    </div>
            `
            contenedorProductos.append(contenedor)
            // añadir a carrito
            let productosEnCarrito = [];
            let modalBody = document.getElementById("modal-body");
            let btnComprar = document.getElementById(`${productoSolo.id}`)
            btnComprar.addEventListener("click", agregarProductos)
            function agregarProductos(){
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 1000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })
                Toast.fire({
                    icon: 'success',
                    title: 'Producto agregado'
                })
                productosEnCarrito.push (productoSolo)

                productosEnCarrito.forEach((productoSolo)=>{
                    
                    modalBody.innerHTML +=  `
                    <div class="card mb-3" id= "item-modal" style="max-width: 540px;">
                        <div class="row g-0">
                            <div class="col-md-4">
                                <img src="${productoSolo.img}" class="img-fluid rounded-start" alt="${productoSolo.nombre}">
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                <h5 class="card-title">${productoSolo.nombre}</h5>
                                <p> Precio: $${productoSolo.precio}</p> 
                                </div>
                            </div> 
                            <!-- <button id="eliminarProductos" class= "btn btn-dark" > Eliminar </button> -->
                        </div>
                    </div>`
                    let total = document.getElementById("total")
                    precio = 0
                    precio += item[0].precio
                    total.innerHTML = `Total: ${precio}`                
                })   
                
            } 
            // Vaciar carrito
            let vaciarCarrito = document.getElementById("vaciar-carrito")
            vaciarCarrito.addEventListener("click", ()=>{
                Swal.fire({
                    title: 'Elimiar carrito',
                    text: "No podras revertir esta acción.",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: 'rgb(39, 35, 35)',
                    cancelButtonColor: 'rgb(39, 35, 35)',
                    confirmButtonText: 'Sí'
                }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        icon: 'success',
                        confirmButtonColor: 'rgb(39, 35, 35)',
                        title: 'Carrito vacío',
                    }
                    )
                    modalBody.innerHTML = ""
                }
                })
            })           
        })
        
    
    }catch{
        console.log("Error.")
    }finally{
        console.log("Productos cargados.")
    }
}

fechtProductos()

// Cambiar a modo oscuro
let body = document.getElementById("body");
let btnCambiarOscuro = document.getElementById("btnCambiarOscuro");
let btnCambiarClaro = document.getElementById("btnCambiarClaro")

btnCambiarOscuro.addEventListener("input", cambiarModoOscuro)
btnCambiarClaro.addEventListener("input", cambiarModoClaro)

function cambiarModoOscuro(){    
    body.style.backgroundColor = "rgb(22, 21, 21)";
}
function cambiarModoClaro(){    
    body.style.backgroundColor = "rgb(215, 209, 209)";
}

Toastify({

    text: "kjjk",
    
    duration: 5000
    
}).showToast();
