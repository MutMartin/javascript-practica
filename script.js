
function saludar(nombre) {
    console.log(`Hola, ${nombre}!`);
    console.log("Bienvenido a mi sitio web.");
    console.log("A continuación, te haré algunas preguntas.");
}

function pedirDatos() {
    const nombre = prompt("¿Cuál es tu nombre?");
    const edad = prompt("¿Cuántos años tienes?");
    const ciudad = prompt("¿En qué ciudad vives?");
    const hobby = prompt("¿Cuál es tu pasatiempo favorito?");
    return { nombre, edad, ciudad, hobby };
}

function mostrarDatos({ nombre, edad, ciudad, hobby }) {
    console.log(`Tu nombre es: ${nombre}`);
    console.log(`Tienes ${edad} años.`);
    console.log(`Vives en: ${ciudad}`);
    console.log(`Tu pasatiempo favorito es: ${hobby}`);
}

function agregarDatosABase(base, datos) {
    const { nombre, edad, ciudad, hobby } = datos;
    if (nombre && edad && ciudad && hobby) {
        mostrarDatos(datos);
        base.push({ Nombre: nombre, Edad: edad, Ciudad: ciudad, Hobby: hobby });
        console.log("Datos agregados a la base de datos.");
    } else {
        console.log("Por favor, completa todos los campos.");
    }
}

// Inicio
const baseDeDatos = [];

const datosIniciales = pedirDatos();
if (datosIniciales.nombre) {
    saludar(datosIniciales.nombre);
    agregarDatosABase(baseDeDatos, datosIniciales);
}

let respuesta;

do {
    respuesta = prompt("¿Te gustaría agregar a alguien más a la base de datos? (si/no)");

    if (!respuesta) continue; // si el usuario aprieta cancelar o deja vacío

    const r = respuesta.toLowerCase().trim();

    if (r === "si") {
        const nuevosDatos = pedirDatos();
        agregarDatosABase(baseDeDatos, nuevosDatos);
        console.log("¡Genial! Se agregó a alguien más a la base de datos.");
    } else if (r === "no") {
        console.log("Está bien, ¡espero que tengas un gran día!");
        break;
    } else {
        console.log("Respuesta no válida. Por favor, responde con 'si' o 'no'.");
    }

} while (true);

console.log("Base de datos final:", baseDeDatos);