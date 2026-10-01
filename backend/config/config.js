import { GoogleGenAI } from "@google/genai";
import { createClient } from "@supabase/supabase-js/dist/index.cjs";
import { OpenAI } from "openai/client.js";


const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_API_KEY
)


const openai = new OpenAI({
    apiKey : process.env.GROQ_API_KEY,
    baseURL : process.env.GROQ_URL
})


const googleGenAI = new GoogleGenAI({
    apiKey : process.env.GEMINI_API_KEY
})

export  {supabase , openai , googleGenAI}