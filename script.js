// // const contraseña = 2374

// // let intento= prompt("contraseña de 4 digitos: ")

// // // if(contraseña==intento) {
// // //     console.log("Bravo! acertaste")
// // // } else{
// // //     console.log("Lastima, recarga la pagina y volve a probar")
// // // }
// let nombre = prompt("ingrese su nombre")
function saludar(nombre) {
    console.log("Hola, " + nombre + "!");
    console.log("Bienvenido a mi sitio web.");
    console.log("A continuación, te haré algunas preguntas.");
}
let nombre1 = prompt("Hola, ¿cuál es tu nombre?");
if (nombre1) {
    saludar(nombre1);
}
// Solicitar datos al usuario
let edad1 = prompt("¿Cuántos años tienes?");
let ciudad1 = prompt("¿En qué ciudad vives?");
let hobby1 = prompt("¿Cuál es tu pasatiempo favorito?");

// function insertarDatos(nombre, edad, ciudad, hobby)

function insertarDatos(nombre, edad, ciudad, hobby) {
    let nombre = prompt("¿Cuál es su nombre?");
    let edad = prompt("¿Cuántos años tiene?");
    let ciudad = prompt("¿En qué ciudad vive?");
    let hobby = prompt("¿Cuál es su pasatiempo favorito?");
}
function mostrarDatos(nombre, edad, ciudad, hobby) {
    console.log("Tu nombre es: " + nombre);
    console.log("Tienes " + edad + " años.");
    console.log("Vives en: " + ciudad);
    console.log("Tu pasatiempo favorito es: " + hobby);
}
function agregarDatos(base) {
    let nombre = prompt("¿Cuál es tu nombre?");
    let edad = prompt("¿Cuántos años tienes?");
    let ciudad = prompt("¿En qué ciudad vives?");
    let hobby = prompt("¿Cuál es tu pasatiempo favorito?");
    // Verificar que todos los campos estén completos
    if (nombre && edad && ciudad && hobby) {
        mostrarDatos(nombre, edad, ciudad, hobby);
        base.push({ "Nombre: ": nombre, "Edad: ": edad, "ciudad; " : ciudad,"hobby: " :hobby });
        console.log("Datos agregados a la base de datos.");
    } else {
        console.log("Por favor, completa todos los campos.");
    }
}

let bd = [];
agregarDatos(bd);

let respuesta = prompt("¿Te gustaría agregar a alguien mas a la base de datos? (sí/no)");

while (respuesta.toLowerCase() !== "no") {
    if (respuesta.toLowerCase() === "sí") {
        agregarDatos(bd);
        console.log("¡Genial! Se agregado a alguien más a la base de datos.");
         respuesta = prompt("¿Te gustaría agregar a alguien mas a la base de datos? (sí/no)");
    } else if (respuesta.toLowerCase() === "no") {
        console.log("Está bien, ¡espero que tengas un gran día!");
        break;
    } else {
        console.log("Respuesta no válida. Por favor, responde con 'sí' o 'no'.");
        break;
    }
}
