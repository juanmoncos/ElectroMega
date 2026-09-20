/* =========================================================
   ELECTROMEGA - Catálogo, categorías, búsqueda y animaciones
   =========================================================
   Estructura:
   1. Datos de productos (fácil de mantener y ampliar)
   2. Configuración de categorías
   3. Renderizado de tarjetas (a partir de un <template>)
   4. Menú de categorías + menú móvil
   5. Buscador (con debounce)
   6. Animación de aparición al hacer scroll (IntersectionObserver)
   ========================================================= */

/* =========================================================
   1. DATOS DE PRODUCTOS
   ========================================================= 
   Para agregar un producto nuevo: copia un objeto, cambia
   los valores y listo. No hay que tocar el HTML.
   La propiedad "categoria" debe ser una de las claves
   definidas en CATEGORIAS (ver más abajo).
*/
const PRODUCTOS = [
  // ---------- Samsung ----------
  { categoria: "celulares", marca: "Samsung", modelo: "Galaxy A05", imagen: "imagenes/samsung_galaxy_a05.jpg",
    camara: "Doble, 50MP + Lente auxiliar", camaraFrontal: "8MP", almacenamiento: "32GB / 64GB / 128GB",
    ram: "3GB / 6GB RAM", procesador: "Mediatek Helio G85", pantalla: "6.7\"", bateria: "5000 mAh", precio: "$3.999.000 COP" },
  { categoria: "celulares", marca: "Samsung", modelo: "Galaxy A06", imagen: "imagenes/samsung_galaxy_a06.jpg",
    camara: "Dual, 50MP + Lente auxiliar", camaraFrontal: "8MP", almacenamiento: "64GB / 128GB",
    ram: "4GB / 6GB RAM", procesador: "Mediatek Helio G85", pantalla: "6.7\"", bateria: "5000 mAh", precio: "$3.999.000 COP" },
  { categoria: "celulares", marca: "Samsung", modelo: "Galaxy A07", imagen: "imagenes/samsung-galaxy-a07.jpg",
    camara: "Doble, 50MP + Lente auxiliar", camaraFrontal: "8MP", almacenamiento: "64GB / 128GB / 256GB",
    ram: "4GB / 6GB / 8GB RAM", procesador: "Mediatek Helio G99", pantalla: "6.7\"", bateria: "5000 mAh", precio: "$3.999.000 COP" },
  { categoria: "celulares", marca: "Samsung", modelo: "Galaxy A16", imagen: "imagenes/samsung-galaxy-a16.jpg",
    camara: "Triple, 50 MP + 5MP + 2MP", camaraFrontal: "13MP", almacenamiento: "128GB / 256GB",
    ram: "4GB / 6GB / 8GB RAM", procesador: "Mediatek Helio G99", pantalla: "6.7\"", bateria: "5000 mAh", precio: "$3.999.000 COP" },
  { categoria: "celulares", marca: "Samsung", modelo: "Galaxy A16 5G", imagen: "imagenes/samsung-galaxy-a16-5g.jpg",
    camara: "Triple, 50 MP + 5MP + 2MP", camaraFrontal: "13MP", almacenamiento: "128GB / 256GB",
    ram: "4GB / 6GB / 8GB RAM", procesador: "Exynos 1330", pantalla: "6.7\"", bateria: "5000 mAh", precio: "$3.999.000 COP" },
  { categoria: "celulares", marca: "Samsung", modelo: "Galaxy A26", imagen: "imagenes/samsung-galaxy-a26.jpg",
    camara: "Triple, 50MP + 8MP + 2MP", camaraFrontal: "13MP", almacenamiento: "128GB / 256GB",
    ram: "4GB / 6GB / 8GB RAM", procesador: "Exynos 1380", pantalla: "6.7\"", bateria: "5000 mAh", precio: "$3.999.000 COP" },
  { categoria: "celulares", marca: "Samsung", modelo: "Galaxy A56", imagen: "imagenes/samsung-galaxy-a56.jpg",
    camara: "Triple, 50MP + 12MP + 5MP", camaraFrontal: "12MP", almacenamiento: "128GB / 256GB",
    ram: "6GB / 8GB / 12GB RAM", procesador: "Exynos 1580", pantalla: "6.7\"", bateria: "5000 mAh", precio: "$3.999.000 COP" },
  { categoria: "celulares", marca: "Samsung", modelo: "Galaxy M55", imagen: "imagenes/samsung-galaxy-m55.jpg",
    camara: "Triple, 50MP + 8MP + 2MP", camaraFrontal: "50MP", almacenamiento: "128GB / 256GB",
    ram: "8GB / 12GB RAM", procesador: "Qualcomm SM7450-AB Snapdragon 7 Gen 1", pantalla: "6.7\"", bateria: "5000 mAh", precio: "$3.999.000 COP" },

  // ---------- Xiaomi ----------
  { categoria: "celulares", marca: "Xiaomi", modelo: "Redmi A5", imagen: "imagenes/xiaomi-redmi-a5.jpg",
    camara: "Doble, 32MP + Lente auxiliar", camaraFrontal: "8MP", almacenamiento: "64GB / 128GB",
    ram: "3GB / 4GB / 6GB RAM", procesador: "Unisoc T7250", pantalla: "6.88\"", bateria: "5200 mAh", precio: "$1.899.000 COP" },
  { categoria: "celulares", marca: "Xiaomi", modelo: "Redmi 13x", imagen: "imagenes/xiaomi-redmi-13x.jpg",
    camara: "Doble, 108MP + 2MP", camaraFrontal: "13MP", almacenamiento: "128GB / 256GB",
    ram: "6GB / 8GB RAM", procesador: "Mediatek Helio G91 Ultra", pantalla: "6.79\"", bateria: "5030 mAh", precio: "$1.899.000 COP" },
  { categoria: "celulares", marca: "Xiaomi", modelo: "Redmi Note 14", imagen: "imagenes/xiaomi-redmi-note-14.jpg",
    camara: "Triple, 108MP + 2MP + Lente auxiliar", camaraFrontal: "20MP", almacenamiento: "128GB / 256GB",
    ram: "6GB / 8GB RAM", procesador: "Mediatek Helio G99 Ultra", pantalla: "6.67\"", bateria: "5500 mAh", precio: "$1.899.000 COP" },
  { categoria: "celulares", marca: "Xiaomi", modelo: "Redmi Note 14s", imagen: "imagenes/xiaomi-redmi-note-14s.jpg",
    camara: "Triple, 200MP + 8MP + 2MP", camaraFrontal: "16MP", almacenamiento: "128GB / 256GB / 512GB",
    ram: "8GB / 12GB RAM", procesador: "Mediatek Helio G99 Ultra", pantalla: "6.67\"", bateria: "5000 mAh", precio: "$1.899.000 COP" },
  { categoria: "celulares", marca: "Xiaomi", modelo: "Redmi Note 14 Pro", imagen: "imagenes/xiaomi-redmi-note-14-pro.jpg",
    camara: "Triple, 200MP + 8MP + 2MP", camaraFrontal: "32MP", almacenamiento: "128GB / 256GB / 512GB",
    ram: "8GB / 12GB RAM", procesador: "Mediatek Helio G100 Ultra", pantalla: "6.67\"", bateria: "5500 mAh", precio: "$1.899.000 COP" },
  { categoria: "celulares", marca: "Xiaomi", modelo: "Redmi Note 14 Pro 5G", imagen: "imagenes/xiaomi-redmi-note-14-pro-5g.jpg",
    camara: "Triple, 200MP + 8MP + 2MP", camaraFrontal: "20MP", almacenamiento: "256GB / 512GB",
    ram: "8GB / 12GB RAM", procesador: "Mediatek Dimensity 7300 Ultra", pantalla: "6.67\"", bateria: "5110 mAh", precio: "$1.899.000 COP" },
  { categoria: "celulares", marca: "Xiaomi", modelo: "Redmi 15", imagen: "imagenes/xiaomi-redmi-15.jpg",
    camara: "Dual, 50MP + Lente auxiliar", camaraFrontal: "8MP", almacenamiento: "128GB / 256GB",
    ram: "4GB / 6GB / 8GB RAM", procesador: "Qualcomm SM6375 Snapdragon 6s Gen 3", pantalla: "6.9\"", bateria: "7000 mAh", precio: "$1.899.000 COP" },
  { categoria: "celulares", marca: "Xiaomi", modelo: "Redmi 15C", imagen: "imagenes/xiaomi-redmi-15c.jpg",
    camara: "Dual, 50MP + Lente auxiliar", camaraFrontal: "8MP", almacenamiento: "128GB / 256GB",
    ram: "4GB / 6GB / 8GB RAM", procesador: "Mediatek Helio G81 Ultra", pantalla: "6.9\"", bateria: "6000 mAh", precio: "$1.899.000 COP" },

  // ---------- Realme ----------
  { categoria: "celulares", marca: "Realme", modelo: "Note 60x", imagen: "imagenes/realme-note-60x.jpg",
    camara: "Unica, 8MP", camaraFrontal: "5MP", almacenamiento: "64GB / 128GB",
    ram: "3GB / 4GB RAM", procesador: "Unisoc Tiger T612", pantalla: "6.74\"", bateria: "5000 mAh", precio: "$1.899.000 COP" },

  // ---------- iPhone ----------
  { categoria: "celulares", marca: "iPhone", modelo: "iPhone 12 Pro Max", imagen: "imagenes/iphone_12_pro_max.jpg",
    camara: "Triple, 12MP + 12MP + 12MP", camaraFrontal: "12MP", almacenamiento: "128GB / 256GB / 512GB",
    ram: "6GB RAM", procesador: "Apple A14 Bionic", pantalla: "6.7\"", bateria: "3687 mAh", precio: "$5.499.000 COP" },
  { categoria: "celulares", marca: "iPhone", modelo: "iPhone 13", imagen: "imagenes/iphone_13.jpg",
    camara: "Doble, 12MP + 12MP", camaraFrontal: "12MP", almacenamiento: "128GB / 256GB / 512GB",
    ram: "4GB RAM", procesador: "Apple A15 Bionic", pantalla: "6.1\"", bateria: "3240 mAh", precio: "$5.499.000 COP" },
  { categoria: "celulares", marca: "iPhone", modelo: "iPhone 13 Pro Max", imagen: "imagenes/iphone_13_pro_max.jpg",
    camara: "Triple, 12MP + 12MP + 12MP", camaraFrontal: "12MP", almacenamiento: "128GB / 256GB / 512GB / 1TB",
    ram: "6GB RAM", procesador: "Apple A15 Bionic", pantalla: "6.7\"", bateria: "4352 mAh", precio: "$5.499.000 COP" },
  { categoria: "celulares", marca: "iPhone", modelo: "iPhone 14 Pro Max", imagen: "imagenes/iphone_14_pro_max.jpg",
    camara: "Triple, 48MP + 12MP + 12MP", camaraFrontal: "12MP", almacenamiento: "128GB / 256GB / 512GB / 1TB",
    ram: "6GB RAM", procesador: "Apple A16 Bionic", pantalla: "6.7\"", bateria: "4323 mAh", precio: "$5.499.000 COP" },

  // ---------- Motorola ----------
  { categoria: "celulares", marca: "Motorola", modelo: "Moto E15", imagen: "imagenes/mototola-moto-e15.jpg",
    camara: "Unica, 32MP", camaraFrontal: "8MP", almacenamiento: "64GB",
    ram: "2GB RAM", procesador: "Mediatek Helio G81 Extreme", pantalla: "6.67\"", bateria: "5200 mAh", precio: "$2.299.000 COP" },
  { categoria: "celulares", marca: "Motorola", modelo: "Moto G04s", imagen: "imagenes/motorola-moto-g04s.jpg",
    camara: "Unica, 50MP", camaraFrontal: "5MP", almacenamiento: "64GB / 128GB / 256GB",
    ram: "4GB RAM", procesador: "Unisoc T606", pantalla: "6.56\"", bateria: "5000 mAh", precio: "$2.299.000 COP" },
  { categoria: "celulares", marca: "Motorola", modelo: "Moto G15", imagen: "imagenes/mototola-moto-g15.jpg",
    camara: "Dual, 50MP + 5MP", camaraFrontal: "8MP", almacenamiento: "128GB / 256GB / 512GB",
    ram: "4GB / 6GB / 8GB RAM", procesador: "Mediatek Helio G81 Extreme", pantalla: "6.72\"", bateria: "5200 mAh", precio: "$2.299.000 COP" },
  { categoria: "celulares", marca: "Motorola", modelo: "Moto G56", imagen: "imagenes/motorola-moto-g56.jpg",
    camara: "Dual, 50MP + 8MP", camaraFrontal: "32MP", almacenamiento: "128GB / 256GB / 512GB",
    ram: "4GB / 8GB / 12GB RAM", procesador: "Mediatek Dimensity 7060", pantalla: "6.72\"", bateria: "5200 mAh", precio: "$2.299.000 COP" },
  { categoria: "celulares", marca: "Motorola", modelo: "Edge 60 Fusion", imagen: "imagenes/motorola-edge-60-fusion.jpg",
    camara: "Dual, 50MP + 13MP", camaraFrontal: "32MP", almacenamiento: "256GB / 512GB",
    ram: "8GB / 12GB RAM", procesador: "Mediatek Dimensity 7300", pantalla: "6.67\"", bateria: "5200 mAh", precio: "$2.299.000 COP" },

  // ---------- Oppo ----------
  { categoria: "celulares", marca: "Oppo", modelo: "A5", imagen: "imagenes/oppo-a5.jpg",
    camara: "Dual, 50MP + 2MP", camaraFrontal: "8MP", almacenamiento: "128GB / 256GB",
    ram: "4GB / 6GB / 8GB RAM", procesador: "Mediatek Dimensity 6300", pantalla: "6.67\"", bateria: "6000 mAh", precio: "$2.799.000 COP" },
  { categoria: "celulares", marca: "Oppo", modelo: "A20", imagen: "imagenes/oppo-a20.jpg",
    camara: "Unica, 8MP", camaraFrontal: "5MP", almacenamiento: "128GB",
    ram: "4GB RAM", procesador: "Qualcomm Snapdragon 6s Gen 1", pantalla: "6.67\"", bateria: "5100 mAh", precio: "$2.799.000 COP" },
  { categoria: "celulares", marca: "Oppo", modelo: "A40", imagen: "imagenes/oppo-a40.jpg",
    camara: "Dual, 50MP + 2MP", camaraFrontal: "5MP", almacenamiento: "128GB",
    ram: "4GB / 8GB RAM", procesador: "Qualcomm Snapdragon 6s Gen 1", pantalla: "6.67\"", bateria: "5100 mAh", precio: "$2.799.000 COP" },
  { categoria: "celulares", marca: "Oppo", modelo: "Reno11 F", imagen: "imagenes/oppo-reno-11f.jpg",
    camara: "Triple, 64MP + 8MP + 2MP", camaraFrontal: "32MP", almacenamiento: "256GB",
    ram: "8GB RAM", procesador: "Mediatek Dimensity 7050", pantalla: "6.7\"", bateria: "5000 mAh", precio: "$2.799.000 COP" },

  // ---------- Infinix ----------
  { categoria: "celulares", marca: "Infinix", modelo: "Smart 10", imagen: "imagenes/infinix-smart-10.jpg",
    camara: "Unica, 8MP", camaraFrontal: "8MP", almacenamiento: "64GB / 128GB / 256GB",
    ram: "3GB / 4GB / 6GB / 8GB RAM", procesador: "Unisoc T7250", pantalla: "6.67\"", bateria: "5000 mAh", precio: "$1.499.000 COP" },
  { categoria: "celulares", marca: "Infinix", modelo: "Note 50s", imagen: "imagenes/infinix-note-50s.jpg",
    camara: "Dual, 64MP + 2MP", camaraFrontal: "13MP", almacenamiento: "128GB / 256GB",
    ram: "8GB RAM", procesador: "Mediatek Dimensity 7300 Ultimate", pantalla: "6.78\"", bateria: "5500 mAh", precio: "$1.499.000 COP" },
  { categoria: "celulares", marca: "Infinix", modelo: "Note 50 Pro", imagen: "imagenes/infinix-note50-pro.jpg",
    camara: "Dual, 50MP + 8MP", camaraFrontal: "32MP", almacenamiento: "256GB",
    ram: "8GB / 12GB RAM", procesador: "Mediatek Helio G100 Ultimate", pantalla: "6.78\"", bateria: "5200 mAh", precio: "$1.499.000 COP" },

  // ---------- Tecno ----------
  { categoria: "celulares", marca: "Tecno", modelo: "Spark Go 2", imagen: "imagenes/tecno-spark-go2.jpg",
    camara: "Unica, 13MP", camaraFrontal: "8MP", almacenamiento: "64GB / 128GB / 256GB",
    ram: "3GB / 4GB RAM", procesador: "Unisoc T7250", pantalla: "6.67\"", bateria: "5000 mAh", precio: "$1.499.000 COP" },
  { categoria: "celulares", marca: "Tecno", modelo: "Spark 40 Pro+", imagen: "imagenes/techno-spark-40-pro-plus.jpg",
    camara: "Dual, 50MP + Lente auxiliar", camaraFrontal: "13MP", almacenamiento: "128GB / 256GB",
    ram: "8GB RAM", procesador: "Mediatek Helio G200", pantalla: "6.78\"", bateria: "5200 mAh", precio: "$1.499.000 COP" },
  { categoria: "celulares", marca: "Tecno", modelo: "Camon 40", imagen: "imagenes/tecno-camon-40.jpg",
    camara: "Dual, 50MP + 8MP", camaraFrontal: "32MP", almacenamiento: "128GB / 256GB",
    ram: "8GB / 12GB RAM", procesador: "Mediatek Helio G100 Ultimate", pantalla: "6.78\"", bateria: "5200 mAh", precio: "$1.499.000 COP" },

  // ---------- Honor ----------
  { categoria: "celulares", marca: "Honor", modelo: "Magic7 Lite", imagen: "imagenes/honor-x9c.jpg",
    camara: "Dual, 108MP + 5MP", camaraFrontal: "16MP", almacenamiento: "256GB / 512GB",
    ram: "6GB / 8GB / 12GB RAM", procesador: "Qualcomm SM6450 Snapdragon 6 Gen 1", pantalla: "6.78\"", bateria: "6600 mAh", precio: "$1.499.000 COP" },

  /* ---------- Accesorios y Electrodomésticos ----------
     Todavía no hay productos cargados en estas categorías.
     Para agregar uno, copia un objeto de arriba, cambia
     "categoria" a "accesorios" o "electrodomesticos" y
     completa los campos (deja vacío "" lo que no aplique). */
];

/* =========================================================
   2. CATEGORÍAS
   ========================================================= */
const CATEGORIAS = {
  celulares: {
    etiqueta: "Celulares",
    tituloSeccion: "Catálogo de Celulares",
    subtitulo: "Explora nuestra selección de las mejores marcas del mercado",
    mensajeVacio: "Aún no hay celulares cargados en esta categoría."
  },
  accesorios: {
    etiqueta: "Accesorios",
    tituloSeccion: "Accesorios",
    subtitulo: "Fundas, cargadores, audífonos y más",
    mensajeVacio: "Estamos alistando el catálogo de accesorios. Vuelve pronto."
  },
  electrodomesticos: {
    etiqueta: "Electrodomésticos",
    tituloSeccion: "Electrodomésticos",
    subtitulo: "Todo para tu hogar",
    mensajeVacio: "Estamos alistando el catálogo de electrodomésticos. Vuelve pronto."
  }
};

const ORDEN_CATEGORIAS = ["celulares", "accesorios", "electrodomesticos"];

/* Estado actual de la vista */
let categoriaActiva = "celulares";
let textoBusquedaActual = "";

/* =========================================================
   3. RENDERIZADO
   ========================================================= */
const contenedorGrid = document.getElementById("grid-productos");
const plantillaProducto = document.getElementById("plantilla-producto");
const tituloSeccionEl = document.getElementById("titulo-seccion");
const subtituloEl = document.getElementById("subtitulo-seccion");
const estadoVacioEl = document.getElementById("estado-vacio");
const mensajeVacioEl = document.getElementById("mensaje-vacio");

// Un único observer reutilizado para todas las tarjetas (mejor que un listener de scroll)
const observerAparicion = new IntersectionObserver((entradas) => {
  entradas.forEach(entrada => {
    if (entrada.isIntersecting) {
      entrada.target.classList.add("visible");
      observerAparicion.unobserve(entrada.target);
    }
  });
}, { threshold: 0.1, rootMargin: "0px 0px -60px 0px" });

function crearTarjeta(producto) {
  const nodo = plantillaProducto.content.firstElementChild.cloneNode(true);

  const img = nodo.querySelector(".imagen-producto img");
  img.src = producto.imagen;
  img.alt = `${producto.marca} ${producto.modelo}`;
  img.loading = "lazy";
  img.decoding = "async";

  nodo.querySelector(".marca").textContent = producto.marca;
  nodo.querySelector(".modelo").textContent = producto.modelo;
  nodo.querySelector(".precio").textContent = producto.precio;

  const filas = [
    ["icons/camara.png", producto.camara],
    ["icons/camara-web.png", producto.camaraFrontal],
    ["icons/tarjeta-de-memoria.png", producto.almacenamiento],
    ["icons/ram.png", producto.ram],
    ["icons/procesador.png", producto.procesador],
    ["icons/mostrar.png", producto.pantalla],
    ["icons/bateria.png", producto.bateria]
  ];

  const lista = nodo.querySelector(".caracteristicas");
  filas.forEach(([icono, texto]) => {
    if (!texto) return; // permite dejar campos vacíos sin romper el diseño
    const li = document.createElement("li");
    const imgIcono = document.createElement("img");
    imgIcono.src = icono;
    imgIcono.alt = "";
    imgIcono.loading = "lazy";
    li.appendChild(imgIcono);
    li.append(" " + texto);
    lista.appendChild(li);
  });

  return nodo;
}

function renderizar() {
  const config = CATEGORIAS[categoriaActiva];
  tituloSeccionEl.textContent = config.tituloSeccion;
  subtituloEl.textContent = config.subtitulo;

  const texto = textoBusquedaActual.toLowerCase().trim();
  const productosCategoria = PRODUCTOS.filter(p => p.categoria === categoriaActiva);
  const productosFiltrados = texto
    ? productosCategoria.filter(p => `${p.marca} ${p.modelo}`.toLowerCase().includes(texto))
    : productosCategoria;

  // Limpia el grid de forma eficiente
  contenedorGrid.innerHTML = "";

  if (productosFiltrados.length === 0) {
    contenedorGrid.hidden = true;
    estadoVacioEl.hidden = false;
    mensajeVacioEl.textContent = texto
      ? `No encontramos resultados para "${textoBusquedaActual}" en ${config.etiqueta.toLowerCase()}.`
      : config.mensajeVacio;
    return;
  }

  estadoVacioEl.hidden = true;
  contenedorGrid.hidden = false;

  // Se arma todo en un fragmento y se inserta una sola vez (evita reflow por tarjeta)
  const fragmento = document.createDocumentFragment();
  productosFiltrados.forEach(producto => {
    const tarjeta = crearTarjeta(producto);
    fragmento.appendChild(tarjeta);
  });
  contenedorGrid.appendChild(fragmento);

  // Vuelve a observar las tarjetas recién insertadas para la animación de aparición
  contenedorGrid.querySelectorAll(".producto").forEach(tarjeta => {
    observerAparicion.observe(tarjeta);
  });
}

/* =========================================================
   4. MENÚ DE CATEGORÍAS + MENÚ MÓVIL
   ========================================================= */
const botonesMenu = document.querySelectorAll(".menu-categorias [data-categoria]");
const botonHamburguesa = document.getElementById("btn-menu-movil");
const menuCategorias = document.getElementById("menu-categorias");

function activarCategoria(categoria) {
  if (!CATEGORIAS[categoria]) return;
  categoriaActiva = categoria;

  botonesMenu.forEach(boton => {
    const esActivo = boton.dataset.categoria === categoria;
    boton.classList.toggle("activo", esActivo);
    boton.setAttribute("aria-current", esActivo ? "page" : "false");
  });

  // Al cambiar de categoría, se limpia la búsqueda para partir de cero
  if (inputBuscador) inputBuscador.value = "";
  textoBusquedaActual = "";

  renderizar();
  cerrarMenuMovil();
  document.getElementById("catalogo").scrollIntoView({ behavior: "smooth", block: "start" });
}

botonesMenu.forEach(boton => {
  boton.addEventListener("click", () => activarCategoria(boton.dataset.categoria));
});

function cerrarMenuMovil() {
  menuCategorias.classList.remove("abierto");
  botonHamburguesa?.setAttribute("aria-expanded", "false");
}

botonHamburguesa?.addEventListener("click", () => {
  const abierto = menuCategorias.classList.toggle("abierto");
  botonHamburguesa.setAttribute("aria-expanded", String(abierto));
});

/* =========================================================
   5. BUSCADOR (con debounce para no filtrar en cada tecla)
   ========================================================= */
const inputBuscador = document.getElementById("buscador");
const btnBuscar = document.getElementById("btnBuscar");
let temporizadorBusqueda = null;

function ejecutarBusqueda() {
  textoBusquedaActual = inputBuscador.value;
  renderizar();
}

inputBuscador?.addEventListener("input", () => {
  clearTimeout(temporizadorBusqueda);
  temporizadorBusqueda = setTimeout(ejecutarBusqueda, 250);
});

btnBuscar?.addEventListener("click", ejecutarBusqueda);

inputBuscador?.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    clearTimeout(temporizadorBusqueda);
    ejecutarBusqueda();
  }
});

/* =========================================================
   6. DESPLAZAMIENTO SUAVE PARA ENLACES INTERNOS
   ========================================================= */
document.querySelectorAll('a[href^="#"]').forEach(ancla => {
  ancla.addEventListener('click', e => {
    e.preventDefault();
    const destino = document.querySelector(ancla.getAttribute('href'));
    if (destino) destino.scrollIntoView({ behavior: 'smooth' });
  });
});

/* =========================================================
   INICIO
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  activarCategoria("celulares");
});
