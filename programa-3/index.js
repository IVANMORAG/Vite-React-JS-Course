// Seleccionar elementos del DOM
const form = document.querySelector('.form');
const taskInput = document.querySelector('.form_input:first-of-type');
const descriptionInput = document.querySelector('.form_input:nth-of-type(2)');
const heroBlank = document.querySelector('.hero-blank');
const heroCard = document.querySelector('.hero-card');

// Array para almacenar las tareas
let tasks = [];

// Agregar SweetAlert2 al documento
const sweetAlertScript = document.createElement('script');
sweetAlertScript.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
document.head.appendChild(sweetAlertScript);

// Función para manejar el envío del formulario
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Verificar que haya texto en el input de tarea
    if (taskInput.value.trim() === '') return;
    
    // Crear nueva tarea
    addTask(taskInput.value, descriptionInput.value);
    
    // Limpiar los inputs
    taskInput.value = '';
    descriptionInput.value = '';
    
    // Mostrar alerta de éxito
    sweetAlertScript.onload = () => {
        Swal.fire({
            title: '¡Tarea agregada!',
            text: 'Tu nueva tarea ha sido agregada exitosamente',
            icon: 'success',
            confirmButtonText: 'Genial',
            background: '#FFF0F5', // Lavender blush (rosa muy claro)
            confirmButtonColor: '#FFB6C1', // Light pink
            iconColor: '#FF69B4', // Hot pink
            customClass: {
                popup: 'swal-pastel-theme'
            }
        });
    };
});

// Función para agregar una tarea
function addTask(taskText, descriptionText) {
    // Crear objeto de tarea
    const task = {
        id: Date.now(),
        text: taskText,
        description: descriptionText,
        completed: false
    };
    
    // Agregar al array de tareas
    tasks.push(task);
    
    // Actualizar la interfaz
    updateUI();
}

// Función para actualizar la interfaz
function updateUI() {
    // Mostrar/ocultar mensaje de "No hay tareas disponibles"
    if (tasks.length === 0) {
        heroBlank.style.display = 'block';
        heroCard.innerHTML = '';
    } else {
        heroBlank.style.display = 'none';
        renderTasks();
    }
}

// Función para renderizar las tareas
function renderTasks() {
    // Limpiar el contenedor de tareas
    heroCard.innerHTML = '';
    
    // Recorrer el array de tareas y crear elementos HTML
    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task-container');
        taskElement.dataset.id = task.id;
        
        // Definir colores pastel para los bordes
        const borderColor = task.completed ? '#98D8AA' : '#FFEBB4'; // Verde pastel o amarillo pastel
        
        taskElement.innerHTML = `
            <div class="card_task" style="border: 3px solid ${borderColor}; border-radius: 8px; padding: 10px; transition: border-color 0.3s ease;">
                <p>${task.text}</p>
                <span>${task.description}</span>
            </div>
            <div class="card-buttons">
                <button class="complete-btn">O</button>
                <button class="delete-btn">X</button>
            </div>
        `;
        
        heroCard.appendChild(taskElement);
    });
    
    // Agregar event listeners a los botones
    addButtonListeners();
}

// Función para mostrar alerta de error con SweetAlert2
function showErrorAlert() {
    if (typeof Swal !== 'undefined') {
        Swal.fire({
            title: '¡No se puede eliminar!',
            text: 'Solo puedes eliminar tareas que estén completadas (con borde verde)',
            icon: 'error',
            confirmButtonText: 'Entendido',
            background: '#FFF0F5', // Lavender blush (rosa muy claro)
            confirmButtonColor: '#FFB6C1', // Light pink
            iconColor: '#FF69B4', // Hot pink
            customClass: {
                popup: 'swal-pastel-theme'
            }
        });
    } else {
        alert('Solo puedes eliminar tareas que estén completadas (con borde verde)');
    }
}

// Añadir estilos personalizados para SweetAlert2
const customStyles = document.createElement('style');
customStyles.textContent = `
    .swal-pastel-theme {
        border-radius: 15px !important;
        box-shadow: 0 0 15px rgba(255, 182, 193, 0.5) !important;
    }
    .swal2-title, .swal2-html-container {
        color: #DB7093 !important; /* PaleVioletRed - texto más oscuro para contraste */
    }
    .swal2-icon.swal2-error {
        border-color: #FFB6C1 !important;
        color: #FF69B4 !important;
    }
`;
document.head.appendChild(customStyles);

// Función para agregar event listeners a los botones
function addButtonListeners() {
    // Botones de completar tarea
    const completeButtons = document.querySelectorAll('.complete-btn');
    completeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const taskContainer = e.target.closest('.task-container');
            const taskId = parseInt(taskContainer.dataset.id);
            
            // Buscar tarea y cambiar estado
            const task = tasks.find(t => t.id === taskId);
            if (task) {
                task.completed = true;
                const taskElement = taskContainer.querySelector('.card_task');
                taskElement.style.borderColor = '#98D8AA'; // Verde pastel
                
                // Mostrar alerta de tarea completada
                if (typeof Swal !== 'undefined') {
                    Swal.fire({
                        title: '¡Tarea completada!',
                        text: '¡Bien hecho! Has completado esta tarea',
                        icon: 'success',
                        confirmButtonText: 'Continuar',
                        timer: 1500,
                        background: '#FFF0F5', // Lavender blush (rosa muy claro)
                        confirmButtonColor: '#FFB6C1', // Light pink
                        iconColor: '#FF69B4', // Hot pink
                        customClass: {
                            popup: 'swal-pastel-theme'
                        }
                    });
                }
            }
        });
    });
    
    // Botones de eliminar tarea
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const taskContainer = e.target.closest('.task-container');
            const taskId = parseInt(taskContainer.dataset.id);
            
            // Buscar tarea
            const task = tasks.find(t => t.id === taskId);
            
            // Solo eliminar si la tarea está completada (borde verde)
            if (task && task.completed) {
                if (typeof Swal !== 'undefined') {
                    Swal.fire({
                        title: '¿Estás seguro?',
                        text: '¿Deseas eliminar esta tarea completada?',
                        icon: 'question',
                        showCancelButton: true,
                        confirmButtonText: 'Sí, eliminar',
                        cancelButtonText: 'Cancelar',
                        background: '#FFF0F5', // Lavender blush (rosa muy claro)
                        confirmButtonColor: '#FFB6C1', // Light pink
                        cancelButtonColor: '#DCDCDC', // Gainsboro (gris claro)
                        iconColor: '#FF69B4', // Hot pink
                        customClass: {
                            popup: 'swal-pastel-theme'
                        }
                    }).then((result) => {
                        if (result.isConfirmed) {
                            tasks = tasks.filter(t => t.id !== taskId);
                            updateUI();
                            
                            Swal.fire({
                                title: '¡Eliminada!',
                                text: 'La tarea ha sido eliminada exitosamente',
                                icon: 'success',
                                timer: 1500,
                                background: '#FFF0F5',
                                confirmButtonColor: '#FFB6C1',
                                iconColor: '#FF69B4',
                                customClass: {
                                    popup: 'swal-pastel-theme'
                                }
                            });
                        }
                    });
                } else {
                    const confirmDelete = confirm('¿Estás seguro de que deseas eliminar esta tarea?');
                    if (confirmDelete) {
                        tasks = tasks.filter(t => t.id !== taskId);
                        updateUI();
                    }
                }
            } else {
                showErrorAlert();
            }
        });
    });
}

// Inicializar la interfaz
updateUI();