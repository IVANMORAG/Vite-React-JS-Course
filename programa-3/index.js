// Elementos del DOM
const taskForm = document.getElementById('task-form');
const taskTitle = document.getElementById('task-title');
const taskDescription = document.getElementById('task-description');
const taskContainer = document.getElementById('task-container');
const emptyMessage = document.getElementById('empty-message');

// Array para almacenar las tareas
let tasks = [];

// Configuración personalizada para SweetAlert2 (estilo aesthetic)
const SwalConfig = Swal.mixin({
    confirmButtonColor: '#ffb6c1',
    cancelButtonColor: '#f8bbd0',
    background: '#fff8fa',
    backdrop: `rgba(255,182,193,0.4)`,
    iconColor: '#f48fb1',
    customClass: {
        title: 'swal-title',
        confirmButton: 'swal-button',
        cancelButton: 'swal-button'
    }
});

// Función para agregar una nueva tarea
function addTask(title, description) {
    const taskId = Date.now().toString();
    
    // Crear el contenedor de la tarea
    const taskItem = document.createElement('div');
    taskItem.className = 'hero-card task-pending';
    taskItem.dataset.id = taskId;
    taskItem.dataset.completed = 'false';
    
    // Crear el contenido de la tarea
    taskItem.innerHTML = `
        <div class="card_task">
            <p>${title}</p>
            <span>${description}</span>
        </div>
        <div class="card-buttons">
            <button id="complete-${taskId}" class="complete-btn" title="Completar tarea">
                <i class="fas fa-check"></i>
            </button>
            <button id="eliminar-${taskId}" class="eliminar-btn" title="Eliminar tarea" disabled>
                <i class="fas fa-trash-alt"></i>
            </button>
            <button id="editar-${taskId}" class="editar-btn" title="Editar tarea">
                <i class="fas fa-edit"></i>
            </button>
        </div>
    `;
    
    // Agregar la tarea al contenedor
    taskContainer.appendChild(taskItem);
    
    // Agregar listeners a los botones
    const completeBtn = document.getElementById(`complete-${taskId}`);
    const deleteBtn = document.getElementById(`eliminar-${taskId}`);
    const editBtn = document.getElementById(`editar-${taskId}`);
    
    completeBtn.addEventListener('click', () => completeTask(taskId));
    deleteBtn.addEventListener('click', () => confirmDeleteTask(taskId));
    editBtn.addEventListener('click', () => confirmEditTask(taskId));
    
    // Agregar tarea al array
    tasks.push({
        id: taskId,
        title,
        description,
        completed: false
    });
    
    // Actualizar visualización del mensaje de vacío
    updateEmptyMessage();
    
    // Mostrar notificación de tarea agregada
    SwalConfig.fire({
        title: '¡Tarea agregada!',
        text: 'La tarea se ha agregado exitosamente',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
    });
}

// Función para marcar una tarea como completada
function completeTask(id) {
    SwalConfig.fire({
        title: '¿Completar esta tarea?',
        text: 'La tarea se marcará como completada',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, completar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            const taskElement = document.querySelector(`.hero-card[data-id="${id}"]`);
            const deleteBtn = document.getElementById(`eliminar-${id}`);
            
            if (taskElement) {
                // Cambiar estado visual
                taskElement.classList.remove('task-pending');
                taskElement.classList.add('task-completed');
                taskElement.dataset.completed = 'true';
                
                // Habilitar botón de eliminar
                deleteBtn.disabled = false;
                
                // Actualizar en el array
                const taskIndex = tasks.findIndex(task => task.id === id);
                if (taskIndex !== -1) {
                    tasks[taskIndex].completed = true;
                }
                
                // Notificar
                SwalConfig.fire({
                    title: '¡Completada!',
                    text: '¡Buen trabajo!',
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false
                });
            }
        }
    });
}

// Función para confirmar eliminación de tarea
function confirmDeleteTask(id) {
    const taskElement = document.querySelector(`.hero-card[data-id="${id}"]`);
    
    if (taskElement && taskElement.dataset.completed === 'true') {
        SwalConfig.fire({
            title: '¿Eliminar esta tarea?',
            text: 'Esta acción no se puede deshacer',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteTask(id);
            }
        });
    } else {
        SwalConfig.fire({
            title: 'No permitido',
            text: 'Solo se pueden eliminar tareas completadas',
            icon: 'error'
        });
    }
}

// Función para eliminar una tarea
function deleteTask(id) {
    const taskElement = document.querySelector(`.hero-card[data-id="${id}"]`);
    if (taskElement) {
        taskElement.remove();
        tasks = tasks.filter(task => task.id !== id);
        updateEmptyMessage();
        
        // Notificar
        SwalConfig.fire({
            title: 'Eliminada',
            text: 'La tarea ha sido eliminada',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false
        });
    }
}

// Función para confirmar edición de tarea
function confirmEditTask(id) {
    const taskElement = document.querySelector(`.hero-card[data-id="${id}"]`);
    const taskData = tasks.find(task => task.id === id);
    
    if (taskElement && taskData) {
        SwalConfig.fire({
            title: 'Editar tarea',
            html: `
                <div style="text-align:left; margin-bottom:15px;">
                    <label for="swal-input1" style="display:block; margin-bottom:5px; color:#f48fb1; font-weight:bold;">Título:</label>
                    <input id="swal-input1" class="swal2-input" value="${taskData.title}" style="border-color:#ffb6c1; width:100%;">
                </div>
                <div style="text-align:left;">
                    <label for="swal-input2" style="display:block; margin-bottom:5px; color:#f48fb1; font-weight:bold;">Descripción:</label>
                    <input id="swal-input2" class="swal2-input" value="${taskData.description}" style="border-color:#ffb6c1; width:100%;">
                </div>
            `,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'Guardar cambios',
            cancelButtonText: 'Cancelar',
            preConfirm: () => {
                return [
                    document.getElementById('swal-input1').value,
                    document.getElementById('swal-input2').value
                ]
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const [newTitle, newDesc] = result.value;
                if (newTitle.trim()) {
                    editTask(id, newTitle, newDesc);
                } else {
                    SwalConfig.fire({
                        title: 'Error',
                        text: 'El título no puede estar vacío',
                        icon: 'error'
                    });
                }
            }
        });
    }
}

// Función para editar una tarea
function editTask(id, newTitle, newDesc) {
    const taskElement = document.querySelector(`.hero-card[data-id="${id}"]`);
    if (taskElement) {
        const titleElement = taskElement.querySelector('.card_task p');
        const descElement = taskElement.querySelector('.card_task span');
        
        titleElement.textContent = newTitle;
        descElement.textContent = newDesc;
        
        // Actualizar el array de tareas
        const taskIndex = tasks.findIndex(task => task.id === id);
        if (taskIndex !== -1) {
            tasks[taskIndex].title = newTitle;
            tasks[taskIndex].description = newDesc;
        }
        
        // Notificar
        SwalConfig.fire({
            title: 'Actualizada',
            text: 'La tarea ha sido actualizada correctamente',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false
        });
    }
}

// Función para actualizar el mensaje de "No hay tareas"
function updateEmptyMessage() {
    if (tasks.length === 0) {
        emptyMessage.style.display = 'block';
    } else {
        emptyMessage.style.display = 'none';
    }
}

// Event listener para el formulario
taskForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const title = taskTitle.value.trim();
    const description = taskDescription.value.trim();
    
    if (title) {
        addTask(title, description);
        // Limpiar campos
        taskTitle.value = '';
        taskDescription.value = '';
    } else {
        SwalConfig.fire({
            title: 'Error',
            text: 'Por favor ingresa un título para la tarea',
            icon: 'error'
        });
    }
});

// Inicialización
updateEmptyMessage();