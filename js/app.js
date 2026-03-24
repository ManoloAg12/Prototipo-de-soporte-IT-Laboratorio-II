document.addEventListener('contextmenu', event => event.preventDefault());

document.onkeydown = function(e) {
    if(e.keyCode == 123) { return false; }
    if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) { return false; }
    if(e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) { return false; }
    if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) { return false; }
    if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) { return false; }
}

document.addEventListener('DOMContentLoaded', () => {
    const usuarioLogueado = sessionStorage.getItem('usuarioLogueado');
    if(usuarioLogueado) {
        document.getElementById('nombreUsuario').textContent = usuarioLogueado;
    }
});

const inputBuscador = document.getElementById('buscador');
const tarjetas = document.querySelectorAll('.tarjeta-servicio');
const mensajeVacio = document.getElementById('mensaje-vacio');

const diccionarioSinonimos = {
    'card-wifi': ['wifi', 'wi-fi', 'internet', 'red', 'conexion', 'autenticacion', 'celular', 'movil', 'telefono', 'smartphone', 'no conecta', 'credenciales', 'password', 'clave'],
    'card-impresora': ['toner', 'impresora', 'papel', 'atasco', 'tinta', 'consumible', 'imprimir', 'mancha', 'hoja', 'cartucho', 'fotocopiadora']
};

inputBuscador.addEventListener('input', (event) => {
    const terminoBusqueda = event.target.value.toLowerCase().trim();
    let tarjetasVisibles = 0;

    tarjetas.forEach(tarjeta => {
        const idTarjeta = tarjeta.id;
        const titulo = tarjeta.querySelector('h3').textContent.toLowerCase();
        const descripcion = tarjeta.querySelector('p').textContent.toLowerCase();
        const sinonimos = diccionarioSinonimos[idTarjeta] || [];

        const coincideTexto = titulo.includes(terminoBusqueda) || descripcion.includes(terminoBusqueda);
        const coincideSinonimo = sinonimos.some(palabra => palabra.includes(terminoBusqueda));

        if (coincideTexto || coincideSinonimo || terminoBusqueda === '') {
            tarjeta.style.display = 'block';
            tarjetasVisibles++;
        } else {
            tarjeta.style.display = 'none';
        }
    });

    if (tarjetasVisibles === 0) {
        mensajeVacio.classList.remove('hidden');
    } else {
        mensajeVacio.classList.add('hidden');
    }
});

function abrirModal(id) {
    document.getElementById(id).classList.remove('hidden');
}

function cerrarModal(id) {
    document.getElementById(id).classList.add('hidden');
}

function cerrarSesion() {
    abrirModal('modal-logout');
}

function confirmarCerrarSesion() {
    sessionStorage.removeItem('usuarioLogueado');
    window.location.href = 'index.html';
}