import { googleGenAI } from "../config/config.js"

export default async function createEmbeddings(text) {
    try {
        const response = await googleGenAI.models.embedContent({
            model : process.env.GEMINI_MODEL,
            contents : text
        })

        return response.embeddings[0].values
    }
    catch (err) {
        console.error(err)
    }

}