const express = require("express");
const { getConnection } = require("./database");

const app = express();
const port = 3000;

require("./database");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**Retorna todas las citas */
app.get("/citas", async (req, res) => {
   try {
      const conn = await getConnection();
      const result = await conn.query("SELECT * FROM citas");
      console.log(result);
      res.json(result);
   } catch (error) {
      console.log(error);
   }
});

/**Agrega una nueva cita*/
app.post("/citas", async (req, res) => {
   try {
      const conn = await getConnection();
      const result = await conn.query("INSERT INTO citas SET ?", req.body);
      console.log(result);
      res.json(result);
   } catch (error) {
      console.log(error);
   }
});

/** Acualiza una cita */
app.post("/citas", (req, res) => {});

/**Elimina una cita */
app.delete("/citas", (req, res) => {});

app.listen(port, () => console.log(`Example app listening on port port!`));
