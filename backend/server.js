import express from "express"
import cors from "cors"
import  recommedationsRoutes  from "./routes/recommendation.routes.js"
import { errorHandler } from "./middleware/error.middleware.js"

const app = express()

app.use(cors())
app.use(express.json())

const PORT  = process.env.PORT || 5000

app.get("/api/health" , async(req , res) => {
    res.json({
        success : true,
        message : "Movie AI app backend is running"
    })
})



app.use("/api" , recommedationsRoutes)

app.use(errorHandler)




app.listen(PORT , () => console.log(`Server is running at ${PORT}`))