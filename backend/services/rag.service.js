import { supabase } from "../config/config";
import createEmbeddings from "./embeddings.service";



export default async function retrieveMovies(searchQuery) {

    try {
        const embbedings = await createEmbeddings(searchQuery)

        const { data , error } = await supabase.rpc("match_movies" , 
            {
                query_embeddings : embbedings,
                match_threshold : 0.60,
                match_count : 5
            }
        )

        if (error) {
            throw new Error(`Rag search failed ${error.message}`)
        }

        return data
    }
    catch(err) {
        console.error(err)
    }
}