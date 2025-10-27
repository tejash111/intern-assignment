import express from "express"
import dotenv from "dotenv"
import connectToDb from "./config/db.js"
import profileRoutes from "./routes/route.js"
import cors from "cors"


dotenv.config()

connectToDb()

const app = express()

app.use(
    cors({
        origin: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

app.use(express.json())

app.use("/api/profiles", profileRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));