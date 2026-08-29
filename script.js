
const particiones = [
    { id: 1, tamaño: 10, libre: true, tarea: null },
    { id: 2, tamaño: 15, libre: true, tarea: null },
    { id: 3, tamaño: 35, libre: true, tarea: null },
    { id: 4, tamaño: 40, libre: true, tarea: null },
    { id: 5, tamaño: 45, libre: true, tarea: null }
];

function mostrarTabla() {

    const tabla = document.getElementById("tablaMemoria");

    tabla.innerHTML = "";

    particiones.forEach(particion => {

        const fragmentacion =
            particion.tarea
                ? particion.tamaño - particion.tarea.tamaño
                : "-";

        const fila = `
        <tr>
            <td>${particion.tamaño} KB</td>
            <td>${particion.libre ? "Libre" : "Ocupada"}</td>
            <td>${particion.tarea ? particion.tarea.nombre : "-"}</td>
            <td>${fragmentacion}</td>
            <td>
                ${
                    !particion.libre
                    ? `<button onclick="liberar(${particion.id})">
                        Liberar
                       </button>`
                    : "-"
                }
            </td>
        </tr>
        `;

        tabla.innerHTML += fila;

    });

    actualizarEstadisticas();
    dibujarMemoria();
}

function agregarTarea() {

    const nombre =
        document.getElementById("nombre").value.trim();

    const tamaño =
        Number(document.getElementById("tamano").value);

    if (!nombre) {
        alert("Ingrese un nombre para la tarea");
        return;
    }

    if (isNaN(tamaño)) {
        alert("Ingrese un tamaño válido");
        return;
    }

    if (tamaño <= 0) {
        alert("El tamaño debe ser mayor que 0");
        return;
    }

    const maxParticion =
        Math.max(...particiones.map(p => p.tamaño));

    if (tamaño > maxParticion) {
        alert(
            `El tamaño máximo permitido es ${maxParticion} KB`
        );
        return;
    }

    let mejorParticion = null;

    particiones.forEach(particion => {

        if (
            particion.libre &&
            particion.tamaño >= tamaño
        ) {

            if (
                mejorParticion === null ||
                particion.tamaño <
                mejorParticion.tamaño
            ) {
                mejorParticion = particion;
            }

        }

    });

    if (mejorParticion) {

        mejorParticion.libre = false;

        mejorParticion.tarea = {
            nombre,
            tamaño
        };

        document.getElementById("nombre").value = "";
        document.getElementById("tamano").value = "";

        mostrarTabla();

    } else {

        alert(
            "No existe una partición libre para esa tarea"
        );

    }
}

function liberar(id) {

    const particion =
        particiones.find(p => p.id === id);

    particion.libre = true;
    particion.tarea = null;

    mostrarTabla();
}

function actualizarEstadisticas() {

    let usada = 0;

    particiones.forEach(p => {

        if (!p.libre) {
            usada += p.tarea.tamaño;
        }

    });

    const total =
        particiones.reduce(
            (suma, p) => suma + p.tamaño,
            0
        );

    document.getElementById("estadisticas").innerHTML =
        `Memoria utilizada: ${usada} KB de ${total} KB`;
}

function dibujarMemoria() {

    const memoria =
        document.getElementById("memoria");

    memoria.innerHTML = "";

    particiones.forEach(particion => {

        const bloque =
            document.createElement("div");

        bloque.className =
            particion.libre
                ? "bloque libre"
                : "bloque ocupada";

        bloque.style.height =
            (particion.tamaño * 3) + "px";

        bloque.innerHTML =
            particion.libre
                ? `${particion.tamaño} KB<br>Libre`
                : `${particion.tarea.nombre}<br>${particion.tarea.tamaño} KB`;

        memoria.appendChild(bloque);

    });

}

mostrarTabla();

