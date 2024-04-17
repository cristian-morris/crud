function openAddForm() {
    const modalContainer = document.getElementById('modal-container');
    const modalContent = document.getElementById('modal-content');

    modalContent.innerHTML = `
        <h2>Agregar Juego</h2>
        <form id="add-form" onsubmit="agregarJuego(); return false;">
            <label for="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" required><br><br>

            <label for="categoria">Categoría:</label>
            <input type="text" id="categoria" name="categoria" required><br><br>

            <label for="añoDeSalida">Año de Salida:</label>
            <input type="text" id="añoDeSalida" name="añoDeSalida" required><br><br>

            <label for="precio">Precio:</label>
            <input type="text" id="precio" name="precio" required><br><br>

            <button type="submit">Agregar Juego</button>
            <button type="button" onclick="closeModal()">Cancelar</button>
        </form>
    `;

    // Mostrar el modal
    modalContainer.style.display = 'block';
}

async function agregarJuego() {
    try {
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

        const response = await fetch("https://apigame-6xpe.onrender.com/create", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            closeModal();
            obtenerJuegos(); // Actualizar la lista de juegos después de agregar uno nuevo
        } else {
            console.error('Error al agregar el juego');
        }
    } catch (error) {
        console.error('Error al agregar el juego:', error);
    }
}
