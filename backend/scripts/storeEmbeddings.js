import { supabase } from "../config/config.js";
import createEmbeddings from "../services/embeddings.service.js";
import splitDocument from "../services/splitDocument.service.js";


async function storeEmbeddings() {
    const chukData = await splitDocument("data/movies.txt")

    try {
        // this code gives rate limit exceeded

        // const data = await Promise.all(
        //     chukData.map(async textChunk => {
        //         const embbeding = await createEmbeddings(textChunk.pageContent)

        //         return {
        //             content : textChunk.pageContent,
        //             embbeding : embbeding
        //         }
        //     })
        // )

        const data = []

        for (const textChunk of chukData) {
            const embedding = await createEmbeddings(textChunk.pageContent)

            data.push({
                content : textChunk.pageContent,
                embedding : embedding
            })
        }

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