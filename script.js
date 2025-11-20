/* =========================================================
   ELECTROMEGA - Interacciones y Animaciones
   ========================================================= */

/* === 1. Animación de aparición de productos ===
   Los productos se mostrarán con un efecto suave al entrar
   en la zona visible del usuario (scroll reveal)
*/
const productos = document.querySelectorAll('.producto');

function mostrarProductos() {
  const alturaVentana = window.innerHeight * 0.9; // 90% de la ventana visible
  productos.forEach(producto => {
    const distanciaTop = producto.getBoundingClientRect().top;
    if (distanciaTop < alturaVentana) {
      producto.classList.add('visible');
    }
  });
}

// Ejecuta cuando se hace scroll y al cargar la página
window.addEventListener('scroll', mostrarProductos);
window.addEventListener('load', mostrarProductos);


/* === 2. Efecto de desplazamiento suave ===
   Si más adelante agregas enlaces internos (#contacto, #nosotros),
   esto hará que el desplazamiento sea fluido.
*/
document.querySelectorAll('a[href^="#"]').forEach(ancla => {
  ancla.addEventListener('click', e => {
    e.preventDefault();
    const destino = document.querySelector(ancla.getAttribute('href'));
    if (destino) {
      destino.scrollIntoView({ behavior: 'smooth' });
    }
  });
});


/* === 3. Efecto visual al pasar el mouse sobre productos ===
   Añade un brillo verde sutil (más elegante que un simple hover CSS)
*/
productos.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.boxShadow = '0 8px 20px rgba(0, 255, 102, 0.25)';
  });

  card.addEventListener('mouseleave', () => {
    card.style.boxShadow = '';
  });
});


/* === 4. (Opcional) Mensaje de bienvenida con retardo elegante ===
   Esto se puede comentar o quitar si prefieres sin alertas.
*/
window.addEventListener('load', () => {
  setTimeout(() => {
    console.log("✨ Bienvenido a ElectroMega - La casa de los Electrodomésticos ✨");
  }, 500);
});


/* =========================================================
   BUSCADOR DE PRODUCTOS
   ========================================================= */

const inputBuscador = document.getElementById("buscador");
const btnBuscar = document.getElementById("btnBuscar");
const tarjetas = document.querySelectorAll(".producto");

function filtrarProductos() {
  const texto = inputBuscador.value.toLowerCase().trim();

  tarjetas.forEach(card => {
    const contenido = card.innerText.toLowerCase();

    if (contenido.includes(texto)) {
      card.style.display = "flex";
    } else {
      card.style.display = "none";
    }
  });
}

// Buscar al escribir
inputBuscador.addEventListener("input", filtrarProductos);

// Buscar al dar clic al botón
btnBuscar.addEventListener("click", filtrarProductos);

// Buscar al presionar Enter
inputBuscador.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    filtrarProductos();
  }
});
