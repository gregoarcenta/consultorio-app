const { app, BrowserWindow, ipcMain } = require("electron");
const { createMenu } = require("./src/helpers/menu");

//require("./database");

let mainWindow;
let addCitaWindow;
let citaWindow;

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
   ipcMain.on("cita:agg", () => {
      mainWindow.reload();
      addCitaWindow.close();
   });
   ipcMain.on("destroy:cita", () => {
      mainWindow.reload();
      citaWindow.close();
   });

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
   //addCitaWindow.setMenu(null);
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

/**Ventana que muestra una cita */
ipcMain.on("show:cita", (e, data) => {
   citaWindow = new BrowserWindow({
      parent: mainWindow,
      modal: true,
      width: 800,
      height: 600,
      webPreferences: {
         nodeIntegration: true,
      },
   });
   //addCitaWindow.setMenu(null);
   citaWindow.loadFile("./src/views/cita.html");
   citaWindow.on("closed", () => {
      citaWindow = null;
   });
   citaWindow.webContents.on("did-finish-load", () => {
      citaWindow.webContents.send("show:cita:data", data[0]);
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
