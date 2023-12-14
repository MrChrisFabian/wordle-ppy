let intentos = 6;
const URLAPi = "https://random-word-api.herokuapp.com/word?length=5&&lang=es"
const CANTLETRAS = 5
let diccionario = ["PANAL", "CHRIS", "LLAVE", "RELOJ", "HUESO"]
let palabra;
const BUTTON = document.getElementById('botonInput')
const ERROR = document.getElementById('error')
const MSGLOSe = document.getElementById('MsgLose')
//obtenemos un valor de la api que sera la palabra a adivinar
fetch(URLAPi)
.then(resp => resp.json())
.then(response => {
    palabra = response[0].toUpperCase()
    console.log('Palabra API:' + response[0].toUpperCase())
})
//Atrapamos el error en caso de que hubieses
.catch(err => {console.log('Problemas con la api')
//Si no conectamos la api utilizaremos alguno de los valores predeterminados para el juego
 palabra = diccionario[Math.floor(Math.random() * diccionario.length)];
}
)
// Creación del evento para iniciar el juego
BUTTON.addEventListener('click', intentar)

// Función encargada de recibir el intento, procesarlo y establecer los resultados
function intentar() {
    const INTENTO = leerIntento();
    if ((tamañoControl(INTENTO))) {
        ERROR.style.display = 'none'
        intentoManager(INTENTO);
    }
    else {
        ERROR.style.display = 'block'
    }
    //Limpiar la caja de input para que el usuario ingrese el siguiente valor
    const BOX = document.getElementById("usuarioInput");
    BOX.value = ""
}


// Función encargada de recibir y procesar la información para el intento
function leerIntento() {
    let intento = document.getElementById("usuarioInput");
    intento = intento.value;
    intento = intento.toUpperCase();
    return intento;
}
// Función encargada de establecer si el intento tiene la cantidad correcta de letras
function tamañoControl(intento) {
    let cantLetras = 0;
    for (let i in intento) {
        cantLetras += 1;
    }

    if (cantLetras == CANTLETRAS) {
        return true
    } else {
        return false
    }
}
// Función encargada de establecer si el intento es el correcto
function palabraControl(intento) {
    if (intento == palabra) {
        return true
    }
}
// Función encargada de establecer cuales letras son correctas
function letrasControl(intento) {
    const GRILLA = document.getElementById('grilla')
    const FILA = document.createElement('div')
    FILA.className = 'row';
    for (let s in intento) {
        const SPAN = document.createElement('span')
        SPAN.className = 'letter'
        if (intento[s] == palabra[s]) {
            SPAN.innerHTML = intento[s]
            SPAN.style.backgroundColor = 'green';
        }
        else if (palabra.includes(intento[s])) {
            SPAN.innerHTML = intento[s]
            SPAN.style.backgroundColor = 'yellow';
        }
        else {
            SPAN.innerHTML = intento[s]
            SPAN.style.backgroundColor = 'gray';
        }
        FILA.appendChild(SPAN)
    }
    GRILLA.appendChild(FILA)

}
//Función que maneja maneja cuando terminara el juego ya sea ganando o quedandose sin intentos
function intentoManager(intento) {
    if (intento == palabra) {
        letrasControl(intento);
        console.log('GANASTE!')
        terminar('😎 GANASTE!')
        intentos -= 1;
    }
    else {
        letrasControl(intento);
        intentos -= 1;
        if (intentos == 0) {
            terminar('😪 PERDISTE!')
            MSGLOSe.style.display = 'block'
            MSGLOSe.innerHTML = "La Palabra Correcta era: " + palabra

        }
    }
}
//Función encarga de finalizar el juego mostrando un mensaje y bloqueando los botones
function terminar(mensaje) {
    let INTENTO = document.getElementById("usuarioInput");
    INTENTO.disabled = true;
    BUTTON.disabled = true;
    let contenedor = document.getElementById('intentos');
    contenedor.innerHTML = mensaje
}

