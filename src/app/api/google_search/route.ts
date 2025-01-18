// src/app/api/google_search/route.ts
import { NextResponse } from 'next/server';

// New Web Search API Method
export async function POST(req: Request) {
    try {
        const search_query = await req.json();
        console.log("New Request: "+search_query);

        const apiKey = process.env.GOOGLE_API_KEY; // Your Google API key
        const searchEngineId = process.env.SEARCH_ENGINE_ID; // Your Search Engine ID
        const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${encodeURIComponent(search_query)}`;

        const webResponse = await fetch(url);
        const webData = await webResponse.json();

        if (webData.items) {
            const webResults = {results:[]}
            
            webResults.results = webData.items.map((item: any) => ({
                title: item.title,
                link: item.link,
                snippet: item.snippet,
            }));
            console.log(webResults);
            return NextResponse.json(webResults);
        } else {
            return NextResponse.json({ error: "No web results found." }, { status: 404 });
        }
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch web search results" }, { status: 500 });
    }
}