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
