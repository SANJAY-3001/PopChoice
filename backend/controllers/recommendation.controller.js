import markDownToSafeHtml from "../services/markdown.service.js";
import { recommendMovies } from "../services/recommendation.service.js";


export default async function getRecommendations(req ,  res , next) {
    try {
        const movieSession = req.body
        if (!movieSession) {

            return res.status(400).json({
                success: false,
                message: "Request body is required"
            });
        }


        if (!movieSession.answers) {

            return res.status(400).json({
                success: false,
                message: "Answers are required"
            });
        }

        const result = await recommendMovies(movieSession)



        res.status(200).json({
            success : true,
            result : markDownToSafeHtml(result.recommendations)
        })

    }
    catch(err) {
        next(err)
    }
}