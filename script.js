let intentos = 6;
let palabra = "PANAL"
const CANTLETRAS = 5
const BUTTON = document.getElementById('botonInput')
const ERROR = document.getElementById('error')
const GRILLA = document.getElementById('grilla')
const FILA = document.createElement('div')
FILA.className='fila';
// Creación del evento para iniciar el juego
BUTTON.addEventListener('click', intentar)

// Función encargada de recibir el intento, procesarlo y establecer los resultados
function intentar() {
    const INTENTO = leerIntento();
    console.log(INTENTO)
    if ((tamañoControl(INTENTO))) {
        ERROR.style.display = 'none'
        intentoManager(INTENTO);
    }
    else {
        ERROR.style.display = 'block'
        console.log('tamaño incorrecto')
    }
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

    for (let s in intento) {
        const SPAN =document.createElement('span')
        SPAN.className='letra'
        if(intento[s] == palabra[s]){
            SPAN.innerHTML = intento[s]
            SPAN.style.backgroundColor = 'green';
            console.log(intento[s] + ' VERDE')
        }
        else if (palabra.includes(intento[s])){
            SPAN.innerHTML = intento[s]
            SPAN.style.backgroundColor = 'yellow';
            console.log(intento[s] + ' AMARILLO')
        }
        else{
            SPAN.innerHTML = intento[s]
            SPAN.style.backgroundColor = 'gray';
            console.log(intento[s] + ' GRIS')
        }
        FILA.appendChild(SPAN)
    }
    GRILLA.appendChild(FILA)
  
}
function intentoManager(intento) {
    if (intento == palabra) {
        letrasControl(intento);
        console.log('GANASTE!')
        terminar('GANASTE!')
        intentos -= 1;
    }
    else{
        letrasControl(intento);
        intentos -=1;
        if(intentos == 0){
            terminar('PERDISTE!')
        }
    }
}

function terminar(mensaje){
    let INTENTO = document.getElementById("usuarioInput");
    INTENTO.disabled=true;
    BUTTON.disabled=true;
    let contenedor = document.getElementById('intentos');
    contenedor.innerHTML = mensaje
}

