alert("Bienvenido a la sección de contacto. Aquí puedes escribir tus datos personales para realizar una compra, o, consultar algo. Tienes que ser mayor de 18 años.");

// Obtener el formulario
const formulario = document.getElementById('formulario');

// agregar el evento de escucha
formulario.addEventListener('submit', function(event) {
    event.preventDefault();
    // Obtener los valores de los inputs
    const nombre = document.getElementById('nombre').value;
    const edad = document.getElementById('edad').value;
    const correo = document.getElementById('correo').value;
    const ciudad = document.getElementById('ciudad').value;
    const pais = document.getElementById('pais').value;
    const direccion = document.getElementById('direccion').value;
    const total = document.getElementById('total').value;
    const metodo = document.getElementById('metodo').value;
    const telefono = document.getElementById('telefono').value;
    const mensaje = document.getElementById('mensaje').value;
    
    // Objeto con los datos
    const compra = {
    nombre: nombre,
    edad: edad,
    correo: correo,
    ciudad:ciudad,
    pais: pais,
    direccion: direccion,
    total:total,
    metodo: metodo,
    telefono: telefono,
    mensaje: mensaje
    };

    // Convertir el objeto a una cadena JSON
    const compraJSON = JSON.stringify(compra);

    // Almacenar los datos en localStorage
    localStorage.setItem('compra', compraJSON);

    // Recuperar los datos almacenados en localStorage
    const compraAlmacenadoJSON = localStorage.getItem('compra');

    // Convertir la cadena JSON a un objeto
    const compraAlmacenado = JSON.parse(compraAlmacenadoJSON);

    // Verificar edad
    if( compraAlmacenado.edad >= 18 ){
        Toastify({
            text: "Consulta enviada.",
            duration: 3000,
            newWindow: true,
            gravity: "top", 
            position: "right", 
            style: {
            background: "linear-gradient(to right, #ffffff, rgb(249, 203, 203))",
            color: "black",
            border: "1px solid"
            },
            onClick: function(){} 
        }).showToast();
        // Utilizar los datos almacenados
        console.log(`Compra:
        Nombre:${compraAlmacenado.nombre}
        Edad:${compraAlmacenado.edad}
        Correo Electrónico:${compraAlmacenado.correo}
        Ciudad:${compraAlmacenado.ciudad}
        País:${compraAlmacenado.pais}
        Dirección:${compraAlmacenado.direccion}
        Total de la compra:${compraAlmacenado.total}
        Método de pago:${compraAlmacenado.metodo}
        Teléfono:${compraAlmacenado.telefono}
        Mensaje:${compraAlmacenado.mensaje}`);
    }
    else if( compraAlmacenado.edad < 18){
        Toastify({
            text: "Eres menor de 18 años, consulta rechazada.",
            duration: 3000,
            newWindow: true,
            gravity: "top", 
            position: "right", 
            style: {
            background: "linear-gradient(to right, #ffffff, rgb(249, 203, 203))",
            color: "black",
            border: "1px solid"
            },
            onClick: function(){} 
        }).showToast();
    }
    else{
        Toastify({
            text: "En la edad solo se permiten números.",
            duration: 3000,
            newWindow: true,
            gravity: "top", 
            position: "right", 
            style: {
            background: "linear-gradient(to right, #ffffff, rgb(249, 203, 203))",
            color: "black",
            border: "1px solid"
            },
            onClick: function(){} 
        }).showToast();
    }
});