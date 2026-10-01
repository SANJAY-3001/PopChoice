import { supabase } from "../config/config";
import createEmbeddings from "../services/embeddings.service";
import splitDocument from "../services/splitDocument.service";


async function storeEmbeddings() {
    const chukData = splitDocument("data/movies.txt")

    try {
        const data = await Promise.all(
            chukData.map(async textChunk => {
                const embbeding = await createEmbeddings(textChunk.pageContent)

                return {
                    content : textChunk.pageContent,
                    embbeding : embbeding
                }
            })
        )

        const { error } = await supabase.from("movies").insert(data)

        if (error) {
            throw new Error('Issue inserting data into the database.');
        }

        console.log('Embedding and storing complete!');
    }
    catch (err) {
        console.log(err)
    }
}

storeEmbeddings()