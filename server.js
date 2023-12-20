console.log('starting server building...')

import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import userRoutes from "./routes/userRoutes.js";
import categoriesRoutes from "./routes/categoriesRoutes.js";
import eventsRoutes from "./routes/eventsRoutes.js";

const app = express();

dotenv.config();

const corsOptions = {
    origin: "http://localhost:3000",
    methods: "GET, HEAD, POST, PUT, DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
}

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/events", eventsRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});