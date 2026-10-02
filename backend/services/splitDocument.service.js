import fs from "fs/promises"
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters"

export default async function splitDocument(document) {
    try {
        const text = await fs.readFile(document , "utf-8")

        const splitter = new RecursiveCharacterTextSplitter({
            chunkSize : 250,
            chunkOverlap : 35
        })

        const output = await splitter.createDocuments([text])

        return output
    }
    catch(err) {
        console.error(err)
    }
}