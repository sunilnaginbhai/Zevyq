import { createConversation } from "../DAO/conversation.dao";
import { generateTitle } from "../services/ai/ai-title.services";
import { AppError } from "../utils/AppError.js";

export async function handelMessage(req, res, next) {
    const { content, conversation: conversationId } = req.body;
    const user = req.user;

    let conversation = null;

    if (!conversationId) {
        /**
         * create a new conversation if it doesn't exist
         */
        const title = await generateTitle(content);

        const conversation = await createConversation({ user: user.id, title });
    } else {
        conversation = await findConversationByIdAndUser(conversationId, user.id);

        if (!conversation) {
            return next(new AppError("Conversation not found", 404));
        }
    }
}