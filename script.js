/* =========================================================
   ELECTROMEGA - Catálogo, categorías, búsqueda y animaciones
   =========================================================
   Estructura:
   1. Datos de productos (fácil de mantener y ampliar)
   2. Configuración de categorías
   3. Iconos (SVG en línea, sin depender de archivos externos)
   4. Renderizado de tarjetas (a partir de un <template>)
   5. Menú de categorías + menú móvil
   6. Buscador (con debounce)
   7. Animación de aparición al hacer scroll (IntersectionObserver)
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
  { categoria: "celulares", marca: "Samsung", modelo: "Galaxy A07", imagen: "imagenes/samsung-galaxy-a07.jpg",
    camara: "Dual, 50MP + 2MP", camaraFrontal: "8MP", almacenamiento: "64GB",
    ram: "4GB RAM", procesador: "MediaTek Helio G99", pantalla: "6.7\"", bateria: "5000 mAh", precio: "$350.000 COP" },
  { categoria: "celulares", marca: "Samsung", modelo: "Galaxy A07", imagen: "imagenes/samsung-galaxy-a07.jpg",
    camara: "Dual, 50MP + 2MP", camaraFrontal: "8MP", almacenamiento: "128GB",
    ram: "4GB RAM", procesador: "MediaTek Helio G99", pantalla: "6.7\"", bateria: "5000 mAh", precio: "$385.000 COP" },
  { categoria: "celulares", marca: "Samsung", modelo: "Galaxy A17", imagen: "imagenes/samsung-galaxy-a17.jpg",
    camara: "Triple, 50MP + 5MP + 2MP", camaraFrontal: "13MP", almacenamiento: "128GB",
    ram: "4GB RAM", procesador: "Exynos 1330 / Helio G99", pantalla: "6.7\" Super AMOLED, 90Hz", bateria: "5000 mAh", precio: "$510.000 COP" },
  { categoria: "celulares", marca: "Samsung", modelo: "Galaxy A17", imagen: "imagenes/samsung-galaxy-a17.jpg",
    camara: "Triple, 50MP + 5MP + 2MP", camaraFrontal: "13MP", almacenamiento: "256GB",
    ram: "8GB RAM", procesador: "Exynos 1330 / Helio G99", pantalla: "6.7\" Super AMOLED, 90Hz", bateria: "5000 mAh", precio: "$655.000 COP" },
  { categoria: "celulares", marca: "Samsung", modelo: "Galaxy A26 5G (1 SIM)", imagen: "imagenes/samsung-galaxy-a26.jpg",
    camara: "Triple, 50MP + 8MP + 2MP", camaraFrontal: "13MP", almacenamiento: "256GB",
    ram: "8GB RAM", procesador: "Exynos 1380", pantalla: "6.7\" Super AMOLED, 120Hz", bateria: "5000 mAh", precio: "$655.000 COP" },
  { categoria: "celulares", marca: "Samsung", modelo: "Galaxy A36 5G (2 SIM)", imagen: "imagenes/samsung-galaxy-a36.jpg",
    camara: "Triple, 50MP + 8MP + 5MP", camaraFrontal: "12MP", almacenamiento: "256GB",
    ram: "8GB RAM", procesador: "Snapdragon 6 Gen 3", pantalla: "6.7\" Super AMOLED, 120Hz", bateria: "5000 mAh, 45W", precio: "$1.105.000 COP" },
  { categoria: "celulares", marca: "Samsung", modelo: "Galaxy A37 5G", imagen: "imagenes/samsung-galaxy-a37.jpg",
    camara: "Triple, 50MP + 8MP + 5MP", camaraFrontal: "12MP", almacenamiento: "256GB",
    ram: "8GB RAM", procesador: "Exynos 1480", pantalla: "6.7\" Super AMOLED, 120Hz", bateria: "5000 mAh, 45W", precio: "$1.225.000 COP" },
  { categoria: "celulares", marca: "Samsung", modelo: "Galaxy A56 5G", imagen: "imagenes/samsung-galaxy-a56.jpg",
    camara: "Triple, 50MP + 12MP + 5MP", camaraFrontal: "12MP", almacenamiento: "256GB",
    ram: "8GB RAM", procesador: "Exynos 1580", pantalla: "6.7\" Super AMOLED, 120Hz", bateria: "5000 mAh, 45W", precio: "$1.325.000 COP" },
  { categoria: "celulares", marca: "Samsung", modelo: "Galaxy A57 5G", imagen: "imagenes/samsung-galaxy-a57.jpg",
    camara: "Triple, 50MP + 12MP + 5MP", camaraFrontal: "12MP", almacenamiento: "256GB",
    ram: "8GB RAM", procesador: "Exynos 1680", pantalla: "6.7\" Super AMOLED+, 120Hz", bateria: "5000 mAh, 45W", precio: "$1.855.000 COP" },

  // ---------- Apple ----------
  { categoria: "celulares", marca: "iPhone", modelo: "iPhone 13", imagen: "imagenes/iphone-13.jpg",
    camara: "Doble, 12MP + 12MP", camaraFrontal: "12MP", almacenamiento: "128GB",
    ram: "4GB RAM", procesador: "Apple A15 Bionic", pantalla: "6.1\" OLED", bateria: "3240 mAh", precio: "$1.350.000 COP" },
  { categoria: "celulares", marca: "iPhone", modelo: "iPhone 13 Pro", imagen: "imagenes/iphone-13-pro.jpg",
    camara: "Triple, 12MP + 12MP + 12MP", camaraFrontal: "12MP", almacenamiento: "128GB",
    ram: "6GB RAM", procesador: "Apple A15 Bionic", pantalla: "6.1\" OLED, 120Hz ProMotion", bateria: "3095 mAh", precio: "$1.680.000 COP" },
  { categoria: "celulares", marca: "iPhone", modelo: "iPhone 13 Pro", imagen: "imagenes/iphone-13-pro.jpg",
    camara: "Triple, 12MP + 12MP + 12MP", camaraFrontal: "12MP", almacenamiento: "256GB",
    ram: "6GB RAM", procesador: "Apple A15 Bionic", pantalla: "6.1\" OLED, 120Hz ProMotion", bateria: "3095 mAh", precio: "$1.830.000 COP" },
  { categoria: "celulares", marca: "iPhone", modelo: "iPhone 13 Pro Max", imagen: "imagenes/iphone-13-pro-max.jpg",
    camara: "Triple, 12MP + 12MP + 12MP", camaraFrontal: "12MP", almacenamiento: "256GB",
    ram: "6GB RAM", procesador: "Apple A15 Bionic", pantalla: "6.7\" OLED, 120Hz ProMotion", bateria: "4352 mAh", precio: "$2.300.000 COP" },
  { categoria: "celulares", marca: "iPhone", modelo: "iPhone 14", imagen: "imagenes/iphone-14.jpg",
    camara: "Doble, 12MP + 12MP", camaraFrontal: "12MP", almacenamiento: "128GB",
    ram: "6GB RAM", procesador: "Apple A15 Bionic", pantalla: "6.1\" OLED", bateria: "3279 mAh", precio: "$1.400.000 COP" },
  { categoria: "celulares", marca: "iPhone", modelo: "iPhone 14 Pro", imagen: "imagenes/iphone-14-pro.jpg",
    camara: "Triple, 48MP + 12MP + 12MP", camaraFrontal: "12MP", almacenamiento: "256GB",
    ram: "6GB RAM", procesador: "Apple A16 Bionic", pantalla: "6.1\" OLED, 120Hz ProMotion", bateria: "3200 mAh", precio: "$2.070.000 COP" },
  { categoria: "celulares", marca: "iPhone", modelo: "iPhone 14 Pro Max", imagen: "imagenes/iphone-14-pro-max.jpg",
    camara: "Triple, 48MP + 12MP + 12MP", camaraFrontal: "12MP", almacenamiento: "128GB",
    ram: "6GB RAM", procesador: "Apple A16 Bionic", pantalla: "6.7\" OLED, 120Hz ProMotion", bateria: "4323 mAh", precio: "$2.200.000 COP" },
  { categoria: "celulares", marca: "iPhone", modelo: "iPhone 14 Pro Max", imagen: "imagenes/iphone-14-pro-max.jpg",
    camara: "Triple, 48MP + 12MP + 12MP", camaraFrontal: "12MP", almacenamiento: "256GB",
    ram: "6GB RAM", procesador: "Apple A16 Bionic", pantalla: "6.7\" OLED, 120Hz ProMotion", bateria: "4323 mAh", precio: "$2.450.000 COP" },
  { categoria: "celulares", marca: "iPhone", modelo: "iPhone 14 Pro Max (Nuevo)", imagen: "imagenes/iphone-14-pro-max.jpg",
    camara: "Triple, 48MP + 12MP + 12MP", camaraFrontal: "12MP", almacenamiento: "128GB",
    ram: "6GB RAM", procesador: "Apple A16 Bionic", pantalla: "6.7\" OLED, 120Hz ProMotion", bateria: "4323 mAh", precio: "$2.950.000 COP" },
  { categoria: "celulares", marca: "iPhone", modelo: "iPhone 15", imagen: "imagenes/iphone-15.jpg",
    camara: "Doble, 48MP + 12MP", camaraFrontal: "12MP", almacenamiento: "128GB",
    ram: "6GB RAM", procesador: "Apple A16 Bionic", pantalla: "6.1\" OLED", bateria: "3349 mAh", precio: "$1.950.000 COP" },
  { categoria: "celulares", marca: "iPhone", modelo: "iPhone 15 Pro Max", imagen: "imagenes/iphone-15-pro-max.jpg",
    camara: "Triple, 48MP + 12MP + 12MP (zoom óptico 5x)", camaraFrontal: "12MP", almacenamiento: "256GB",
    ram: "8GB RAM", procesador: "Apple A17 Pro", pantalla: "6.7\" OLED, 120Hz ProMotion", bateria: "4441 mAh", precio: "$2.720.000 COP" },
  { categoria: "celulares", marca: "iPhone", modelo: "iPhone 16", imagen: "imagenes/iphone-16.jpg",
    camara: "Doble, 48MP + 12MP", camaraFrontal: "12MP", almacenamiento: "128GB",
    ram: "8GB RAM", procesador: "Apple A18", pantalla: "6.1\" OLED", bateria: "3561 mAh", precio: "$2.450.000 COP" },
  { categoria: "celulares", marca: "iPhone", modelo: "iPhone 16 Pro Max", imagen: "imagenes/iphone-16-pro-max.jpg",
    camara: "Triple, 48MP + 48MP + 12MP", camaraFrontal: "12MP", almacenamiento: "256GB",
    ram: "8GB RAM", procesador: "Apple A18 Pro", pantalla: "6.9\" OLED, 120Hz ProMotion", bateria: "4685 mAh", precio: "$3.480.000 COP" },
  { categoria: "celulares", marca: "iPhone", modelo: "iPhone 17", imagen: "imagenes/iphone-17.jpg",
    camara: "Doble, 48MP + 48MP", camaraFrontal: "18MP", almacenamiento: "256GB",
    ram: "8GB RAM", procesador: "Apple A19", pantalla: "6.3\" OLED, 120Hz ProMotion", bateria: "3692 mAh", precio: "$3.100.000 COP" },
  { categoria: "celulares", marca: "iPhone", modelo: "iPhone Air", imagen: "imagenes/iphone-air.jpg",
    camara: "Única, 48MP", camaraFrontal: "18MP", almacenamiento: "256GB",
    ram: "12GB RAM", procesador: "Apple A19 Pro", pantalla: "6.5\" OLED, 120Hz ProMotion", bateria: "3149 mAh", precio: "$3.240.000 COP" },

  // ---------- Xiaomi ----------
  { categoria: "celulares", marca: "Xiaomi", modelo: "Redmi A7", imagen: "imagenes/xiaomi-redmi-a7.jpg",
    camara: "Única, 13MP", camaraFrontal: "8MP", almacenamiento: "64GB",
    ram: "6GB RAM", procesador: "Unisoc T7250", pantalla: "6.88\", 120Hz", bateria: "5200 mAh", precio: "$335.000 COP" },
  { categoria: "celulares", marca: "Xiaomi", modelo: "Redmi A7 Pro", imagen: "imagenes/xiaomi-redmi-a7-pro.jpg",
    camara: "Única, 13MP", camaraFrontal: "8MP", almacenamiento: "64GB",
    ram: "8GB RAM", procesador: "Unisoc T7250", pantalla: "6.9\", 120Hz", bateria: "6000 mAh", precio: "$385.000 COP" },
  { categoria: "celulares", marca: "Xiaomi", modelo: "Redmi 15C", imagen: "imagenes/xiaomi-redmi-15c.jpg",
    camara: "Dual, 50MP + Lente auxiliar", camaraFrontal: "8MP", almacenamiento: "128GB",
    ram: "8GB RAM", procesador: "MediaTek Helio G81-Ultra", pantalla: "6.9\", 120Hz", bateria: "6000 mAh, 33W", precio: "$485.000 COP" },
  { categoria: "celulares", marca: "Xiaomi", modelo: "Redmi 15C", imagen: "imagenes/xiaomi-redmi-15c.jpg",
    camara: "Dual, 50MP + Lente auxiliar", camaraFrontal: "8MP", almacenamiento: "256GB",
    ram: "8GB RAM", procesador: "MediaTek Helio G81-Ultra", pantalla: "6.9\", 120Hz", bateria: "6000 mAh, 33W", precio: "$565.000 COP" },
  { categoria: "celulares", marca: "Xiaomi", modelo: "Redmi 17", imagen: "imagenes/xiaomi-redmi-17.jpg",
    camara: "Dual, 50MP + Lente auxiliar", camaraFrontal: "8MP", almacenamiento: "128GB",
    ram: "8GB RAM", procesador: "MediaTek Helio G91-Ultra", pantalla: "6.9\", 120Hz", bateria: "7500 mAh, 45W", precio: "$612.000 COP" },
  { categoria: "celulares", marca: "Xiaomi", modelo: "Redmi 17", imagen: "imagenes/xiaomi-redmi-17.jpg",
    camara: "Dual, 50MP + Lente auxiliar", camaraFrontal: "8MP", almacenamiento: "256GB",
    ram: "8GB RAM", procesador: "MediaTek Helio G91-Ultra", pantalla: "6.9\", 120Hz", bateria: "7500 mAh, 45W", precio: "$665.000 COP" },

  // ---------- Motorola ----------
  { categoria: "celulares", marca: "Motorola", modelo: "Moto G35 5G", imagen: "imagenes/motorola-moto-g35-5g.jpg",
    camara: "Dual, 50MP + 8MP", camaraFrontal: "16MP", almacenamiento: "256GB",
    ram: "4GB RAM", procesador: "Unisoc T760", pantalla: "6.72\", 120Hz", bateria: "5000 mAh, 18W", precio: "$655.000 COP" },

  // ---------- Honor ----------
  { categoria: "celulares", marca: "Honor", modelo: "Play 10", imagen: "imagenes/honor-play-10.jpg",
    camara: "Única, 13MP", camaraFrontal: "5MP", almacenamiento: "64GB",
    ram: "3GB RAM", procesador: "MediaTek Helio G81", pantalla: "6.74\", 90Hz", bateria: "5000 mAh", precio: "$355.000 COP" },
  { categoria: "celulares", marca: "Honor", modelo: "Magic8 Lite", imagen: "imagenes/honor-magic8-lite.jpg",
    camara: "Dual, 108MP + 5MP", camaraFrontal: "16MP", almacenamiento: "512GB",
    ram: "8GB RAM", procesador: "Snapdragon 6 Gen 4", pantalla: "6.79\" AMOLED, 120Hz", bateria: "7500 mAh, 66W", precio: "$1.155.000 COP" },

  // ---------- Infinix ----------
  { categoria: "celulares", marca: "Infinix", modelo: "Smart 20", imagen: "imagenes/infinix-smart-20.jpg",
    camara: "Única, 8MP", camaraFrontal: "8MP", almacenamiento: "128GB",
    ram: "8GB RAM", procesador: "MediaTek Helio G81 Ultimate", pantalla: "6.78\", 120Hz", bateria: "5200 mAh, 15W", precio: "$570.000 COP" },
  { categoria: "celulares", marca: "Infinix", modelo: "Note 60 Pro 5G", imagen: "imagenes/infinix-note-60-pro-5g.jpg",
    camara: "Dual, 50MP + 8MP, OIS", camaraFrontal: "13MP", almacenamiento: "256GB",
    ram: "8GB RAM", procesador: "Snapdragon 7s Gen 4", pantalla: "6.78\" AMOLED, 144Hz", bateria: "6500 mAh, 90W", precio: "$1.687.000 COP" },

  // ---------- Oppo ----------
  { categoria: "celulares", marca: "Oppo", modelo: "A5x", imagen: "imagenes/oppo-a5x.jpg",
    camara: "Única, 32MP", camaraFrontal: "5MP", almacenamiento: "128GB",
    ram: "4GB RAM", procesador: "Snapdragon 6s 4G Gen 1", pantalla: "6.67\", 90Hz", bateria: "6000 mAh, 45W", precio: "$495.000 COP" },

  // ---------- ZTE ----------
  { categoria: "celulares", marca: "ZTE", modelo: "Blade A35e", imagen: "imagenes/zte-blade-a35e.jpg",
    camara: "Única, 8MP", camaraFrontal: "5MP", almacenamiento: "64GB",
    ram: "2GB RAM", procesador: "Unisoc SC9863A", pantalla: "6.52\", 90Hz", bateria: "5000 mAh", precio: "$290.000 COP" },

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

/* Estado actual de la vista */
let categoriaActiva = "celulares";
let marcaActiva = "todas";
let ordenActual = "relevancia";
let textoBusquedaActual = "";

/* Convierte "$1.899.000 COP" en 1899000 para poder ordenar por precio */
function precioNumero(precioTexto) {
  return parseInt(String(precioTexto).replace(/[^\d]/g, ""), 10) || 0;
}

/* =========================================================
   3. ICONOS (SVG en línea — no dependen de archivos icons/*.png)
   ========================================================= */
const ICONOS_SVG = {
  camara: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8h2.5l1.5-2h8l1.5 2H20a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z"/><circle cx="12" cy="13" r="3.3"/></svg>`,
  video: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="13" height="12" rx="2"/><path d="M16 10.5 21 7v10l-5-3.5"/></svg>`,
  almacenamiento: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="7" rx="1.5"/><rect x="3" y="13" width="18" height="7" rx="1.5"/><line x1="7" y1="7.5" x2="7.01" y2="7.5"/><line x1="7" y1="16.5" x2="7.01" y2="16.5"/></svg>`,
  ram: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="7" width="16" height="10" rx="1.5"/><line x1="8" y1="7" x2="8" y2="4"/><line x1="12" y1="7" x2="12" y2="4"/><line x1="16" y1="7" x2="16" y2="4"/><line x1="8" y1="20" x2="8" y2="17"/><line x1="16" y1="20" x2="16" y2="17"/></svg>`,
  procesador: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="7" y="7" width="10" height="10" rx="1.5"/><rect x="10" y="10" width="4" height="4"/><line x1="9" y1="2" x2="9" y2="5"/><line x1="15" y1="2" x2="15" y2="5"/><line x1="9" y1="19" x2="9" y2="22"/><line x1="15" y1="19" x2="15" y2="22"/><line x1="2" y1="9" x2="5" y2="9"/><line x1="2" y1="15" x2="5" y2="15"/><line x1="19" y1="9" x2="22" y2="9"/><line x1="19" y1="15" x2="22" y2="15"/></svg>`,
  pantalla: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="7" y="2.5" width="10" height="19" rx="2.2"/><line x1="11" y1="18.3" x2="13" y2="18.3"/></svg>`,
  bateria: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="7" width="16" height="10" rx="1.8"/><line x1="21.5" y1="10.5" x2="21.5" y2="13.5"/><line x1="6" y1="11" x2="6" y2="13"/><line x1="9" y1="11" x2="9" y2="13"/></svg>`
};

/* =========================================================
   4. RENDERIZADO
   ========================================================= */
const contenedorGrid = document.getElementById("grid-productos");
const plantillaProducto = document.getElementById("plantilla-producto");
const tituloSeccionEl = document.getElementById("titulo-seccion");
const subtituloEl = document.getElementById("subtitulo-seccion");
const contadorEl = document.getElementById("contador-productos");
const estadoVacioEl = document.getElementById("estado-vacio");
const mensajeVacioEl = document.getElementById("mensaje-vacio");
const menuMarcasEl = document.getElementById("menu-marcas");
const filaResultadosEl = document.querySelector(".fila-resultados");
const ordenSelect = document.getElementById("orden-select");

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

  nodo.querySelector(".badge-marca").textContent = producto.marca;

  const img = nodo.querySelector(".imagen-producto img");
  img.src = producto.imagen;
  img.alt = `${producto.marca} ${producto.modelo}`;
  img.loading = "lazy";
  img.decoding = "async";

  nodo.querySelector(".marca").textContent = producto.marca;
  nodo.querySelector(".modelo").textContent = producto.modelo;
  nodo.querySelector(".precio").textContent = producto.precio;

  const filas = [
    ["camara", producto.camara],
    ["video", producto.camaraFrontal],
    ["almacenamiento", producto.almacenamiento],
    ["ram", producto.ram],
    ["procesador", producto.procesador],
    ["pantalla", producto.pantalla],
    ["bateria", producto.bateria]
  ];

  const lista = nodo.querySelector(".caracteristicas");
  filas.forEach(([tipo, texto]) => {
    if (!texto) return; // permite dejar campos vacíos sin romper el diseño
    const li = document.createElement("li");
    li.innerHTML = ICONOS_SVG[tipo];
    li.append(" " + texto);
    lista.appendChild(li);
  });

  return nodo;
}

/* Genera las píldoras de marca según los productos de la categoría activa.
   Si la categoría no tiene productos todavía, se oculta esta fila completa. */
function renderizarMarcas() {
  const productosCategoria = PRODUCTOS.filter(p => p.categoria === categoriaActiva);
  const marcas = [...new Set(productosCategoria.map(p => p.marca))];

  if (marcas.length === 0) {
    menuMarcasEl.hidden = true;
    menuMarcasEl.innerHTML = "";
    if (filaResultadosEl) filaResultadosEl.hidden = true;
    return;
  }

  menuMarcasEl.hidden = false;
  if (filaResultadosEl) filaResultadosEl.hidden = false;
  menuMarcasEl.innerHTML = "";

  const botonTodos = document.createElement("button");
  botonTodos.type = "button";
  botonTodos.textContent = "Todos";
  botonTodos.dataset.marca = "todas";
  botonTodos.className = marcaActiva === "todas" ? "activo" : "";
  menuMarcasEl.appendChild(botonTodos);

  marcas.forEach(marca => {
    const boton = document.createElement("button");
    boton.type = "button";
    boton.textContent = marca;
    boton.dataset.marca = marca;
    boton.className = marcaActiva === marca ? "activo" : "";
    menuMarcasEl.appendChild(boton);
  });
}

menuMarcasEl?.addEventListener("click", (e) => {
  const boton = e.target.closest("button[data-marca]");
  if (!boton) return;
  marcaActiva = boton.dataset.marca;
  menuMarcasEl.querySelectorAll("button").forEach(b => {
    b.classList.toggle("activo", b.dataset.marca === marcaActiva);
  });
  renderizar();
});

ordenSelect?.addEventListener("change", () => {
  ordenActual = ordenSelect.value;
  renderizar();
});

function renderizar() {
  const config = CATEGORIAS[categoriaActiva];
  tituloSeccionEl.textContent = config.tituloSeccion;
  subtituloEl.textContent = config.subtitulo;

  const texto = textoBusquedaActual.toLowerCase().trim();
  let productosFiltrados = PRODUCTOS.filter(p => p.categoria === categoriaActiva);

  if (marcaActiva !== "todas") {
    productosFiltrados = productosFiltrados.filter(p => p.marca === marcaActiva);
  }

  if (texto) {
    productosFiltrados = productosFiltrados.filter(p => `${p.marca} ${p.modelo}`.toLowerCase().includes(texto));
  }

  if (ordenActual === "precio-asc") {
    productosFiltrados = [...productosFiltrados].sort((a, b) => precioNumero(a.precio) - precioNumero(b.precio));
  } else if (ordenActual === "precio-desc") {
    productosFiltrados = [...productosFiltrados].sort((a, b) => precioNumero(b.precio) - precioNumero(a.precio));
  }

  contadorEl.textContent = productosFiltrados.length > 0
    ? `${productosFiltrados.length} producto${productosFiltrados.length === 1 ? "" : "s"}`
    : "";

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
    fragmento.appendChild(crearTarjeta(producto));
  });
  contenedorGrid.appendChild(fragmento);

  // Vuelve a observar las tarjetas recién insertadas para la animación de aparición
  contenedorGrid.querySelectorAll(".producto").forEach(tarjeta => {
    observerAparicion.observe(tarjeta);
  });
}

/* =========================================================
   5. MENÚ DE CATEGORÍAS + MENÚ MÓVIL
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

  // Al cambiar de categoría, se limpian filtros y búsqueda para partir de cero
  if (inputBuscador) inputBuscador.value = "";
  textoBusquedaActual = "";
  marcaActiva = "todas";
  ordenActual = "relevancia";
  if (ordenSelect) ordenSelect.value = "relevancia";

  renderizarMarcas();
  renderizar();
  cerrarMenuMovil();
}

botonesMenu.forEach(boton => {
  boton.addEventListener("click", () => {
    activarCategoria(boton.dataset.categoria);
    menuCategorias.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

function cerrarMenuMovil() {
  menuCategorias.classList.remove("abierto");
  botonHamburguesa?.setAttribute("aria-expanded", "false");
}

botonHamburguesa?.addEventListener("click", () => {
  const abierto = menuCategorias.classList.toggle("abierto");
  botonHamburguesa.setAttribute("aria-expanded", String(abierto));
  if (abierto) menuCategorias.scrollIntoView({ behavior: "smooth", block: "center" });
});

/* =========================================================
   6. BUSCADOR (con debounce para no filtrar en cada tecla)
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
   7. DESPLAZAMIENTO SUAVE PARA ENLACES INTERNOS (ej. "Ver catálogo")
   ========================================================= */
document.querySelectorAll('a[href^="#"]').forEach(ancla => {
  ancla.addEventListener('click', e => {
    e.preventDefault();
    const destino = document.querySelector(ancla.getAttribute('href'));
    if (destino) destino.scrollIntoView({ behavior: 'smooth' });
  });
});

/* =========================================================
   8. ESTADÍSTICAS DEL HERO (se calculan solas: nunca quedan
      desactualizadas aunque agregues o quites productos)
   ========================================================= */
function actualizarEstadisticasHero() {
  const marcasUnicas = new Set(PRODUCTOS.map(p => p.marca));
  const statMarcas = document.getElementById("stat-marcas");
  const statModelos = document.getElementById("stat-modelos");
  if (statMarcas) statMarcas.textContent = marcasUnicas.size;
  if (statModelos) statModelos.textContent = PRODUCTOS.length;
}

/* =========================================================
   INICIO
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  actualizarEstadisticasHero();
  activarCategoria("celulares");
});
