const { Menu } = require("electron");

module.exports.createMenu = function (addCita) {
   const templateMenu = [
      {
         label: "File",
         submenu: [
            {
               label: "Nueva cita",
               click() {
                  addCita();
               },
            },
         ],
      },
   ];
   const mainMenu = Menu.buildFromTemplate(templateMenu);
   Menu.setApplicationMenu(mainMenu);
};
