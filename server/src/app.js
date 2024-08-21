import express from "express";
import cors from "cors";
import passport from "passport";
import dotenv from "dotenv";
//import { GroupRouter } from "./routes/groups.router.js";
import { UserRouter } from "./routes/user.router.js";
import { AuthRouter } from "./routes/auth.router.js";
import { GroupRouter } from "./routes/groups.router.js";

dotenv.config();
const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());
app.use(passport.initialize());

app.use("/users", UserRouter().registerRoutes());
app.use("/auth", AuthRouter().registerRoutes());
app.use("/groups", GroupRouter().registerRoutes());

app.listen(PORT, () => {
  console.log(`El puerto está escuchando por el puerto ${PORT}`);
});
