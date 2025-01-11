import Groq from "groq-sdk";
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Verify API key is available
if (!process.env.GROQ_API_KEY) {
    throw new Error('GROQ_API_KEY is not defined in .env file');
}

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function main(): Promise<void> {
    const chatCompletion = await getGroqChatCompletion();
    console.log(chatCompletion.choices[0]?.message?.content || "");
}

export async function getGroqChatCompletion() {
    return groq.chat.completions.create({
        messages: [
            {
                role: "system",
                content: `
                    You are an expert API specializing in analyzing raw natural language search queries for mobile applications. 
                    Your task is to decode user requests, identify their key attributes, and provide a structured response. 
                    The response should include a field called "optimized_search_request," which contains a professionally crafted 
                    Google search query designed to yield optimal results for matching apps. 
                    Note that while user refers for app they may be requesting for webapps 90% of the time. 
                    Your output should follow the JSON schema below: 
                    {
                        "app_query_analysis": {
                        "user_query": "i want an app for creating images using AI",
                        "keywords": ["TextToImage", "ImageGenerator", "ImageGen", "ArtGenerator", "AIImageGenerator"],
                        "attributes": {
                            "name": "exact name of the app if user mentioned in the user query else None",
                            "description": "Description about the app user mentioned in the user query",
                            "pricing": "Freemium",
                            "platform": "Web, iOS, Android",
                            "category": "Text-to-Image",
                            "features": ["Image Generation", "Art Generation", "Text to Image"],
                            "target_audience": "Students, Professionals, Content Creators, Editors"
                        },
                        "optimized_search_request": "this will be a prompt which you will generate. which will act as a search query in google for getting the exact tools required by user. Optimized"
                        }
                    }
                `,
            },
            {
                role: "user",
                content: "i want an app which can convert my text into songs",
            },
        ],
        model: "llama-3.3-70b-versatile",
    });
}
// main();