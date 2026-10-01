import express from "express"
import getRecommendations from "../controllers/recommendation.controller"

const router = express.Router()

router.post("recommend" , getRecommendations)

export default router