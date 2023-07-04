// // Generar un número aleatorio del 1 al 10
// const numeroAleatorio = Math.floor(Math.random() * 10) + 1;

// // Inicializar el contador de intentos
// let intentos = 5;

// while (intentos > 0) {
// // Pedir al usuario que ingrese un número
// const numeroUsuario = parseInt(prompt("Adivina un número del 1 al 10 (Intentos restantes: " + intentos + ")"));

// // Verificar si el número es correcto 
// const mensaje =
//     numeroUsuario === numeroAleatorio
//     ? "¡Felicidades! ¡Adivinaste el número!"
//     : intentos === 1
//     ? "¡Lo siento! El número correcto era " + numeroAleatorio
//     : "Incorrecto. Intenta de nuevo.";

// // Mostrar el mensaje al usuario
// alert(mensaje);

// // Disminuir el contador de intentos
// intentos--;
// }
