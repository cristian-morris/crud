function openEditForm(id) {
    const modalContainer = document.getElementById('modal-container');
    const modalContent = document.getElementById('modal-content');

    // Aquí podrías hacer una solicitud al servidor para obtener los datos del juego con el id proporcionado
    // Supongamos que ya tienes una función llamada obtenerJuegoPorId(id) que hace esto
    async function obtenerJuegoPorId(id) {
        try {
            const response = await fetch(`/games/${id}`);
            if (response.ok) {
                const juego = await response.json();
                return juego;
            } else {
                throw new Error('Error al obtener los datos del juego');
            }
        } catch (error) {
            throw error;
        }
    }    

    obtenerJuegoPorId(id)
        .then(juego => {
            modalContent.innerHTML = `
                <h2>Editar Juego</h2>
                <form id="edit-form" onsubmit="guardarCambios(); return false;">
                    <label for="nombre">Nombre:</label>
                    <input type="text" id="nombre" name="nombre" value="${juego.nombre}"><br><br>

                    <label for="categoria">Categoría:</label>
                    <input type="text" id="categoria" name="categoria" value="${juego.categoria}"><br><br>

                    <label for="añoDeSalida">Año de Salida:</label>
                    <input type="text" id="añoDeSalida" name="añoDeSalida" value="${juego.añoDeSalida}"><br><br>

                    <label for="precio">Precio:</label>
                    <input type="text" id="precio" name="precio" value="${juego.precio}"><br><br>

                    <!-- Campo oculto para enviar el ID del juego -->
                    <input type="hidden" id="gameId" name="gameId" value="${id}">

                    <button type="submit">Guardar Cambios</button>
                    <button type="button" onclick="closeModal()">Cancelar</button>  
                </form>
            `;
            // Mostrar el modal
            modalContainer.style.display = 'block';
        })
        .catch(error => {
            console.error('Error al obtener los datos del juego:', error);
        });
}

// Función para guardar los cambios
async function guardarCambios() {
    try {
        const gameId = document.getElementById('gameId').value;
        const nombre = document.getElementById('nombre').value;
        const categoria = document.getElementById('categoria').value;
        const añoDeSalida = document.getElementById('añoDeSalida').value;
        const precio = document.getElementById('precio').value;

        const data = {
            nombre,
            categoria,
            añoDeSalida,
            precio
        };

        const response = await fetch(`https://apigame-6xpe.onrender.com/games/${gameId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            closeModal();
            obtenerJuegos(); // Actualizar la lista de juegos después de editar
        } else {
            console.error('Error al editar el juego');
        }
    } catch (error) {
        console.error('Error al editar el juego:', error);
    }
}
