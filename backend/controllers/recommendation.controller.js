import { recommendMovies } from "../services/recommendation.service";


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

        res.status(200).status({
            success : true,
            result : result
        })

    }
    catch(err) {
        next(err)
    }
}