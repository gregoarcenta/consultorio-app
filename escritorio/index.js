const { app, BrowserWindow, ipcMain } = require("electron");
const { createMenu } = require("./src/helpers/menu");

//require("./database");

let mainWindow;
let addCitaWindow;

/**Ventana principal */
function createMainWindow() {
   mainWindow = new BrowserWindow({
      width: 1024,
      height: 720,
      webPreferences: {
         nodeIntegration: true,
      },
   });

   mainWindow.loadFile("./src/views/index.html");

   //createMenu(createAddCitaWindow);

   mainWindow.on("closed", () => {
      app.quit();
   });
}
/**Ventana de agregar */
function createAddCitaWindow() {
   addCitaWindow = new BrowserWindow({
      parent: mainWindow,
      modal: true,
      width: 800,
      height: 615,
      webPreferences: {
         nodeIntegration: true,
      },
   });
   addCitaWindow.setMenu(null);

   addCitaWindow.loadFile("./src/views/add-cita.html");

   addCitaWindow.on("closed", () => {
      addCitaWindow = null;
   });
}

ipcMain.on("form:cita", () => {
   addCitaWindow = new BrowserWindow({
      parent: mainWindow,
      modal: true,
      width: 800,
      height: 615,
      webPreferences: {
         nodeIntegration: true,
      },
   });
   //addCitaWindow.setMenu(null);

   addCitaWindow.loadFile("./src/views/add-cita.html");

   addCitaWindow.on("closed", () => {
      addCitaWindow = null;
   });
});

/**Se activa cuando se lanza por primera vez la aplicacion */
app.whenReady().then(createMainWindow);

/** Evento que se activa cuando se cierran todas las ventanas */
app.on("window-all-closed", () => {
   app.quit();
});

/** Evento que se activa cuando inicia la aplicacion */
app.on("activate", () => {
   if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
   }
});
