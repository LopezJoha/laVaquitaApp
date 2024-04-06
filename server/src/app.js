import express from "express";
import cors from "cors";
import router from "./routes/index.js";
import groupRoutes from "./routes/index.js";

const app = express();

const port = 3001;

app.use(express.json());
app.use(cors());
app.use(groupRoutes);

app.listen(port, () => {
  console.log(`El puerto está escuchando por el puerto ${port}`);
});
