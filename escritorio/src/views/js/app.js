const { ipcRenderer } = require("electron");

const btnFormAddCita = document.getElementById("btn_form_add_cita");
if (btnFormAddCita) {
   btnFormAddCita.addEventListener("click", (e) => {
      ipcRenderer.send("form:cita", "");
   });
}

const formAddCita = document.getElementById("form_add_cita");
if (formAddCita) {
   formAddCita.addEventListener("submit", (e) => {
      e.preventDefault();
      const cedRepresentante = document.getElementById("ced_representante"),
         telfRepresentante = document.getElementById("telf_representante"),
         nomRepresentante = document.getElementById("nom_representante"),
         apeRepresentante = document.getElementById("ape_representante"),
         cedNinio = document.getElementById("ced_ninio"),
         nomNinio = document.getElementById("nom_ninio"),
         apeNinio = document.getElementById("ape_ninio"),
         edadNinio = document.getElementById("edad_ninio"),
         desNinio = document.getElementById("des_ninio");

      const newCita = {
         ced_representante: cedRepresentante.value,
         tel_representante: telfRepresentante.value,
         nom_representante: nomRepresentante.value,
         ape_representante: apeRepresentante.value,
         ced_paciente: cedNinio.value,
         nom_paciente: nomNinio.value,
         ape_paciente: apeNinio.value,
         edad_paciente: edadNinio.value,
         des_paciente: desNinio.value,
      };
   });
}

/* let temaplateHtmlTable = ` 
<tr>
   <th scope="row" class="py-3">1</th>
   <td class="py-3">Mark</td>
   <td class="py-3">Otto</td>
   <td class="py-3">@mdo</td>
   <th scope="col" class="py-2">
      <button class="btn btn-sm btn-info">Ver descripcion</button>
   </th>
</tr>
`; */
