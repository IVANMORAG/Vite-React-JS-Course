const mensaje = document.getElementById("mensaje");
const boton = document.getElementById("btn-saludar");



const eventoSaludar = ()=>{
    let textoMensaje = "Hola desde JS con DOM";
    mensaje.innerText = textoMensaje; //Se muestra una vez
    //mensaje.innerText += textoMensaje; //Se concatena el texto
}

boton.addEventListener("click", eventoSaludar);