import { openai } from "../config/config.js";
import buildMoviePrompt from "../utils/prompt.js";


export default async function generateRecommendations(preferences , movies) {

    const prompt = buildMoviePrompt(preferences , movies)

    const messages = [
        {
            role : "system",
            content : prompt
        }
    ]

    try {
        const response = await openai.chat.completions.create({
            model : process.env.GROQ_MODEL,
            messages
        })

        return response.choices[0].message.content
    }
    catch(err) {
        console.error(err)
    }

}