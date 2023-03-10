// variables

const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito')
const listaCursos = document.querySelector('#lista-cursos');

let articulosCarrito = [];



cargarEventListeners()
function cargarEventListeners() {
    // cuando agregas un curso presionando "Agregar al Carrito"
    listaCursos.addEventListener('click', agregarCurso)

    // eliminar cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    // vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [];

        limpiarHTML();
    })
}

// funciones

function agregarCurso(e) {
    e.preventDefault();
    // para detener el scroll automativo
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;

        leerDatosCurso(cursoSeleccionado);
    };
}

// eliminar un curso del carrito
function eliminarCurso(e){
    console.log(e.target.classList);
    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');

        // elimina del arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

        carritoHTML(); //iterar sobre el carrito y extrae la información del curso
    }
}

// lee el contenido del HTML
function leerDatosCurso(curso) {
    // console.log(curso);

    // crear un objeto
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('button').getAttribute('data-id'),
        cantidad: 1,
    }
    // revisa si un elemento existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id)
    if (existe) {
        // actualizamos la cantidad
        const cursos = articulosCarrito.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso;
            } else {
                return curso;
            }
        });
        articulosCarrito = [...cursos];
    } else{
        articulosCarrito = [...articulosCarrito, infoCurso];
        // agregamos el curo al carrito
    }

    // console.log(infoCurso);
    // agregar elementos al arreglo carrito
    

    console.log(articulosCarrito);
    carritoHTML()
}

// muestra el carrito de compras en el HTML
function carritoHTML() {

    // limpiar html
    limpiarHTML();
    // recorre el carrito y genera html

    articulosCarrito.forEach( curso => {
        const {imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src= "${imagen}" width ="100"></td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>

            <td>
                <a href="#" class="borrar-curso" data-id="${id}">
                X
                </a>
            </td>
        `;

        // agregar el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    });
}

// elimina los cursos de tbody
function limpiarHTML() {
    // forma rapida
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
    
    // forma lenta
    // contenedorCarrito.innerHTML = '';
}


// function agregarCurso(e){
//     console.log(e.target.classList);
// }
