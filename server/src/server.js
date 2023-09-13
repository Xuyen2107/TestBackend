import "dotenv/config";
import express from "express";
import routerConfig from "./routes/index.js";
import { connectToDatabase } from "./config/db.config.js";
import { errorHandleMiddleware } from "./middleware/error.middleware.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT;

connectToDatabase();

app.use(express.json());
app.use(cors("*"));

app.use("/api/v1", routerConfig());

app.use(errorHandleMiddleware);

app.listen(PORT, () => {
   console.log(`Server is running at PORT ${PORT}`);
});
