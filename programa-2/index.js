// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("calculadora");

    const eventoFormulario = (evt) => {
        evt.preventDefault();

        // Obtener los valores de los inputs
        const numero1 = parseFloat(formulario.numero1.value);
        const numero2 = parseFloat(formulario.numero2.value);

        // Sumar los números
        const resultado = numero1 + numero2;

        // Mostrar el resultado usando SweetAlert2
        Swal.fire({
            title: 'Resultado',
            text: `${numero1} + ${numero2} = ${resultado}`,
            icon: 'success',
            confirmButtonText: 'Aceptar'
        });

        console.log('successful!!')
    };

    formulario.addEventListener("submit", eventoFormulario);
});