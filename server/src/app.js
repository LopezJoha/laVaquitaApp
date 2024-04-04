import express from "express";
import router from "./routes/index.js";
import groupRoutes from "./routes/index.js";

const app = express();

const port = 3001;

app.use(express.json());
app.use(groupRoutes);

app.listen(port, () => {
  console.log(`El puerto está escuchando por el puerto ${port}`);
});
