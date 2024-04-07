import express from "express";
import cors from "cors";
import { GroupRouter } from "./routes/groups.router.js";

const app = express();

const port = 3001;

app.use(express.json());
app.use(cors());
app.use("/groups", GroupRouter().registerRoutes());

app.listen(port, () => {
  console.log(`El puerto está escuchando por el puerto ${port}`);
});
