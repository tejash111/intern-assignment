import express from "express"
import dotenv from "dotenv"
import connectToDb from "./config/db.js"
import profileRoutes from "./routes/route.js"


dotenv.config()

connectToDb()

const app = express()



app.use(express.json())

app.use("/api/profiles", profileRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));