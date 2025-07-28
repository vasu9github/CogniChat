import { genAI } from "../lib/gemini.js";

export const apiController = async ( req , res ) => {
    try {
        const { prompt } = req.body;

        if ( !prompt ) {
            return res.status(400).send("Prompt is required")
        }

        const model  = genAI.getGenerativeModel({ model : "gemini-1.5-flash-latest"});
        const result = await model.generateContent(prompt)
        const response = await result.response;
        const text = response.text();

        res.status(200).json({ text })
    } catch (error) {
        console.log(`Error in generating text ${error}`);
        res.status(500).send('Internal server error')
    }
}