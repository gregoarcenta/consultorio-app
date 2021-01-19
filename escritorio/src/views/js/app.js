const { ipcRenderer } = require("electron");

let cedRepresentante = document.getElementById("ced_representante"),
   telfRepresentante = document.getElementById("telf_representante"),
   nomRepresentante = document.getElementById("nom_representante"),
   apeRepresentante = document.getElementById("ape_representante"),
   cedNinio = document.getElementById("ced_ninio"),
   nomNinio = document.getElementById("nom_ninio"),
   apeNinio = document.getElementById("ape_ninio"),
   edadNinio = document.getElementById("edad_ninio"),
   desNinio = document.getElementById("des_ninio"),
   id = document.getElementById("id");

const btnFormAddCita = document.getElementById("btn_form_add_cita");
if (btnFormAddCita) {
   btnFormAddCita.addEventListener("click", (e) => {
      ipcRenderer.send("form:cita", "");
   });
}

const formAddCita = document.getElementById("form_add_cita");
const btnAddCita = document.getElementById("btn_add_cita");
if (formAddCita) {
   formAddCita.addEventListener("submit", (e) => {
      e.preventDefault();
      btnAddCita.setAttribute("disabled", "disabled");

      const newCita = {
         ced_representante: parseInt(cedRepresentante.value),
         tel_representante: parseInt(telfRepresentante.value),
         nom_representante: nomRepresentante.value,
         ape_representante: apeRepresentante.value,
         ced_paciente: parseInt(cedNinio.value),
         nom_paciente: nomNinio.value,
         ape_paciente: apeNinio.value,
         edad_paciente: parseInt(edadNinio.value),
         des_paciente: desNinio.value,
      };
      if (id.value !== "") {
         updateCita(parseInt(id.value), newCita);
      } else {
         createCitaFetch(newCita);
      }
   });
}

async function indexCitaFetch() {
   const data = await fetch(`http://localhost:5500/citas`);
   const result = await data.json();
   dataRender(result);
}

async function showCitaCedula(cedula) {
   const data = await fetch(`http://localhost:5500/cita?cedula=${cedula}`);
   const result = await data.json();
   dataRender(result);
}

async function createCitaFetch(cita) {
   const result = await fetch(`http://localhost:5500/citas`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(cita),
   });
   const data = await result.json();
   ipcRenderer.send("create:cita", "");
}

async function showCita(id) {
   const data = await fetch(`http://localhost:5500/cita/${id}`);
   const result = await data.json();
   ipcRenderer.send("show:cita", result);
}

async function updateCita(id, cita) {
   const result = await fetch(`http://localhost:5500/cita/${id}`, {
      method: "PUT",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(cita),
   });
   const data = await result.json();
   ipcRenderer.send("update:cita", "");
}

async function destroyCita(id) {
   const data = await fetch(`http://localhost:5500/cita/${id}`, {
      method: "DELETE",
   });
   const result = await data.json();
   ipcRenderer.send("destroy:cita", "");
}

function dataRender(data) {
   const tbody = document.getElementById("data");
   if (tbody) {
      let templateHtmlTable = "";
      data.forEach((cita) => {
         templateHtmlTable += ` 
      <tr>
         <th scope="row" class="py-3">${cita.id_cita}</th>
         <td class="py-3">${cita.nom_paciente}</td>
         <td class="py-3">${cita.ape_paciente}</td>
         <td class="py-3">${cita.edad_paciente}</td>
         <th scope="col" class="py-2">
            <button class="btn btn-sm btn-info" onclick="showCita(${cita.id_cita})">Ver descripcion</button>
         </th>
      </tr>
      `;
      });
      tbody.innerHTML = templateHtmlTable;
   }
}

const search = document.getElementById("search_cita"),
   buttonSearch = document.getElementById("search-addon");
if (buttonSearch) {
   buttonSearch.addEventListener("click", () => {
      const value = search.value;
      showCitaCedula(value);
   });
}

ipcRenderer.on("show:cita:data", (e, data) => {
   const containerButtons = document.querySelector(".con-buttons-actions");
   const nikPacinete = document.getElementById("nik_paciente");
   const nombrePacinete = document.getElementById("nom_paciente");
   const apellidoPacinete = document.getElementById("ape_paciente");
   const edadPacinete = document.getElementById("edad_paciente");
   const cedulaPacinete = document.getElementById("ced_paciente");
   const descripcionPacinete = document.getElementById("des_paciente");
   const nombreRepresentante = document.getElementById("nom_representante");
   const apellidoRepresentante = document.getElementById("ape_representante");
   const telefonoRepresentante = document.getElementById("tel_representante");
   const cedulaRepresentante = document.getElementById("ced_representante");
   nikPacinete.textContent = `${data.nom_paciente} ${data.ape_paciente}`;
   nombrePacinete.textContent = `${data.nom_paciente}`;
   apellidoPacinete.textContent = `${data.ape_paciente}`;
   edadPacinete.textContent = `${data.edad_paciente}`;
   cedulaPacinete.textContent = `${data.ced_paciente}`;
   descripcionPacinete.textContent = `${data.des_paciente}`;
   nombreRepresentante.textContent = `${data.nom_representante}`;
   apellidoRepresentante.textContent = `${data.ape_representante}`;
   telefonoRepresentante.textContent = `${data.tel_representante}`;
   cedulaRepresentante.textContent = `${data.ced_representante}`;
   containerButtons.setAttribute("data-id", `${data.id_cita}`);
});

ipcRenderer.on("edit:cita:data", (e, data) => {
   id.value = data.id_cita;
   cedRepresentante.value = data.ced_representante;
   telfRepresentante.value = data.tel_representante;
   nomRepresentante.value = data.nom_representante;
   apeRepresentante.value = data.ape_representante;
   cedNinio.value = data.ced_paciente;
   nomNinio.value = data.nom_paciente;
   apeNinio.value = data.ape_paciente;
   edadNinio.value = data.edad_paciente;
   desNinio.value = data.des_paciente;
});

const btnDestroyCita = document.querySelector(".btn-destroy");
if (btnDestroyCita) {
   btnDestroyCita.addEventListener("click", (e) => {
      const parent = btnDestroyCita.parentElement;
      const id = parent.dataset.id;
      const response = confirm("¿Estas seguro de eliminar esta cita?");
      if (response) {
         destroyCita(id);
      }
   });
}

const btnEditCita = document.querySelector(".btn-edit");
if (btnEditCita) {
   btnEditCita.addEventListener("click", async (e) => {
      const parent = btnDestroyCita.parentElement;
      const id = parent.dataset.id;
      const data = await fetch(`http://localhost:5500/cita/${id}`);
      const cita = await data.json();
      ipcRenderer.send("form:cita:edit", cita);
   });
}

indexCitaFetch();
