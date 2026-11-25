import { ChatGroq } from "@langchain/groq";
import { env } from "../../config/env";
import * as z from "zod";
import { SystemMessage, HumanMessage } from "langchain"
const model = new ChatGroq({
    model: "qwen/qwen3.6-27b",
    apiKey: env.GROQ_Qwen_API_KEY
})

const structuredModel = model.withStructuredOutput(z.object({
    title: z.string().min(1).max(50).description("The title of the conversation on the bases of user messages")
}))

/**
 * @function generateTitle
 * @description Generates a title for a conversation based on the provided messages.
 * @param {Array} messages - An array of message objects, each containing a 'role' and 'content'.
 * @returns<Promise<string>} - A promise that resolves to the generated title.   
*/

export async function generateTitle(message) {
    const systemMessage = new SystemMessage(`
        -act as an profational title generator 
        -generate a title for a conversation based on the provided messages.
        
        #Follow those rules:

        -The title should be concise, clear, and relevant to the content of the conversation.
        -The title should be in sentence case, with the first letter of the first word capitalized and the rest in lowercase.
        -The title should not exceed 50 characters in length.
        -avoid using special characters, numbers, or punctuation in the title. 
        `)

    const humanMessage = new HumanMessage(message);

    const response = await structuredModel.invoke([systemMessage, humanMessage]);
}