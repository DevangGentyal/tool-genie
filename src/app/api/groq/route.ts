import { NextResponse } from 'next/server';
import Groq from "groq-sdk";

const groq = new Groq({ 
    apiKey: process.env.GROQ_API_KEY 
});

export async function POST(req: Request) {
    try {
        const { query } = await req.json();
        
        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: `
                        You are an expert API specializing in analyzing raw natural language search queries for mobile applications. 
                        Your task is to decode user requests, identify their key attributes, and provide a structured response. 
                        The response should include a field called "optimized_search_request," which contains a professionally crafted 
                        Google search query designed to yield optimal results for matching apps. 
                        Note that while user refers for app they may be requesting for webapps 90% of the time. Also I want the response only as acceptable JSON object no other text like header or footer.
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
                    content: query,
                },
            ],
            model: "llama-3.1-8b-instant",
        });

        return NextResponse.json(completion.choices[0]?.message?.content || "");
    } catch (error) {
        return NextResponse.json({ error: "Failed to process query" }, { status: 500 });
    }
} 