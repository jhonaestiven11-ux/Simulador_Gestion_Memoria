const particiones = [
    { tamaño: 10, libre: true, tarea: null },
    { tamaño: 15, libre: true, tarea: null },
    { tamaño: 35, libre: true, tarea: null },
    { tamaño: 40, libre: true, tarea: null },
    { tamaño: 45, libre: true, tarea: null }
];

function mostrarTabla(){

    let tabla = document.getElementById("tablaMemoria");

    tabla.innerHTML = "";

    particiones.forEach(particion => {

        let fila = `
        <tr>
            <td>${particion.tamaño} KB</td>
            <td>${particion.libre ? "Libre" : "Ocupada"}</td>
            <td>${particion.tarea ? particion.tarea.nombre : "-"}</td>
            <td>${particion.tarea ?
                particion.tamaño - particion.tarea.tamaño
                : "-"}</td>
        </tr>
        `;

        tabla.innerHTML += fila;

    });

}

function agregarTarea(){

    let nombre =
        document.getElementById("nombre").value;

    let tamaño =
        Number(document.getElementById("tamano").value);

    let mejorParticion = null;

    particiones.forEach(particion => {

        if(particion.libre &&
           particion.tamaño >= tamaño){

            if(
                mejorParticion === null ||
                particion.tamaño <
                mejorParticion.tamaño
            ){
                mejorParticion = particion;
            }

        }

    });

    if(mejorParticion){

        mejorParticion.libre = false;

        mejorParticion.tarea = {
            nombre,
            tamaño
        };

        mostrarTabla();

    }else{

        alert(
            "No existe una partición disponible"
        );

    }

}

mostrarTabla();