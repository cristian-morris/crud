function openDeleteForm(id, nombre) {
    const modalContainer = document.getElementById('modal-container');
    const modalContent = document.getElementById('modal-content');

    modalContent.innerHTML = `
        <h2>Eliminar Juego</h2>
        <p>¿Estás seguro de que quieres eliminar el juego "${nombre}"?</p>
        <form id="delete-form" onsubmit="eliminarJuego('${id}'); return false;">
            <button type="submit">Eliminar</button>
            <button type="button" onclick="closeModal()">Cancelar</button>
        </form>
    `;

    // Mostrar el modal
    modalContainer.style.display = 'block';
}

async function eliminarJuego(id) {
    try {
        const response = await fetch(`https://apigame-6xpe.onrender.com/games/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            closeModal();
            obtenerJuegos(); // Actualizar la lista de juegos después de eliminar
        } else {
            console.error('Error al eliminar el juego');
        }
    } catch (error) {
        console.error('Error al eliminar el juego:', error);
    }
}

// Función para cerrar el modal
function closeModal() {
    document.getElementById('modal-container').style.display = 'none';
}

window.onload = obtenerJuegos;