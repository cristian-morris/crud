async function obtenerJuegos() {
    try {
        const response = await fetch('/games'); 
        const juegos = await response.json(); 

        // Construir la lista de juegos
        const juegosHTML = juegos.map(juego => {
            return `<div class="game-info">
                        <h3>${juego.nombre}</h3>
                        <p><strong>Categoría:</strong> ${juego.categoria}</p>
                        <p><strong>Año de Salida:</strong> ${juego.añoDeSalida}</p>
                        <p><strong>Precio:</strong> ${juego.precio}</p>
                        <div class="button-container">
                            <button class="edit-btn" onclick="openEditForm('${juego.id}')">Editar</button>
                            <button class="delete-btn" onclick="openDeleteForm('${juego.id}', '${juego.nombre}')">Eliminar</button>
                        </div>
                    </div>`;
        }).join('');
        

        // Actualizar el contenido del contenedor
        document.getElementById('juegos-container').innerHTML = juegosHTML;
    } catch (error) {
        console.error('Error al obtener los juegos:', error);
    }
}