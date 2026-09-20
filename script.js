// ===== SCROLL REVEAL =====
function revelarProductos() {
  const productos = document.querySelectorAll('.producto');
  const umbral = window.innerHeight * 0.9;
  productos.forEach(p => {
    if (p.getBoundingClientRect().top < umbral) {
      p.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', revelarProductos);
window.addEventListener('load', revelarProductos);

// ===== SMOOTH SCROLL PARA ANCLAS =====
document.querySelectorAll('a[href^="#"]').forEach(enlace => {
  enlace.addEventListener('click', e => {
    e.preventDefault();
    const destino = document.querySelector(enlace.getAttribute('href'));
    if (destino) destino.scrollIntoView({ behavior: 'smooth' });
  });
});

// ===== HOVER GLOW EN TARJETAS =====
document.querySelectorAll('.producto').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.boxShadow = '0 8px 32px rgba(0, 179, 90, 0.22), 0 2px 8px rgba(0,0,0,0.06)';
  });
  card.addEventListener('mouseleave', () => {
    card.style.boxShadow = '';
  });
});

// ===== BÚSQUEDA =====
function filtrarPorTexto(termino) {
  const texto = termino.toLowerCase().trim();
  let hayResultados = false;

  document.querySelectorAll('.producto').forEach(card => {
    const contenido = card.innerText.toLowerCase();
    const coincide = contenido.includes(texto);
    card.style.display = coincide ? '' : 'none';
    if (coincide) hayResultados = true;
  });

  // Mensaje sin resultados
  const grid = document.querySelector('.grid-productos');
  const existente = grid.querySelector('.sin-resultados');
  if (existente) existente.remove();

  if (!hayResultados) {
    const msg = document.createElement('div');
    msg.className = 'sin-resultados';
    msg.innerHTML = '<strong>Sin resultados</strong>Prueba con otro término de búsqueda.';
    grid.appendChild(msg);
  }

  // Reset filtros de marca al buscar
  document.querySelectorAll('.filtro-btn').forEach(b => b.classList.remove('activo'));
  const btnTodos = document.querySelector('.filtro-btn[data-marca="todos"]');
  if (btnTodos) btnTodos.classList.add('activo');
}

const buscador = document.getElementById('buscador');
const btnBuscar = document.getElementById('btnBuscar');

if (buscador) {
  buscador.addEventListener('input', () => filtrarPorTexto(buscador.value));
  buscador.addEventListener('keydown', e => {
    if (e.key === 'Enter') filtrarPorTexto(buscador.value);
  });
}
if (btnBuscar) {
  btnBuscar.addEventListener('click', () => filtrarPorTexto(buscador?.value ?? ''));
}

// ===== FILTROS POR MARCA =====
const filtrosMarca = document.getElementById('filtrosMarca');
if (filtrosMarca) {
  filtrosMarca.addEventListener('click', e => {
    const btn = e.target.closest('.filtro-btn');
    if (!btn) return;

    filtrosMarca.querySelectorAll('.filtro-btn').forEach(b => b.classList.remove('activo'));
    btn.classList.add('activo');

    // Limpiar buscador al filtrar por marca
    if (buscador) buscador.value = '';

    const marca = btn.dataset.marca;
    let hayResultados = false;

    document.querySelectorAll('.producto').forEach(card => {
      const marcaCard = card.querySelector('.marca')?.textContent.toLowerCase().trim() ?? '';
      const mostrar = marca === 'todos' || marcaCard.includes(marca);
      card.style.display = mostrar ? '' : 'none';
      if (mostrar) hayResultados = true;
    });

    // Mensaje sin resultados
    const grid = document.querySelector('.grid-productos');
    const existente = grid.querySelector('.sin-resultados');
    if (existente) existente.remove();

    if (!hayResultados) {
      const msg = document.createElement('div');
      msg.className = 'sin-resultados';
      msg.innerHTML = '<strong>Sin resultados</strong>No hay productos para esta marca.';
      grid.appendChild(msg);
    }

    // Re-revelar tarjetas visibles
    revelarProductos();
  });
}

// ===== BIENVENIDA =====
setTimeout(() => console.log('✨ Bienvenido a ElectroMega'), 500);