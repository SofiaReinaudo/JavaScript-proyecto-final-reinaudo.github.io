let productosEnCarrito = [];
let productos = [];
let total = 0

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
            let modalBody = document.getElementById("modal-body");
            modalBody.innerHTML = "<h4 class='fs-5 text-center'>No hay productos cargados</h4>"
            let pagoTotal = document.querySelector("#pagoTotal");
            pagoTotal.innerHTML = `<span class='cart-total-price fs-4'><b>Total:</b> $${total}</span>`
            //Escucha cundo se hace click al botón "Comprar"
            let btnComprar = document.getElementById(`${productoSolo.id}`)
            btnComprar.addEventListener("click", agregarProductos)

            //Agrega producto al carrito
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
                //Corrobora que no exista un producto repetido
                let productoId = productosEnCarrito.find(producto => producto.id == productoSolo.id)
                let existeProducto = productosEnCarrito.includes(productoId)
                //console.log(existeProducto)
                
                if(existeProducto){
                    productoId.cantidad++
                }else{
                    productosEnCarrito.push(productoSolo)
                } 
                cargarProducto();
                obtenerTotal();
                actulizarCantidadProducto();
                eliminarProducto();
            }

            //Cargar Producto al Carrito sin repetir
            function cargarProducto(){
                modalBody.innerHTML = '';
                let productoCargado = productosEnCarrito.forEach((productoSolo)=>{
                    modalBody.innerHTML +=  `
                    <div class="container">
                        <div class="cart">
                            <div class="row">
                                <div class="col-6">
                                    <img class="cart-item-image" src="${productoSolo.img}" width="50" height="70" alt="${productoSolo.nombre}">
                                    <span class="cart-item-title m-3" style="font-size:25px"><b>${productoSolo.nombre}</b></span>
                                    <span class="cart-price cart-column bg-dark text-white rounded p-2">$${productoSolo.precio}</span>
                                </div>
                                <div class="col-4">
                                    <input class="cart-quantity-input rounded border-info mt-3" min="1" type="number" value="${productoSolo.cantidad}" style="width:40%">
                                    <button class="btn btn-danger m-2" type="button">Eliminar</button>
                                </div>
                            </div>
                            <hr>
                        </div>
                    </div> 
                    `          
                })
                eliminarProducto();
                return productoCargado
            }

            //Calcular el total de la compra
            function obtenerTotal(){
                let sumTotal = 0;
                let total  =  productosEnCarrito.reduce((sum, producto)=>{
                    // //console.log(sum)
                    // console.log(producto.cantidad)
                    // console.log(producto.precio)
                    sumTotal = sum + producto.cantidad * producto.precio
                    // console.log(sumTotal)
                    return sumTotal
                },0);
                pagoTotal.innerHTML = `
                <strong class="cart-total-title">Total: </strong>
                <span class="cart-total-price">$${total}</span>
                ` 
            }   

            //Actualizar precio del producto por medio del input quantity
            function actulizarCantidadProducto(){
                let cantidadProducto = document.querySelectorAll('.cart-quantity-input');
                cantidadProducto = [...cantidadProducto]
                cantidadProducto.forEach(item =>{
                    item.addEventListener('click', event =>{
                        //Obtener titulo del producto 
                        let tituloProducto = event.target.parentElement.parentElement.firstElementChild.childNodes[3].innerText
                        //console.log(tituloProducto)

                        // Obtener el precio del arreglo producto
                        let cantidadActualProducto = parseInt(event.target.value);
                        // console.log(cantidadActualProducto);
                        //Buscar el producto con ese titulo
                        let productoBuscado = productosEnCarrito.find(item => item.nombre == tituloProducto)
                        // console.log(productoBuscado)
    
                        //Actuliazar el numero de la cantidad
                        productoBuscado.cantidad = cantidadActualProducto
                        // console.log(productoBuscado)
                        
                        //Actualizar precio
                        obtenerTotal()
                    });
                });
            }

            //Eliminar producto del carrito
            function eliminarProducto(){
                let eliminarProductoBtn = document.querySelectorAll('.btn-danger');
                // console.log(eliminarProductoBtn)
                eliminarProductoBtn  = [...eliminarProductoBtn]
                // console.log(eliminarProductoBtn)
                eliminarProductoBtn.forEach(btn =>{
                    btn.addEventListener('click', ()=>{
                        //Obtener titulo del producto
                        let tituloProducto = event.target.parentElement.parentElement.firstElementChild.childNodes[3].innerText

                        //Buscar el producto con ese titulo
                        let productoBuscado = productosEnCarrito.find(item => item.nombre == tituloProducto)

                        //Eliminar producto
                        productosEnCarrito = productosEnCarrito.filter(item => item != productoBuscado)

                        cargarProducto();
                        obtenerTotal();
                        actulizarCantidadProducto();
                        modalBody.innerHTML = "<h4 class='fs-5 text-center'>No hay productos cargados</h4>"
                        pagoTotal.innerHTML = `<span class='cart-total-price fs-4'><b>Total:</b> $${total}</span>`
                    });
                });
            }
            
            // Quitar todos los productos del carrito
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
                    
                    modalBody.innerHTML = "<h4 class='fs-5 text-center'>No hay productos cargados</h4>"
                    pagoTotal.innerHTML = `<span class='cart-total-price fs-4'><b>Total:</b> $${total}</span>`
                }
                });
                
            });           
        })
        
    }catch{
        console.log("Error.")
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
