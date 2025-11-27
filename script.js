const API = "http://localhost:3000";

// ------------------ FUNCIONES DE LIMPIEZA ------------------

function limpiarTerrestre() {
  document.querySelectorAll("#t_tipo, #t_cantidad, #t_fecha_registro, #t_fecha_entrega, #t_bodega, #t_precio, #t_placa, #t_guia")
    .forEach(i => i.value = "");
}

function limpiarMaritima() {
  document.querySelectorAll("#m_tipo, #m_cantidad, #m_fecha_registro, #m_fecha_entrega, #m_puerto, #m_precio, #m_flota, #m_guia")
    .forEach(i => i.value = "");
}

// ------------------ CRUD TERRESTRE ------------------

async function crearTerrestre() {
  const data = {
    tipo_producto: document.getElementById("t_tipo").value,
    cantidad: document.getElementById("t_cantidad").value,
    fecha_registro: document.getElementById("t_fecha_registro").value,
    fecha_entrega: document.getElementById("t_fecha_entrega").value,
    bodega_entrega: document.getElementById("t_bodega").value,
    precio_envio: document.getElementById("t_precio").value,
    placa_vehiculo: document.getElementById("t_placa").value,
    numero_guia: document.getElementById("t_guia").value
  };

  await fetch(`${API}/terrestre`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  limpiarTerrestre(); // 👈 LIMPIA EL FORMULARIO
  cargarTerrestre();
}

// ------------------ CRUD MARÍTIMA ------------------

async function crearMaritima() {
  const data = {
    tipo_producto: document.getElementById("m_tipo").value,
    cantidad: document.getElementById("m_cantidad").value,
    fecha_registro: document.getElementById("m_fecha_registro").value,
    fecha_entrega: document.getElementById("m_fecha_entrega").value,
    puerto_entrega: document.getElementById("m_puerto").value,
    precio_envio: document.getElementById("m_precio").value,
    numero_flota: document.getElementById("m_flota").value,
    numero_guia: document.getElementById("m_guia").value
  };

  await fetch(`${API}/maritima`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  limpiarMaritima(); // 👈 LIMPIA EL FORMULARIO
  cargarMaritima();
}

// ------------------ CARGAR TABLAS ------------------

async function cargarTerrestre() {
  const res = await fetch(`${API}/terrestre`);
  const data = await res.json();

  const tbody = document.querySelector("#tablaTerrestre tbody");
  tbody.innerHTML = "";

  data.forEach(item => {
    tbody.innerHTML += `
      <tr>
        <td>${item.id}</td>
        <td>${item.tipo_producto}</td>
        <td>${item.cantidad}</td>
        <td>${item.fecha_registro}</td>
        <td>${item.fecha_entrega}</td>
        <td>${item.bodega_entrega}</td>
        <td>${item.precio_envio}</td>
        <td>${item.placa_vehiculo}</td>
        <td>${item.numero_guia}</td>
        <td><button>Eliminar</button></td>
      </tr>`;
  });
}

async function cargarMaritima() {
  const res = await fetch(`${API}/maritima`);
  const data = await res.json();

  const tbody = document.querySelector("#tablaMaritima tbody");
  tbody.innerHTML = "";

  data.forEach(item => {
    tbody.innerHTML += `
      <tr>
        <td>${item.id}</td>
        <td>${item.tipo_producto}</td>
        <td>${item.cantidad}</td>
        <td>${item.fecha_registro}</td>
        <td>${item.fecha_entrega}</td>
        <td>${item.puerto_entrega}</td>
        <td>${item.precio_envio}</td>
        <td>${item.numero_flota}</td>
        <td>${item.numero_guia}</td>
        <td><button>Eliminar</button></td>
      </tr>`;
  });
}

// Cargar inicial
cargarTerrestre();
cargarMaritima();
